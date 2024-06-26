import { useEffect, useState } from "react";
import {
  type BaseError,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from "wagmi";
import toast from "react-hot-toast";

import abiAuction from "@/abi/EnglishAuction.json";
import abiERC20 from "@/abi/ERC20.json";
import ApproveButton from "./ApproveButton";
import SwitchNetworkButton from "./SwitchNetworkButton";
import { readConfig } from "@/providers/readConfig";

interface BidButtonProps {
  minBid: bigint;
  itemContractAddress: `0x${string}`;
  erc20ContractAddress: `0x${string}`;
}

const BidButton = ({
  minBid,
  itemContractAddress,
  erc20ContractAddress,
}: BidButtonProps) => {
  const [needApprove, setNeedApprove] = useState(false);
  const { address, chain } = useAccount();

  const wrongChain = chain?.id !== 111;

  const itemContract = {
    address: itemContractAddress,
    abi: abiAuction,
  } as const;

  const erc20Contract = {
    address: erc20ContractAddress,
    abi: abiERC20,
  } as const;

  const {
    data: allowance,
    error: allowanceError,
    isPending: allowancePending,
  } = useReadContract({
    config: readConfig,
    ...erc20Contract,
    functionName: "allowance",
    args: [address, itemContractAddress],
  });

  useEffect(() => {
    setNeedApprove((allowance as bigint) < minBid);
  }, [allowance, minBid]);

  const {
    data: hash,
    error: bidError,
    isPending: isBidPending,
    writeContract,
  } = useWriteContract();

  const { isLoading: isBidConfirming, isSuccess: isBidConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handlePlaceBid = async () => {
    try {
      writeContract({
        ...itemContract,
        functionName: "bid",
        args: [address, minBid],
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (wrongChain) {
    return <SwitchNetworkButton />;
  }

  return (
    <>
      {needApprove ? (
        <ApproveButton
          minBid={minBid}
          itemContractAddress={itemContractAddress}
          erc20ContractAddress={erc20ContractAddress}
          setNeedApprove={setNeedApprove}
        />
      ) : isBidConfirming || allowancePending ? (
        <button disabled className="bid-button">
          Loading...
        </button>
      ) : (
        <button onClick={handlePlaceBid} className="bid-button text-gray-900">
          Place Bid
        </button>
      )}
      {hash && (
        <p className="break-words text-sm text-gray-900">
          Transaction Hash: {hash}
        </p>
      )}
      {bidError && (
        <p className="break-words text-sm text-gray-900">
          Error: {(bidError as BaseError).shortMessage || bidError.message}
        </p>
      )}
    </>
  );
};

export default BidButton;
