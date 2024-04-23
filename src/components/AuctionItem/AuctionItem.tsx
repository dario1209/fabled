import Image from "next/image";
import { 
  type BaseError,
  useReadContracts,
  useWaitForTransactionReceipt, 
  useWriteContract, 
  useAccount
} from 'wagmi'
import abi from '@/abi/EnglishAuction.json'
import { formatDuration } from "@/utils/formatDuration";
import BidButton from "./BidButton";

export interface AuctionItem {
  id: string,
  title: string,
  artist: string,
  description: string,
  imgSrc: string,
  url: string,
  contractAddress: string,
}

interface AuctionItemCardProps {
  key: string,
  item: AuctionItem,
}

const AuctionItemCard = ({ item } : AuctionItemCardProps) => {
  const { address } = useAccount()

  const itemContract = {
    address: `0x${item.contractAddress}`,
    abi: abi,
  } as const
  

  const { 
    data,
    error: readError,
    isPending: readPending
  } = useReadContracts({ 
    contracts: [{
      ...itemContract,
      functionName: 'getMinBid',
      args: [],
    }, { 
      ...itemContract, 
      functionName: 'getRemainingBidTime', 
      args: [], 
    }, { 
      ...itemContract, 
      functionName: 'biddingToken', 
      args: [], 
    }]
  }) 
  const [minBid, remainingBidTime, erc20Address] = data || [] 

  // console.log({ minBid, remainingBidTime, erc20Address }, address)

  if (readPending) return <p>Loading...</p>
  
  return(
    <div className="auction-item flex flex-col md:flex-row rounded-lg overflow-hidden max-w-screen-lg my-5">
      <div className="w-full md:w-1/2 flex flex-row justify-center">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative"
        >
          <Image
            className=""
            src="/P-is-for-Puppet.png"
            width={500}
            height={300}
            // objectFit="cover"
            alt={`Auction Item - ${item.title}`}
          />
        </a>
      </div>
      <div className="w-full md:w-1/2 p-4 flex flex-col">
        <h2 className="text-2xl md:text-3xl text-center">{item.title}</h2>
        <p className="text-center text-sm">{item.artist}</p>
        <p className="flex-1 text-center my-5">{item.description}</p>
        <div className="mb-3 flex flex-row flex-wrap justify-between">
          <p className="text-white">Current Bid: {}</p>
          <p className="text-white">Time Left: {formatDuration(remainingBidTime?.result as bigint)}</p>
        </div>
        {/* <button onClick={handlePlaceBid} className="bid-button">Place Bid</button> */}
        <BidButton 
          minBid={minBid?.result as bigint} 
          itemContractAddress={`0x${item.contractAddress}`}
          erc20ContractAddress={erc20Address?.result as `0x${string}`}
        />
      </div>
    </div>
  )

}

export default AuctionItemCard
