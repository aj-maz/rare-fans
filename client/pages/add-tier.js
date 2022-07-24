import { Center, Button, Box, Flex } from "@chakra-ui/react";
import TierForm from "../components/TierForm";
import Header from "../components/Header";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import CreatorRegistry from "../abis/CreatorRegistry.json";
import Creator from "../abis/Creator.json";
import { useRouter } from "next/router";

import { upload, uploadFile } from "../lib/web3StorageUploader";

const AddTier = () => {
  const [description, setDescription] = useState("");
  const [tierName, setTierName] = useState("");
  const [tierImage, setTierImage] = useState("");
  const [mintPrice, setMintPrice] = useState(1);
  const [totalSupply, setTotalSupply] = useState(1);
  const [isDM, setIsDM] = useState(true);
  const router = useRouter();

  const { library, account } = useWeb3React();

  return (
    <Box>
      <Header />
      <Center h="calc(100vh - 60px)" bg="gray.100">
        <Box width="90%" maxWidth="600px">
          <TierForm
            description={description}
            setDescription={setDescription}
            tierName={tierName}
            setTierName={setTierName}
            tierImage={tierImage}
            setTierImage={setTierImage}
            mintPrice={mintPrice}
            setMintPrice={setMintPrice}
            totalSupply={totalSupply}
            setTotalSupply={setTotalSupply}
            isDM={isDM}
            setIsDM={setIsDM}
          />
          <Flex mt="5" justify="center">
            <Button
              variant="solid"
              size="md"
              colorScheme="orange"
              disabled={!tierName || !library || !account}
              onClick={async () => {
                let tierImageCid, infoCid;
                if (tierImage) {
                  tierImageCid = await uploadFile(tierImage);
                }

                const infoObj = {
                  tierImage: tierImageCid,
                  name: tierName,
                  description,
                };

                infoCid = await upload(infoObj);

                console.log(infoCid);

                const signer = library.getSigner();

                const registry = new ethers.Contract(
                  process.env.NEXT_PUBLIC_REGISTRY_ADDRESS,
                  CreatorRegistry.abi,
                  signer
                );

                const creatorPar = new ethers.Contract(
                  process.env.NEXT_PUBLIC_REGISTRY_ADDRESS,
                  Creator.abi,
                  signer
                );

                const creatorContractAddress = await registry.creatorsMapping(
                  account
                );

                const creator = creatorPar.attach(creatorContractAddress);

                await creator.addTier(infoCid, mintPrice, totalSupply, isDM);

                router.push(`/creator/${account.toLowerCase()}`);
              }}
            >
              Create The Tier
            </Button>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
};

export default AddTier;
