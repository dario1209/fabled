import React, { useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { formatDuration } from "@/utils/formatDuration";
import EnterBidAmount from "./EnterBidAmount";
import BidButton from "./BidButton";
import ConnectButton from "./ConnectButton";
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { readConfig } from "@/providers/readConfig";
import abi from "@/abi/EnglishAuction.json";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "react-use";
import SwitchNetworkButton from "./SwitchNetworkButton";

interface UnsuccessfulBidProps {
  itemContractAddress: `0x${string}`;
  userAddress: `0x${string}`;
}

const UnsuccessfulBid: React.FC<UnsuccessfulBidProps> = ({
  itemContractAddress,
  userAddress,
}) => {
  const { isConnected } = useAccount();

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
        args: [userAddress],
      },
    ],
  });
  const [userBid] = data || [];

  const {
    data: hash,
    error: withdrawError,
    isPending: isPending,
    writeContract,
  } = useWriteContract();

  const { isLoading: isTxConfirming, isSuccess: isTxConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { chain } = useAccount();
  const wrongChain = chain?.id !== 111;

  if (readPending) return <p>Loading...</p>;

  const withdrawAmount = userBid
    ? ((userBid?.result as Array<any>)[0] as bigint)
    : 0n;

  if (withdrawAmount <= 0n) return null;

  const handleClick = () => {
    writeContract({
      ...itemContract,
      functionName: "unsuccessfulBidWithdraw",
      args: [],
    });
  };

  if (wrongChain) {
    return <SwitchNetworkButton />;
  }

  return (
    <>
      {isConnected ? (
        <>
          <p className="text-left my-3">
            You have {formatUnits(300000n, 8)} to withdraw
          </p>
          <button onClick={handleClick} className="bid-button">
            Withdraw bid
          </button>
        </>
      ) : (
        <ConnectButton />
      )}
    </>
  );
};

export default UnsuccessfulBid;
