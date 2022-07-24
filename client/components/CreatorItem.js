import { Box, Text, Avatar, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CreatorRegistry from "../abis/CreatorRegistry.json";
import Creator from "../abis/Creator.json";
import { useRouter } from "next/router";

const CreatorItem = ({ creatorAddress }) => {
  const [info, setInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const main = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/PKDcpW-zo09u7KieHzUl5H0qujGgr5nv"
      );

      const registry = new ethers.Contract(
        process.env.NEXT_PUBLIC_REGISTRY_ADDRESS,
        CreatorRegistry.abi,
        provider
      );

      const creatorPar = new ethers.Contract(
        process.env.NEXT_PUBLIC_REGISTRY_ADDRESS,
        Creator.abi,
        provider
      );

      console.log(creatorAddress);

      const creatorContractAddress = await registry.creatorsMapping(
        creatorAddress.toLowerCase()
      );

      console.log(creatorContractAddress);

      const creator = creatorPar.attach(creatorContractAddress);

      const infoCID = await creator.uri(0);

      const infoURI = `https://ipfs.io/ipfs/${infoCID}`;

      axios
        .get(infoURI)
        .then((r) => {
          return r.data;
        })
        .then((data) => {
          setInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    main();
  }, []);

  console.log(info);

  return (
    <Box
      cursor="pointer"
      _hover={{ bg: "orange.200" }}
      p="4"
      transition="200ms"
      borderRadius="6"
      bg="gray.200"
      onClick={() => router.push(`/creator/${creatorAddress}`)}
      width="300px"
    >
      <Flex align="center">
        <Avatar
          name="Dan Abrahmov"
          src={`https://ipfs.io/ipfs/${info?.avatar}`}
        />

        <Text ml="5" size="xl">
          {info?.dpName}
        </Text>
      </Flex>
    </Box>
  );
};

export default CreatorItem;
