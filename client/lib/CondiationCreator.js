export default () => {
  return [
    {
      contractAddress: "",
      standardContractType: "",
      chain,
      method: "eth_getBalance",
      parameters: [":userAddress", "latest"],
      returnValueTest: {
        comparator: ">=",
        value: "0", // 0 ETH, so anyone can open
      },
    },
  ];
};
