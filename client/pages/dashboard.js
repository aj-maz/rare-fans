import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import BalanceManager from "../components/BalanceManager";

const Dashboard = () => {
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
            <Box>Posts going to be here</Box>
          </TabPanel>
          <TabPanel>
            <Box>Tiers exists</Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;
