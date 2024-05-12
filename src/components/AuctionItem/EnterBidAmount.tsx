import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import toast from "react-hot-toast";

import abiAuction from "@/abi/EnglishAuction.json";
import abiERC20 from "@/abi/ERC20.json";
import { formatUnits, parseUnits } from "viem";
import { readConfig } from "@/providers/readConfig";

interface EnterBidAmountProps {
  itemContractAddress: `0x${string}`;
  currentBid: bigint | undefined;
  setMinBidState: Dispatch<SetStateAction<undefined>>;
  bidAmount: string;
  setBidAmount: Dispatch<SetStateAction<string>>;
}

const EnterBidAmount = ({
  itemContractAddress,
  currentBid,
  setMinBidState,
  bidAmount,
  setBidAmount,
}: EnterBidAmountProps) => {
  const itemContract = {
    address: itemContractAddress,
    abi: abiAuction,
  } as const;

  const {
    data: minBid,
    error: minBidError,
    isPending: minBidPending,
  } = useReadContract({
    config: readConfig,
    ...itemContract,
    functionName: "getMinBid",
    args: [],
  });

  // console.log(minBid, minBidError, minBidPending);

  useEffect(() => {
    // @ts-ignore
    setMinBidState(minBid?.result as bigint);
  }, [minBid, setMinBidState]);

  if (!minBid) return null;

  return (
    // @ts-ignore
    <Input minBid={minBid} bidAmount={bidAmount} setBidAmount={setBidAmount} />
  );
};

interface InputProps {
  minBid: bigint;
  bidAmount: string;
  setBidAmount: Dispatch<SetStateAction<string>>;
}

const Input = ({ minBid, bidAmount, setBidAmount }: InputProps) => {
  useEffect(() => {
    setBidAmount(formatUnits(minBid, 8));
  }, [minBid, setBidAmount]);

  const handleChange = (event: { target: { value: any } }) => {
    const value = event.target.value;

    try {
      // Convert the input string to BigInt
      BigInt(parseUnits(value, 8));
      setBidAmount(value);
    } catch (error) {
      console.error("Invalid BigInt value", error);
    }
  };

  return (
    <input
      type="number"
      name="bidAmount"
      id="bidAmount"
      className="my-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      // @ts-ignore
      value={Number(bidAmount)}
      onChange={handleChange}
    />
  );
};

export default EnterBidAmount;
