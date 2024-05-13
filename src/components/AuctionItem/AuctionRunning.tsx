import React, { useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { formatDuration } from "@/utils/formatDuration";
import EnterBidAmount from "./EnterBidAmount";
import BidButton from "./BidButton";
import ConnectButton from "./ConnectButton";
import { useAccount, useReadContracts, useWatchContractEvent } from "wagmi";
import { readConfig } from "@/providers/readConfig";
import abi from "@/abi/EnglishAuction.json";
import HighestBid from "./HighestBid";
import useAuctionItems from "@/hooks/useAuctionItems";

interface AuctionRunningProps {
  itemContractAddress: `0x${string}`;
}

const AuctionRunning: React.FC<AuctionRunningProps> = ({
  itemContractAddress,
}) => {
  const [minBidState, setMinBidState] = useState();

  const { isConnected, address } = useAccount();

  const [bidAmount, setBidAmount] = useState<string>("");
  const itemContract = {
    address: itemContractAddress,
    abi,
  } as const;

  const { getPuppetImgSrc } = useAuctionItems();
  const puppetImgSrc = getPuppetImgSrc(itemContractAddress);

  const {
    data,
    error: readError,
    isPending: readPending,
    refetch,
  } = useReadContracts({
    config: readConfig,
    contracts: [
      {
        ...itemContract,
        functionName: "highestBidder",
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
  const [highestBidder, remainingBidTime, erc20Address] = data || [];

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  useWatchContractEvent({
    config: readConfig,
    address: itemContractAddress,
    abi,
    eventName: "NewBid",
    onLogs(logs) {
      // console.log(logs);
      // @ts-ignore
      refetch();
    },
  });

  if (readPending) return <p>Loading...</p>;

  const winnerAddress = highestBidder?.result as `0x${string}`;
  const winnerFormatted = `${winnerAddress.substring(
    0,
    6
  )}...${winnerAddress.substring(winnerAddress.length - 4)}`;

  return (
    <>
      <p className="text-right my-3 text-gray-900">
        Time Left:{" "}
        {remainingBidTime?.result
          ? formatDuration(remainingBidTime.result as bigint)
          : "N/A"}
      </p>
      <div className="mb-3 flex flex-row flex-wrap justify-between text-gray-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={puppetImgSrc}
          alt="puppet"
          className="mr-3"
          height={24}
          width={24}
        />
        <p className="flex-1 text-left text-gray-900">
          {winnerFormatted}
          {winnerAddress === address ? " (You)" : ""}
        </p>
        <p>
          <HighestBid
            highestBidder={highestBidder?.result as `0x${string}`}
            itemContractAddress={itemContractAddress as `0x${string}`}
          />
        </p>
      </div>
      <EnterBidAmount
        itemContractAddress={itemContractAddress as `0x${string}`}
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
