import { useSwitchChain } from "wagmi";

const SwitchNetworkButton = () => {
  const { switchChain } = useSwitchChain();

  return (
    <button
      onClick={(e) => switchChain({ chainId: 111 })}
      className="bid-button"
    >
      Switch chain
    </button>
  );
};

export default SwitchNetworkButton;
