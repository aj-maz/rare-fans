import { Center, Button, Box, Flex } from "@chakra-ui/react";
import TierForm from "../components/TierForm";

const AddTier = () => {
  return (
    <Center h="100vh" bg="gray.100">
      <Box width="90%" maxWidth="600px">
        <TierForm />
        <Flex mt="5" justify="center">
          <Button
            borderRadius="0"
            variant="solid"
            size="md"
            colorScheme="orange"
          >
            Create The Tier
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default AddTier;
