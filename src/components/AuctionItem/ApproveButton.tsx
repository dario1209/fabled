import { useEffect } from "react";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
  useSwitchChain,
} from "wagmi";

import abiERC20 from "@/abi/ERC20.json";
import SwitchNetworkButton from "./SwitchNetworkButton";

interface ButtonProps {
  minBid: bigint;
  itemContractAddress: `0x${string}`;
  erc20ContractAddress: `0x${string}`;
  setNeedApprove: (value: boolean) => void;
}

const ApproveButton = ({
  minBid,
  itemContractAddress,
  erc20ContractAddress,
  setNeedApprove,
}: ButtonProps) => {
  const erc20Contract = {
    address: erc20ContractAddress,
    abi: abiERC20,
  } as const;

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { address, chain } = useAccount();
  console.log(address, " adddress");

  const wrongChain = chain?.id !== 111;

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      setNeedApprove(false);
    }
  }, [isConfirmed, setNeedApprove]);

  const handleApprove = async () => {
    try {
      writeContract({
        ...erc20Contract,
        functionName: "approve",
        args: [itemContractAddress, minBid],
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
      {isPending || isConfirming ? (
        <button disabled className="bid-button">
          Loading...
        </button>
      ) : (
        <button onClick={handleApprove} className="bid-button">
          Approve
        </button>
      )}
    </>
  );
};

export default ApproveButton;
