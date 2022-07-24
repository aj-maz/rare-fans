import { Center, Button, Box, Flex } from "@chakra-ui/react";
import CreatorForm from "../components/CreatorForm";
import { useState } from "react";

const Setup = () => {
  const [dpName, setDPName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  return (
    <Center h="100vh" bg="gray.100">
      <Box width="90%" maxWidth="600px">
        <CreatorForm
          dpName={dpName}
          setDPName={setDPName}
          bio={bio}
          setBio={setBio}
          avatar={avatar}
          setAvatar={setAvatar}
        />
        <Flex mt="5" justify="center">
          <Button
            variant="solid"
            size="md"
            colorScheme="orange"
          >
            Deploy Your Creator Account
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default Setup;
