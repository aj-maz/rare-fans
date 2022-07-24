import { useContext } from "react";
import LitJsSdk from "lit-js-sdk";
import { Button } from "@chakra-ui/react";
import { LitContext } from "../lib/LitProvider";
import CondiationCreator from "../lib/CondiationCreator";
import StoreEncryptionData from "../lib/StoreEncryptionData";
import FetchEncryptionData from "../lib/FetchEncryptionData";

const message = "Some random message to encrypt";
const toDecryptMessage =
  "a58ce4bc4564c82f468f8300e966f7778cd71ed67e71f949246d34e23524ab612a226cc1cd19faf11ba15b5a632c060613db59d1b556c91bb1a00b8ef57ebf779880bcb76fce928f18b6dab2a01cda9031b962c7966b1f67e99d6e7482cf10956a9c7b628d40575fcfdf08475ab6960e463f09a85bb7f493fde9a82936b4152c000000000000002016ff503f013b5241e94475a29b959597296da13a92e59f3e580909bc98d4295300461b92d3562621a64b48bb63d80498";

const PostCreator = () => {
  const { client, loading } = useContext(LitContext);

  const encryptMessage = async (message) => {
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      message
    );

    console.log(encryptedString, symmetricKey);
  };

  const doLit = async () => {
    const chain = process.env.NEXT_PUBLIC_TARGET_CHAIN;

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

    console.log(authSig);

    const accessControlConditions = CondiationCreator();

    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      message
    );

    console.log(encryptedString);

    const encryptedSymmetricKey = await client.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    });

    const rootCid = await StoreEncryptionData({
      accessControlConditions,
      encryptedSymmetricKey,
      encryptedString,
    });

    console.log(`ROOT CID: ${rootCid}`);

    console.log("encryptedSymmetricKey:", encryptedSymmetricKey);
    // console.log("encryptedString:", encryptedString);

    /* const toDecrypt = LitJsSdk.uint8arrayToString(
      encryptedSymmetricKey,
      "base16"
    );
    // console.log("toDecrypt: ", toDecrypt);

    const _symmetricKey = await client.getEncryptionKey({
      accessControlConditions,
      toDecrypt: toDecrypt,
      chain,
      authSig,
    });
    console.log("_symmetricKey:", _symmetricKey);

    // <String> decryptedString

    const encryptedBlob = new Blob([toDecryptMessage], {
      type: "application/octet-stream",
    });

    // console.log(symmetricKey, _symmetricKey);

    try {
      const decryptedString = await LitJsSdk.decryptString(
        encryptedString,
        _symmetricKey
      );
      //   console.log("decryptedString:", decryptedString);
    } catch (err) {
      //    console.log(err);
    }*/
  };

  const decrypt = async ({
    accessControlConditions,
    encryptedSymmetricKey,
    encryptedString,
  }) => {
    const chain = process.env.NEXT_PUBLIC_TARGET_CHAIN;

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

    const toDecrypt = LitJsSdk.uint8arrayToString(
      encryptedSymmetricKey,
      "base16"
    );

    const symmetricKey = await client.getEncryptionKey({
      accessControlConditions,
      toDecrypt,
      chain,
      authSig,
    });

    const decryptedString = await LitJsSdk.decryptString(
      encryptedString,
      symmetricKey
    );

    console.log(decryptedString);
  };

  return (
    <div>
      <Button
        onClick={async () => {
          //doLit(message);
          const encryptionData = await FetchEncryptionData(
            "bafkreiadxvptm556uabfg3jh2bf3jsc2n5rairqt57jexnaok5nf5evyja"
          );
          
          console.log(encryptionData);
          
          console.log(await decrypt(encryptionData));
        }}
      >
        Decrypt
      </Button>
      THis is going to be the post creator
    </div>
  );
};

// "0xc2ee46df09a3edb16762ac68c0be25775d1f2ed2cc7b2b0939a0f4c7f692a6e84c5583874b5f51673f30de3e7ed30d7fd4abf97173f42bfccf6265ed6217247d1b"

export default PostCreator;
