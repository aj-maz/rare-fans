import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { injected } from "../lib/connectors";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";

const formatAddress = (addr) => {
  if (!addr) return "";
  return `${addr.substring(0, 6)}...${addr.substring(
    addr.length - 6,
    addr.length
  )}`;
};

const Header = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const router = useRouter();

  const connect = async (walletType) => {
    try {
      await activate(walletType);
    } catch (err) {
      console.log(err);
    }
  };

  const disconnect = () => {
    try {
      deactivate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex p="2" px="10" bg="blue.500" align="center" justify="space-between">
      <Text
        onClick={() => {
          router.push("/");
        }}
        color="white"
        fontWeight="600"
        fontSize="xl"
      >
        RareFans
      </Text>
      <Box>
        {account && (
          <Text as="span" fontWeight="bold" color="white" mr="4">
            {formatAddress(account)}
          </Text>
        )}
        <Button
          onClick={async () => {
            if (active) {
              disconnect();
            } else {
              await connect(injected);
            }
          }}
        >
          {active ? "Disconnect" : "Connect"}
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
