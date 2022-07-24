import {
  Box,
  Avatar,
  Input,
  Textarea,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CreatorForm = ({ dpName, setDPName, bio, setBio, avatar, setAvatar }) => {

  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (avatar) {
      setAvatarUrl(URL.createObjectURL(avatar));
    } else {
      setAvatarUrl("");
    }
  }, [avatar]);

  return (
    <VStack py="10" bg="gray.200" width="100%" spacing={4}>
      <Box>
        <VisuallyHidden>
          <input
            name="avatar"
            id="avatar"
            display="hidden"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
            }}
          />
        </VisuallyHidden>
        <label htmlFor="avatar">
          <Avatar cursor="pointer" width="90px" height="90px" src={avatarUrl} />
        </label>
      </Box>
      <Box width="90%">
        <Input
          bg="white"
          placeholder="Display Name"
          width="100%"
          focusBorderColor="blue.600"
          color="gray.700"
          value={dpName}
          onChange={(e) => setDPName(e.target.value)}
        />
      </Box>
      <Box width="90%">
        <Textarea
          focusBorderColor="blue.600"
          color="gray.700"
          bg="white"
          placeholder="Bio"
          width="100%"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Box>
    </VStack>
  );
};

export default CreatorForm;
