import { Box, Image, Text, Flex, Button, Checkbox } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";

const TierItem = ({ tier, mintable }) => {
  const [info, setInfo] = useState(null);

  console.log(tier);
  useEffect(() => {
    axios
      .get(`https://ipfs.io/ipfs/${tier.info}`)
      .then((r) => {
        return r.data;
      })
      .then((data) => {
        setInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box>
      <Box bg="orange.50" p="4">
        <Box>
          <Text fontSize="lg" color="orange.400" mb="2" fontWeight="bold">
            {info?.name}
          </Text>
        </Box>

        <Box>
          <Image src={`https://ipfs.io/ipfs/${info?.tierImage}`} />
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.600" mt="2">
            {info?.description}
          </Text>
        </Box>
      </Box>
      <Box p="4" bg="orange.200">
        <Flex justify="space-between" width="100%" spacing={2}>
          <Text fontSize="sm">
            Minting Status:{" "}
            <Text as="span" fontWeight="bold">
              {tier.alreadyMinted.toString()}/{tier.totalSupply.toString()}
            </Text>
          </Text>
          <Text fontSize="sm">
            Price:{" "}
            <Text as="span" fontWeight="bold">
              {tier.price.toString()} $MATIC
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
