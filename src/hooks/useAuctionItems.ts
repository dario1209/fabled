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
      contractAddress: "0xf3CE6e2B0A2c531229897041455D79d6ee7a4CDc",
      puppetImgSrc: "/her.png",
    },
    {
      id: "02",
      url: "https://www.ord.io/60737374",
      imgSrc:
        "https://ordin.s3.amazonaws.com/inscriptions/d365cbae29347a0a804f17d3ddaa6735c58319f0dd52ba133a5b7477aa469872i0",
      title: "S is for Satoshi who perished of fits",
      artist: "the tinies",
      description: "Genesis/Chapter One",
      contractAddress: "0xaf34cbB430a8914B4BA989188C4C46599a40A46E",
      puppetImgSrc: "/him.png",
    },
    {
      id: "03",
      url: "https://www.ord.io/61011180",
      imgSrc: "/P-is-for-Puppet.png",
      title: "P is for Puppet",
      artist: "the tinies",
      description: "Genesis/Chapter One",
      contractAddress: "0x9344F0b0A10B1B8c7E10900C1C758a4D05B03Db2",
      puppetImgSrc: "/him.png",
    },
  ];

  const getPuppetImgSrc = (contractAddress: string) => {
    return auctionItems.find((item) => item.contractAddress === contractAddress)
      ?.puppetImgSrc;
  };

  return { auctionItems, getPuppetImgSrc };
};

export default useAuctionItems;
