import React, { useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { formatDuration } from "@/utils/formatDuration";
import EnterBidAmount from "./EnterBidAmount";
import BidButton from "./BidButton";
import ConnectButton from "./ConnectButton";
import { useAccount, useReadContracts, useWatchContractEvent } from "wagmi";
import { readConfig } from "@/providers/readConfig";
import abi from "@/abi/EnglishAuction.json";

interface AuctionRunningProps {
  itemContractAddress: `0x${string}`;
}

const AuctionRunning: React.FC<AuctionRunningProps> = ({
  itemContractAddress,
}) => {
  const [currentBid, setCurrentBid] = useState();
  const [minBidState, setMinBidState] = useState();

  const { isConnected } = useAccount();

  const [bidAmount, setBidAmount] = useState<string>("");
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
        functionName: "getMinBid",
        args: [],
      },
      {
        ...itemContract,
        functionName: "getRemainingBidTime",
        args: [],
      },
      {
        ...itemContract,
        functionName: "biddingToken",
        args: [],
      },
    ],
  });
  const [minBid, remainingBidTime, erc20Address] = data || [];

  useWatchContractEvent({
    config: readConfig,
    address: itemContractAddress,
    abi,
    eventName: "NewBid",
    onLogs(logs) {
      console.log(logs);
      // @ts-ignore
      setCurrentBid(logs[0].args.amount);
    },
  });

  if (readPending) return <p>Loading...</p>;

  return (
    <>
      <div className="mb-3 flex flex-row flex-wrap justify-between">
        {currentBid ? (
          <p>Current Bid: {formatUnits(currentBid, 8)}</p>
        ) : (
          <p>
            Min Bid:{" "}
            {minBid?.result ? formatUnits(minBid.result as bigint, 8) : "N/A"}
          </p>
        )}
        <p>
          Time Left:{" "}
          {remainingBidTime?.result
            ? formatDuration(remainingBidTime.result as bigint)
            : "N/A"}
        </p>
      </div>
      <EnterBidAmount
        itemContractAddress={itemContractAddress as `0x${string}`}
        currentBid={currentBid}
        setMinBidState={setMinBidState}
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
      />
      {isConnected ? (
        <BidButton
          minBid={parseUnits(bidAmount, 8)}
          itemContractAddress={itemContractAddress as `0x${string}`}
          erc20ContractAddress={erc20Address?.result as `0x${string}`}
        />
      ) : (
        <ConnectButton />
      )}
    </>
  );
};

export default AuctionRunning;
