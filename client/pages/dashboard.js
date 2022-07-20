import { Box, Text, Flex, Button } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Box bg="gray.100" h="100vh" p="10">
      <Flex justify="space-between" bg="gray.200" p="5">
        <Text color="gray.600" fontSize="2xl">Your Balance: <Text as="span" color="blue.600">9500 $Matic</Text></Text>
        <Button colorScheme="orange">
            Withdraw
        </Button>
      </Flex>
    </Box>
  );
};

export default Dashboard;
