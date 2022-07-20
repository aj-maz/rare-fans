import {
  Box,
  Avatar,
  Input,
  Textarea,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";

const CreatorForm = () => {
  return (
    <VStack py="10" bg="gray.200" width="100%"  spacing={4}>
      <Box>
        <VisuallyHidden>
          <input name="avatar" id="avatar" display="hidden" type="file" />
        </VisuallyHidden>
        <label for="avatar">
          <Avatar cursor="pointer" width="90px" height="90px" />
        </label>
      </Box>
      <Box width="90%">
        <Input
          bg="white"
          placeholder="Display Name"
          width="100%"
          focusBorderColor="blue.600"
          color="gray.700"
        />
      </Box>
      <Box width="90%">
        <Textarea
          focusBorderColor="blue.600"
          color="gray.700"
          bg="white"
          placeholder="Bio"
          width="100%"
        />
      </Box>
    </VStack>
  );
};

export default CreatorForm;
