import { Box, Image, Text, Flex, Button, Checkbox } from "@chakra-ui/react";

const TierItem = ({ tier, mintable }) => {
  return (
    <Box>
      <Box bg="orange.50" p="4">
        <Box>
          <Text fontSize="lg" color="orange.400" mb="2" fontWeight="bold">
            {tier.title}
          </Text>
        </Box>

        <Box>
          <Image src={tier.image} />
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.600" mt="2">
            {tier.description}
          </Text>
        </Box>
      </Box>
      <Box p="4" bg="orange.200">
        <Flex justify="space-between" width="100%" spacing={2}>
          <Text fontSize="sm">
            Minting Status:{" "}
            <Text as="span" fontWeight="bold">
              {tier.minted}/{tier.totalSupply}
            </Text>
          </Text>
          <Text fontSize="sm">
            Price:{" "}
            <Text as="span" fontWeight="bold">
              {tier.price} $MATIC
            </Text>
          </Text>
        </Flex>
        <Flex mt="2" justify="space-between" width="100%" spacing={2}>
          <Text fontSize="sm">
            Royalty:{" "}
            <Text as="span" fontWeight="bold">
              {tier.royalty}%
            </Text>
          </Text>
          <Text fontSize="sm">
            Durability:{" "}
            <Text as="span" fontWeight="bold">
              {tier.durability} Days
            </Text>
          </Text>
        </Flex>
        <Box mt="2">
          <Text fontSize="sm">
            Access to direct message:{" "}
            <Text as="span" fontWeight="bold">
              {tier.messaging ? "Yes" : "False"}
            </Text>
          </Text>
        </Box>
        {mintable && (
          <Flex mt="3" justify="center">
            <Button
              disabled={tier.minted >= tier.totalSupply ? true : false}
              borderRadius="0"
              colorScheme="orange"
              size="sm"
            >
              Mint Tier
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default TierItem;
