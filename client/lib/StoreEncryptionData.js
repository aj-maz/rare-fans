import { upload, uploadFile } from "./web3StorageUploader";
import { Decodeuint8arr } from "./uint8";

export default async ({
  accessControlConditions,
  encryptedSymmetricKey,
  encryptedString,
}) => {
  try {
    const acc = await upload(JSON.stringify(accessControlConditions));
    const esk = await upload(Decodeuint8arr(encryptedSymmetricKey));
    const es = await uploadFile(encryptedString);

    const result = await upload({
      accessControlConditions: acc,
      encryptedSymmetricKey: esk,
      encryptedString: es,
    });

    console.log(result);
    return result;

  } catch (err) {
    console.log(err);
  }
};
