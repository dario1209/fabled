'use client'
import React, { useEffect } from "react";
import "./styles.css";
import AuctionItemCard, { type AuctionItem } from "@/components/AuctionItem/AuctionItem";

const auctionItems: AuctionItem[] = [
  {
    id: "01",
    url: "https://www.ord.io/61011180",
    imgSrc: "/P-is-for-Puppet.png",
    title: "P is for Puppet",
    artist: "the tinies",
    description: "Genesis/Chapter One",
    contractAddress: "f3CE6e2B0A2c531229897041455D79d6ee7a4CDc",
  },
  // {
  //   id: "02",
  //   url: "https://www.ord.io/61011180",
  //   imgSrc: "/P-is-for-Puppet.png",
  //   title: "P is for Puppet",
  //   artist: "the tinies",
  //   description: "Genesis/Chapter One",
  //   contractAddress: "f3CE6e2B0A2c531229897041455D79d6ee7a4CDc",
  // },
  // {
  //   id: "03",
  //   url: "https://www.ord.io/61011180",
  //   imgSrc: "/P-is-for-Puppet.png",
  //   title: "P is for Puppet",
  //   artist: "the tinies",
  //   description: "Genesis/Chapter One",
  //   contractAddress: "f3CE6e2B0A2c531229897041455D79d6ee7a4CDc",
  // }
]

const Auctions = () => {
  useEffect(() => {
    document.body.classList.add('auctions-container');

    return () => {
      document.body.classList.remove('auctions-container');
    };
  }, []);

  return (
    <main className="flex-1 p-4 flex flex-col items-center">
      {auctionItems.map(item => <AuctionItemCard key={item.id} item={item} />)}
    </main>
  );
};

export default Auctions;
