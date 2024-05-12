import { Chain } from "viem";
import { createConfig, http } from "wagmi";

const bobTestnet = {
  id: 111,
  name: "BOB testnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.rpc.gobob.xyz/"] },
  },
  blockExplorers: {
    default: {
      name: "BOB testnet explorer",
      url: "https://testnet-explorer.gobob.xyz/",
    },
  },
} as const satisfies Chain;

export const readConfig = createConfig({
  chains: [bobTestnet],
  transports: {
    [bobTestnet.id]: http(),
  },
});
