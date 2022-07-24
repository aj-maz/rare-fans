// pages/_app.js
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { LitProvider } from "../lib/LitProvider";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers, Web3 } from "ethers";

import "../styles/globals.css";

function getLibrary(provider) {
  const target = new ethers.providers.Web3Provider(provider);
  return target;
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <LitProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </LitProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
