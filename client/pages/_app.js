// pages/_app.js
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { LitProvider } from "../lib/LitProvider";

function MyApp({ Component, pageProps }) {
  return (
    <LitProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </LitProvider>
  );
}

export default MyApp;
