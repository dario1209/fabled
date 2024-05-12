import React, { useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { formatDuration } from "@/utils/formatDuration";
import EnterBidAmount from "./EnterBidAmount";
import BidButton from "./BidButton";
import ConnectButton from "./ConnectButton";
import { useAccount, useReadContracts, useWatchContractEvent } from "wagmi";
import { readConfig } from "@/providers/readConfig";
import abi from "@/abi/EnglishAuction.json";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "react-use";

interface AuctionRunningProps {
  itemContractAddress: `0x${string}`;
}

const AuctionRunning: React.FC<AuctionRunningProps> = ({
  itemContractAddress,
}) => {
  const [currentBid, setCurrentBid] = useState();
  const [minBidState, setMinBidState] = useState();

  const { isConnected } = useAccount();
  const [state, copyToClipboard] = useCopyToClipboard();

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
        functionName: "highestBidder",
        args: [],
      },
    ],
  });
  const [winner] = data || [];

  if (readPending) return <p>Loading...</p>;

  const winnerAddress = winner?.result as `0x${string}`;
  const winnerFormatted = `${winnerAddress.substring(
    0,
    6
  )}...${winnerAddress.substring(winnerAddress.length - 4)}`;

  const handleCopyAddress = () => {
    copyToClipboard(winnerAddress);
    toast.success("Address copied to clipboard!");
  };

  return (
    <>
      <div className="mb-3 flex flex-row flex-wrap justify-between">
        <p onClick={handleCopyAddress} style={{ cursor: "pointer" }}>
          Winner: {winnerFormatted}
        </p>
      </div>

      {isConnected ? (
        <p>here will be some button...</p>
      ) : (
        // <BidButton
        //   minBid={parseUnits(bidAmount, 8)}
        //   itemContractAddress={itemContractAddress as `0x${string}`}
        //   erc20ContractAddress={erc20Address?.result as `0x${string}`}
        // />
        <ConnectButton />
      )}
    </>
  );
};

export default AuctionRunning;
