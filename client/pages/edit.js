import { Center, Button, Box, Flex } from "@chakra-ui/react";
import CreatorForm from "../components/CreatorForm";

const Edit = () => {
  return (
    <Center h="100vh" bg="gray.100">
      <Box width="90%" maxWidth="600px">
        <CreatorForm />
        <Flex mt="5" justify="center">
          <Button
            borderRadius="0"
            variant="outline"
            size="md"
            colorScheme="orange"
          >
            Edit Your Creator Account
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default Edit;
