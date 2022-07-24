import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import BalanceManager from "../components/BalanceManager";
import TierItem from "../components/TierItem";
import PostCreator from "../components/PostCreator";

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

  return (
    <Box bg="gray.100" h="100vh" p="10">
      <BalanceManager />
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
            <SimpleGrid minChildWidth="360px" spacing={10}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((r) => (
                <TierItem key={r} tier={tier} mintable />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;
