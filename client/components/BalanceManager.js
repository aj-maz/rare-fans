import { Text, Flex, Button } from "@chakra-ui/react";

const BalanceManager = () => {
  return (
    <Flex justify="space-between" bg="gray.200" p="5">
      <Text color="gray.600" fontSize="2xl">
        Your Balance:{" "}
        <Text as="span" color="blue.600">
          9500 $Matic
        </Text>
      </Text>
      <Button colorScheme="orange">Withdraw</Button>
    </Flex>
  );
};

export default BalanceManager;
