import { Center, Button, Box, Flex } from "@chakra-ui/react";
import CreatorForm from "../components/CreatorForm";
import { upload, uploadFile } from "../lib/web3StorageUploader";
import CreatorRegistry from "../abis/CreatorRegistry.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";

const Setup = () => {
  const [dpName, setDPName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const router = useRouter();

  const [avatarUrl, setAvatarUrl] = useState("");

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  useEffect(() => {
    if (!active) {
      router.push("/");
    }
  }, [active]);

  useEffect(() => {
    if (avatar) {
      setAvatarUrl(URL.createObjectURL(avatar));
    } else {
      setAvatarUrl("");
    }
  }, [avatar]);

  return (
    <Center h="100vh" bg="gray.100">
      <Box width="90%" maxWidth="600px">
        <CreatorForm
          dpName={dpName}
          setDPName={setDPName}
          bio={bio}
          setBio={setBio}
          avatar={avatar}
          setAvatar={setAvatar}
        />
        <Flex mt="5" justify="center">
          <Button
            variant="solid"
            size="md"
            colorScheme="orange"
            onClick={async () => {
              let avatarCid, infoCid;
              if (avatar) {
                avatarCid = await uploadFile(avatar);
              }

              const infoObj = {
                avatar: avatarCid,
                bio,
                dpName,
              };

              infoCid = await upload(infoObj);
              const signer = library.getSigner();

              const registry = new ethers.Contract(
                process.env.NEXT_PUBLIC_REGISTRY_ADDRESS,
                CreatorRegistry.abi,
                signer
              );

              await registry.addCreator(infoCid);

              setInterval(async () => {
                const existed =
                  (await registry.creatorsMapping(account)) !==
                  "0x0000000000000000000000000000000000000000";

                if (existed) {
                  router.push(`/creator/${account}`);
                }
              }, 5 * 1000);

              // now it should navigate to the address
            }}
            disabled={!dpName}
          >
            Deploy Your Creator Account
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default Setup;
