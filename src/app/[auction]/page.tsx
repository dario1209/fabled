"use client";
import React, { useEffect } from "react";
import AuctionItemCard from "@/components/AuctionItem/AuctionItem";
import "./styles.css";
import useAuctionItems from "@/hooks/useAuctionItems";

const Auctions = ({ params }: { params: { auction: string } }) => {
  const { auction } = params;
  const { auctionItems } = useAuctionItems();
  const item = auctionItems.find((item) => item.id === auction);

  return (
    <main className="flex-1 p-4 flex flex-col items-center">
      {item ? (
        <AuctionItemCard key={item.id} item={item} />
      ) : (
        <div>Loading</div>
      )}
    </main>
  );
};

export default Auctions;
