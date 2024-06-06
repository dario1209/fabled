/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useRef, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./navbar.css";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useAuctionItems from "@/hooks/useAuctionItems";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const { auctionItems } = useAuctionItems();

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), [])
  );

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-col sm:flex-row flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://getfabled.art/"
          className="block py-2 px-3.5 dark:text-white text-gray-900 bg-transparent "
          aria-current="page"
        >
          incentivized experimental art factory on bitcoin
        </a>
        {/* <div
            className="flex-1 hidden w-full md:block md:w-auto"
            id="navbar-default"
          >
            <ul className="font-medium flex md:flex-row justify-end">
              <li className="flex items-center m-0">
                <a
                  href="/"
                  className="block py-2 px-3.5 dark:text-white text-gray-900 bg-transparent"
                  aria-current="page"
                >
                  incentivized experimental art factory on bitcoin
                </a>
              </li>
              {/* <li className="flex items-center m-0">
                <a
                  href={`/${auctionItems[0].id}`}
                  className="block py-2 px-3.5 text-gray-900 rounded border-0  dark:text-white"
                >
                  Auction
                </a>
              </li> */}
        {/* <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Docs</a>
              </li> */}
        {/* <li>
                <a href="https://nostr.directory/" target="_blank" rel="noopener noreferrer" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Chat</a>
              </li> */}
        {/* </ul>
          </div> */}
        <div className="q-login-button m-0 text-right">
          <ConnectButton
            label="connect"
            accountStatus="address"
            chainStatus="icon"
            showBalance={false}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
