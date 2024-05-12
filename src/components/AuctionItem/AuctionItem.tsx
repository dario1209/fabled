import Image from "next/image";
import { useAccount, useReadContracts, useWatchContractEvent } from "wagmi";
import abi from "@/abi/EnglishAuction.json";
import { formatDuration } from "@/utils/formatDuration";
import BidButton from "./BidButton";
import { formatUnits, parseUnits } from "viem";
import { useState } from "react";
import EnterBidAmount from "./EnterBidAmount";
import { readConfig } from "@/providers/readConfig";
import ConnectButton from "./ConnectButton";

export interface AuctionItem {
  id: string;
  title: string;
  artist: string;
  description: string;
  imgSrc: string;
  url: string;
  contractAddress: string;
}

interface AuctionItemCardProps {
  key: string;
  item: AuctionItem;
}

const AuctionItemCard = ({ item }: AuctionItemCardProps) => {
  const [currentBid, setCurrentBid] = useState();
  const [minBidState, setMinBidState] = useState();

  const { isConnected } = useAccount();

  const [bidAmount, setBidAmount] = useState<string>("");

  const itemContract = {
    address: item.contractAddress as `0x${string}`,
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
      {
        ...itemContract,
        functionName: "expiresAt",
        args: [],
      },
      {
        ...itemContract,
        functionName: "highestBidder",
        args: [],
      },
    ],
  });
  const [minBid, remainingBidTime, erc20Address, expiresAt, highestBidder] =
    data || [];

  useWatchContractEvent({
    config: readConfig,
    address: item.contractAddress as `0x${string}`,
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
    <div className="auction-item flex flex-col w-full md:flex-row overflow-hidden my-5 dark:text-white text-gray-900">
      <div className="w-full md:w-1/2 flex flex-row items-center justify-center">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full"
        >
          <div
            className="relative w-full flex flex-row items-center justify-center"
            style={{
              height: "70vh",
            }}
          >
            <Image
              priority
              className="relative"
              src="/P-is-for-Puppet.png"
              sizes="300px"
              style={{
                objectFit: "contain",
              }}
              fill={true}
              alt={`Auction Item - ${item.title}`}
            />
          </div>
        </a>
      </div>
      <div className="w-full md:w-1/2 px-4 flex flex-col max-w-md mx-auto">
        <h2 className="text-2xl md:text-3xl text-left">{item.title}</h2>
        <p className="text-left text-sm">{item.artist}</p>
        <p className="flex-1 text-left my-5">{item.description}</p>
        {(expiresAt?.result as number) > new Date().getTime() && (
          <p>Winner: {(highestBidder?.result as string) || "N/A"}</p>
        )}
        <div className="mb-3 flex flex-row flex-wrap justify-between">
          {currentBid ? (
            <p>
              Current Bid:{" "}
              {currentBid ? formatUnits(currentBid as bigint, 8) : "N/A"}
            </p>
          ) : (
            <p>
              Min Bid:{" "}
              {minBid?.result
                ? formatUnits(minBid?.result as bigint, 8)
                : "N/A"}
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
          itemContractAddress={item.contractAddress as `0x${string}`}
          currentBid={currentBid}
          setMinBidState={setMinBidState}
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
        />
        {isConnected ? (
          <BidButton
            minBid={parseUnits(bidAmount, 8)}
            itemContractAddress={item.contractAddress as `0x${string}`}
            erc20ContractAddress={erc20Address?.result as `0x${string}`}
          />
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  );
};

export default AuctionItemCard;
