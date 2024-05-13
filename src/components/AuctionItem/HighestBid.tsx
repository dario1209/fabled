import React from "react";
import { formatUnits } from "viem";
import { useReadContracts } from "wagmi";
import { readConfig } from "@/providers/readConfig";
import abi from "@/abi/EnglishAuction.json";

interface HighestBidProps {
  highestBidder: `0x${string}`;
  itemContractAddress: `0x${string}`;
}

const HighestBid: React.FC<HighestBidProps> = ({
  highestBidder,
  itemContractAddress,
}) => {
  const itemContract = {
    address: itemContractAddress,
    abi,
  } as const;

  const {
    data,
    error: readError,
    isPending: readPending,
  } = useReadContracts({
    config: readConfig,
    contracts: [
      {
        ...itemContract,
        functionName: "bids",
        args: [highestBidder],
      },
    ],
  });
  const [highestBid] = data || [];

  if (readPending) return <>Loading...</>;

  const highestBidAmount = highestBid
    ? ((highestBid?.result as Array<any>)[0] as bigint)
    : 0n;

  if (highestBidAmount <= 0n) return null;

  return <>{formatUnits(highestBidAmount, 8)}</>;
};

export default HighestBid;
