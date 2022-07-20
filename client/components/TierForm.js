import {
  Box,
  Image,
  Input,
  Textarea,
  VStack,
  VisuallyHidden,
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const TierForm = () => {
  return (
    <VStack py="10" bg="gray.200" width="100%" spacing={4}>
      <Box width="90%">
        <FormControl>
          <FormLabel color="blue.600">Tier Description</FormLabel>

          <Input
            bg="white"
            placeholder="Tier Name"
            width="100%"
            focusBorderColor="blue.600"
            color="gray.700"
          />
        </FormControl>
      </Box>
      <Box>
        <VisuallyHidden>
          <input name="avatar" id="avatar" display="hidden" type="file" />
        </VisuallyHidden>
        <label for="avatar" border="2px">
          <Button variant="ghost" colorScheme="blue">
            Select An Image For Tier
          </Button>
          {/* <Image
            cursor="pointer"
            width="200px"
            height="200px"
            fallbackSrc="https://via.placeholder.com/200"
  />*/}
        </label>
      </Box>
      <Box width="90%">
        <FormControl>
          <FormLabel color="blue.600">Tier Description</FormLabel>
          <Textarea
            focusBorderColor="blue.600"
            color="gray.700"
            bg="white"
            placeholder="Tier Description"
            width="100%"
          />
        </FormControl>
      </Box>
      <HStack spacing={2} width="90%">
        <Box width="90%">
          <FormControl>
            <FormLabel color="blue.600">Mint Price in $Matic</FormLabel>
            <NumberInput
              bg="white"
              borderRadius="5"
              variant="outline"
              width="100%"
              focusBorderColor="blue.600"
              color="gray.700"
              defaultValue={1}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Box>
        <Box width="90%">
          <FormControl>
            <FormLabel color="blue.600">Tier Total Supply</FormLabel>
            <NumberInput
              bg="white"
              borderRadius="5"
              variant="outline"
              width="100%"
              focusBorderColor="blue.600"
              color="gray.700"
              defaultValue={1}
              min={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Box>
      </HStack>
      <HStack spacing={2} width="90%">
        <Box width="90%">
          <FormControl>
            <FormLabel color="blue.600">Active Days</FormLabel>
            <NumberInput
              bg="white"
              borderRadius="5"
              variant="outline"
              width="100%"
              focusBorderColor="blue.600"
              color="gray.700"
              defaultValue={30}
              min={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Box>
        <Box width="90%">
          <FormControl>
            <FormLabel color="blue.600">Royalty in %</FormLabel>
            <NumberInput
              bg="white"
              borderRadius="5"
              variant="outline"
              width="100%"
              focusBorderColor="blue.600"
              color="gray.700"
              defaultValue={0}
              max={50}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Box>
      </HStack>
      <Box width="90%">
        <Checkbox size="lg" colorScheme="blue" color="blue.600" defaultChecked >
          Provides Acess to Direct Messages
        </Checkbox>
      </Box>
    </VStack>
  );
};

export default TierForm;
