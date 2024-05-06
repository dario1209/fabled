import { Chain, createPublicClient, http } from "viem";

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

export const publicClient = createPublicClient({
  chain: bobTestnet,
  transport: http(),
});
