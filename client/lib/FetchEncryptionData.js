import axios from "axios";

import { Decodeuint8arr, Encodeuint8arr } from "./uint8";

export default async (cid) => {
  try {
    let rootData;

    if (localStorage.getItem(cid)) {
      rootData = JSON.parse(localStorage.getItem(cid));
    } else {
      rootData = (await axios.get(`https://ipfs.io/ipfs/${cid}`)).data;
      localStorage.setItem(cid, JSON.stringify(rootData));
    }

    let accessControlConditions;

    if (localStorage.getItem(rootData.accessControlConditions)) {
      accessControlConditions = JSON.parse(
        localStorage.getItem(rootData.accessControlConditions)
      );
    } else {
      accessControlConditions = (
        await axios.get(
          `https://ipfs.io/ipfs/${rootData.accessControlConditions}`
        )
      ).data;
      localStorage.setItem(
        rootData.accessControlConditions,
        JSON.stringify(accessControlConditions)
      );
    }

    let encryptedSymmetricKey;

    if (localStorage.getItem(rootData.encryptedSymmetricKey)) {
      encryptedSymmetricKey = JSON.parse(
        localStorage.getItem(rootData.encryptedSymmetricKey)
      );
    } else {
      encryptedSymmetricKey = (
        await axios.get(
          `https://ipfs.io/ipfs/${rootData.encryptedSymmetricKey}`
        )
      ).data;
      localStorage.setItem(
        rootData.encryptedSymmetricKey,
        JSON.stringify(encryptedSymmetricKey)
      );
    }

    const encryptedString = (
      await axios.get(`https://ipfs.io/ipfs/${rootData.encryptedString}`, {
        responseType: "blob",
      })
    ).data;

    return {
      accessControlConditions,
      encryptedSymmetricKey: Encodeuint8arr(encryptedSymmetricKey),
      encryptedString,
    };
  } catch (err) {
    console.log(err);
  }
};
