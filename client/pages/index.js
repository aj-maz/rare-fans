import { Button, Container, VStack, Center, Box } from "@chakra-ui/react";
import CreatorItem from "../components/CreatorItem";

const Home = () => {
  return (
    <Box bg="gray.100" h="100vh" p="10">
      <Container bg="gray.100">
        <Center mt="20" mb="8">
          <Button colorScheme="blue"> Signup as a Creator</Button>
        </Center>
        <VStack spacing="20px" maxH="60vh" overflow="auto">
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
          <CreatorItem />
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
