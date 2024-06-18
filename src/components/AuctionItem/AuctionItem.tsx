import Image from "next/image";
import { useReadContracts } from "wagmi";
import abi from "@/abi/EnglishAuction.json";
import { readConfig } from "@/providers/readConfig";
import GoToButtons from "./GoToButtons";
import { getAuctionStatus } from "@/utils/getAuctionStatus";
import AuctionRunning from "./AuctionRunning";
import AuctionFinished from "./AuctionFinished";

export interface AuctionItem {
  id: string;
  title: string;
  artist: string;
  description: string;
  imgSrc: string;
  url: string;
  contractAddress: string;
  puppetImgSrc: string;
}

interface AuctionItemCardProps {
  key: string;
  item: AuctionItem;
}

const AuctionItemCard = ({ item }: AuctionItemCardProps) => {
  const itemContract = {
    address: item.contractAddress as `0x${string}`,
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
        functionName: "startAt",
        args: [],
      },
      {
        ...itemContract,
        functionName: "getState",
        args: [],
      },
    ],
  });
  const [startAt, state] = data || [];

  if (readPending) return <p>Loading...</p>;

  const dateInfo =
    startAt && typeof startAt.result === "bigint"
      ? new Date(Number(startAt.result) * 1000).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })
      : "";

  const auctionState = getAuctionStatus(state?.result as number);

  return (
    <div className="auction-item flex flex-col w-full md:flex-row overflow-hidden my-5 dark:text-white text-gray-900">
      <div className="w-full md:w-1/2 flex flex-row items-center justify-center">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full"
        >
          <div
            className="relative w-full flex flex-row items-center justify-center"
            style={{
              height: "70vh",
            }}
          >
            <Image
              priority
              className="relative"
              src={item.imgSrc}
              sizes="300px"
              style={{
                objectFit: "contain",
              }}
              fill={true}
              alt={`Auction Item - ${item.title}`}
            />
          </div>
        </a>
      </div>
      <div className="w-full md:w-1/2 py-4 px-4 flex flex-col max-w-md mx-auto">
        <div className="flex flex-row items-center mb-3 gap-4 text-gray-900">
          <GoToButtons currenItemId={item.id} />
          {dateInfo}
        </div>
        <h2 className="text-2xl md:text-3xl text-left mb-5 text-gray-900">
          {item.title}
        </h2>
        <p className="text-left text-sm my-0 text-gray-900">{item.artist}</p>
        <p className="text-left my-0 text-gray-900">{item.description}</p>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-left text-sm my-5 text-gray-500"
        >
          {item.url}
        </a>
        <p className="flex-1"></p>
        {auctionState === "running" && (
          <AuctionRunning
            itemContractAddress={item.contractAddress as `0x${string}`}
          />
        )}
        {auctionState === "complete" && (
          <AuctionFinished
            itemContractAddress={item.contractAddress as `0x${string}`}
          />
        )}
      </div>
    </div>
  );
};

export default AuctionItemCard;
