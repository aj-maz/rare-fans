import { Button, Container, VStack, Center, Box } from "@chakra-ui/react";
import CreatorItem from "../components/CreatorItem";
import { injected } from "../lib/connectors";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import CreatorRegistry from "../abis/CreatorRegistry.json";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  const [nextStep, setNextStep] = useState(false);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  useEffect(() => {
    const action = async () => {
      if (nextStep && library) {
        const signer = library.getSigner();

        const registry = new ethers.Contract(
          process.env.NEXT_PUBLIC_REGISTRY_ADDRESS,
          CreatorRegistry.abi,
          signer
        );

        const existed =
          (await registry.creatorsMapping(account)) !==
          "0x0000000000000000000000000000000000000000";

        if (existed) {
          router.push(`/creator/${await registry.creatorsMapping(account)}`);
        } else {
          router.push("/setup");
        }
      }
    };
    action();
  }, [nextStep, library]);

  useEffect(() => {
    const changeChain = (chainId) => {
      if (chainId !== "0x13881") {
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881",
              chainName: "Mumbai Testnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
              blockExplorerUrls: ["https://mumbai.polygonscan.com"],
            },
          ],
        });
      }
    };

    const main = async () => {
      const chainId = await ethereum.request({ method: "eth_chainId" });

      if (connector) {
        changeChain(chainId);
      }
    };

    main();

    window.ethereum.on("connect", ({ chainId }) => {
      changeChain(chainId);
    });
  }, [connector]);

  const connect = async (walletType) => {
    try {
      await activate(walletType);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box bg="gray.100" h="100vh" p="10">
      <Container bg="gray.100">
        <Center mt="20" mb="8">
          <Button
            onClick={async () => {
              await connect(injected);
              setNextStep(true);
            }}
            colorScheme="blue"
          >
            Your Creator Account
          </Button>
        </Center>
        <VStack spacing="20px" maxH="60vh" overflow="auto">
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
