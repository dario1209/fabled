import React, { useState } from "react";
import { formatUnits, parseUnits } from "viem";
import ConnectButton from "./ConnectButton";
import { useAccount, useReadContracts } from "wagmi";
import { readConfig } from "@/providers/readConfig";
import abi from "@/abi/EnglishAuction.json";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "react-use";
import UnsuccessfulBid from "./UnsuccessfullBid";
import HighestBid from "./HighestBid";
import useAuctionItems from "@/hooks/useAuctionItems";

interface AuctionFinishedProps {
  itemContractAddress: `0x${string}`;
}

const AuctionFinished: React.FC<AuctionFinishedProps> = ({
  itemContractAddress,
}) => {
  const { address } = useAccount();
  const [, copyToClipboard] = useCopyToClipboard();
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
        functionName: "highestBidder",
        args: [],
      },
      {
        ...itemContract,
        functionName: "bids",
        args: [address],
      },
    ],
  });
  const [winner] = data || [];

  const { getPuppetImgSrc } = useAuctionItems();
  const puppetImgSrc = getPuppetImgSrc(itemContractAddress);

  if (readPending) return <p>Loading...</p>;

  const winnerAddress = winner?.result as `0x${string}`;
  const winnerFormatted = `${winnerAddress.substring(
    0,
    6
  )}...${winnerAddress.substring(winnerAddress.length - 4)}`;

  const isWinner = winnerAddress === address;

  const handleCopyAddress = () => {
    copyToClipboard(winnerAddress);
    toast.success("Address copied to clipboard!");
  };

  return (
    <>
      <div className="mb-3 flex flex-row flex-wrap justify-between text-gray-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={puppetImgSrc}
          alt="puppet"
          className="mr-3"
          height={24}
          width={24}
        />
        <p
          className="flex-1 text-left text-gray-900"
          onClick={handleCopyAddress}
          style={{ cursor: "pointer" }}
        >
          Winner: {winnerFormatted}
        </p>
        <p>
          Winner bid:{" "}
          <HighestBid
            highestBidder={winnerAddress}
            itemContractAddress={itemContractAddress as `0x${string}`}
          />
        </p>
      </div>
      {address && isWinner && <p>You are the winner!</p>}
      {address && !isWinner && (
        <UnsuccessfulBid
          itemContractAddress={itemContractAddress as `0x${string}`}
          userAddress={address as `0x${string}`}
        />
      )}
    </>
  );
};

export default AuctionFinished;
