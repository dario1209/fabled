import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

const ConnectButton = () => {
  const { connect } = useConnect();

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="bid-button"
    >
      Connect Wallet
    </button>
  );
};

export default ConnectButton;
