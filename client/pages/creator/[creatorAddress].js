import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import BalanceManager from "../../components/BalanceManager";
import TierItem from "../../components/TierItem";
import PostCreator from "../../components/PostCreator";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import CreatorRegistry from "../../abis/CreatorRegistry.json";
import Creator from "../../abis/Creator.json";

const Dashboard = () => {
  const tier = {
    image:
      "https://as2.ftcdn.net/v2/jpg/04/96/77/15/1000_F_496771575_Qcv1lpFmIAHN2ftc5zQxFw4ReDB7kQFF.jpg",
    title: "Basic Tier",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia",
    minted: 50,
    totalSupply: 100,
    price: 10,
    messaging: false,
    royalty: 5,
    durability: 50,
  };

  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
    provider,
  } = useWeb3React();

  const [contractBalance, setContractBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tiers, setTiers] = useState([]);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const { creatorAddress } = router.query;

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

      const creatorContractAddress = await registry.creatorsMapping(
        creatorAddress
      );

      const creator = creatorPar.attach(creatorContractAddress);

      setContractBalance(await provider.getBalance(creator.address));

      setTiers(await creator.getTiers());
      setPosts(await creator.getPosts());

      setLoading(false);
    };

    main();
  }, []);

  return (
    <Box>
      <Header />
      <Box bg="gray.100" h="calc(100vh - 60px)" p="10">
        {creatorAddress === account && (
          <BalanceManager contractBalance={contractBalance} loading={loading} />
        )}
        <Tabs mt="5">
          <TabList>
            <Tab>Posts</Tab>
            <Tab>Tiers</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box>
                <PostCreator />
              </Box>
            </TabPanel>
            <TabPanel>
              {account && account == creatorAddress && (
                <Button colorScheme="blue" size="sm" mb="4" onClick={() => {router.push('/add-tier')}}>
                  Add Tier
                </Button>
              )}
              {loading ? (
                <Box>Loading ...</Box>
              ) : (
                <SimpleGrid minChildWidth="360px" spacing={10}>
                  {tiers.length == 0 ? (
                    <Box>There is no tiers defined yet</Box>
                  ) : (
                    tiers.map((r) => <TierItem key={r} tier={tier} mintable />)
                  )}
                </SimpleGrid>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Dashboard;
