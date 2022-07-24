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
import { useEffect, useState } from "react";

const TierForm = ({
  description,
  setDescription,
  tierName,
  setTierName,
  tierImage,
  setTierImage,
  mintPrice,
  setMintPrice,
  totalSupply,
  setTotalSupply,
  isDM,
  setIsDM,
}) => {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (tierImage) {
      setAvatarUrl(URL.createObjectURL(tierImage));
    } else {
      setAvatarUrl("");
    }
  }, [tierImage]);

  return (
    <VStack py="10" bg="gray.200" width="100%" spacing={4} borderRadius="20">
      <Box width="90%">
        <FormControl>
          <FormLabel color="blue.600">Tier Name</FormLabel>

          <Input
            bg="white"
            placeholder="Tier Name"
            width="100%"
            focusBorderColor="blue.600"
            color="gray.700"
            value={tierName}
            onChange={(e) => setTierName(e.target.value)}
          />
        </FormControl>
      </Box>
      <Box>
        <VisuallyHidden>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => {
              setTierImage(e.target.files[0]);
            }}
            name="tierimage"
            id="tierimage"
            display="hidden"
          />
        </VisuallyHidden>
        <label htmlFor="tierimage" border="2px">
          <Button cursor="pointer" as="span" variant="ghost" colorScheme="blue">
            Select An Image For Tier
          </Button>

          {tierImage && (
            <Image
              cursor="pointer"
              width="200px"
              height="200px"
              src={avatarUrl}
              fallbackSrc="https://via.placeholder.com/200"
            />
          )}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              value={mintPrice}
              onChange={(e) => {
                setMintPrice(e);
              }}
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
              value={totalSupply}
              onChange={(e) => setTotalSupply(e)}
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
        <Checkbox
          isChecked={isDM}
          onChange={(e) => setIsDM(!isDM)}
          size="lg"
          colorScheme="blue"
          color="blue.600"
        >
          Provides Acess to Direct Messages
        </Checkbox>
      </Box>
    </VStack>
  );
};

export default TierForm;
