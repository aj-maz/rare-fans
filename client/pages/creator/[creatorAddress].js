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
        creatorAddress.toLowerCase()
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
        {account && creatorAddress.toLowerCase() === account.toLowerCase() && (
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
              {account && account.toLowerCase() == creatorAddress.toLowerCase() && (
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
                    tiers.map((tier, i) => <TierItem key={i} tier={tier} mintable />)
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
