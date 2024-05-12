import { type AuctionItem } from "@/components/AuctionItem/AuctionItem";

const useAuctionItems = () => {
  const auctionItems: AuctionItem[] = [
    {
      id: "01",
      url: "https://www.ord.io/61011180",
      imgSrc: "/P-is-for-Puppet.png",
      title: "P is for Puppet",
      artist: "the tinies",
      description: "Genesis/Chapter One",
      contractAddress: "0xaf34cbB430a8914B4BA989188C4C46599a40A46E",
    },
    {
      id: "02",
      url: "https://www.ord.io/61011180",
      imgSrc: "/P-is-for-Puppet.png",
      title: "P is for Puppet - 2",
      artist: "the tinies",
      description: "Genesis/Chapter One - 2",
      contractAddress: "0xaf34cbB430a8914B4BA989188C4C46599a40A46E",
    },
  ];

  return { auctionItems };
};

export default useAuctionItems;
