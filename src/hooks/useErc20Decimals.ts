import { type BaseError, useReadContract } from "wagmi";

const useFetchDecimals = async (erc20Address: string) => {
  console.log(erc20Address);
  const erc20Contract = {
    addressOrName: erc20Address,
    contractInterface: [
      // ABI interface for the 'decimals' function
      {
        type: "function",
        stateMutability: "view",
        outputs: [{ type: "uint8", name: "", internalType: "uint8" }],
        name: "decimals",
        inputs: [],
      },
    ],
  };

  const {
    data: decimals,
    error,
    isPending,
  } = await useReadContract({
    ...erc20Contract,
    functionName: "decimals",
  });
  console.log({ decimals, error, isPending });
  return { decimals, error, isPending };
};

export default useFetchDecimals;
