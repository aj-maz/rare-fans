import { Box, Text, Avatar, Flex } from "@chakra-ui/react";
const CreatorItem = () => {
  return (
    <Box
      cursor="pointer"
      _hover={{ bg: "orange.200" }}
      p="4"
      transition="200ms"
      borderRadius="6"
      bg="gray.200"
    >
      <Flex align="center">
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

        <Text ml="5" size="xl">Ajand Mardalizad</Text>
      </Flex>
    </Box>
  );
};

export default CreatorItem;
