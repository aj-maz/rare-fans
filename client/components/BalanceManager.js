import { Text, Flex, Button } from "@chakra-ui/react";

const BalanceManager = ({ loading, contractBalance }) => {
  return (
    <Flex justify="space-between" bg="gray.200" p="5" borderRadius={6}>
      <Text color="gray.600" fontSize="2xl">
        Your Balance:{" "}
        <Text as="span" color="blue.600">
          {loading ? "Loading Balance" : `${contractBalance} $Matic`}
        </Text>
      </Text>
      <Button colorScheme="orange">Withdraw</Button>
    </Flex>
  );
};

export default BalanceManager;
