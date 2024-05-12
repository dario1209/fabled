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
    <>
      <nav
        className="bg-white border-gray-200 dark:bg-gray-900"
        ref={burgerMenuRef}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://twitter.com/fabled_btc"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* <img src="https://twitter.com/fabled_btc" className="h-8" alt="" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900  dark:text-white">
              {" "}
              XXVI
            </span>
          </a>
          <div
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
                  Home
                </a>
              </li>
              <li className="flex items-center m-0">
                <a
                  href={`/${auctionItems[0].id}`}
                  className="block py-2 px-3.5 text-gray-900 rounded border-0  dark:text-white"
                >
                  Auction
                </a>
              </li>
              {/* <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Docs</a>
              </li> */}
              {/* <li>
                <a href="https://nostr.directory/" target="_blank" rel="noopener noreferrer" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Chat</a>
              </li> */}
            </ul>
          </div>
          <div className="q-login-button m-0">
            <ConnectButton
              label="Connect"
              accountStatus="address"
              chainStatus="icon"
              showBalance={false}
            />
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="hamburger-menu inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => {
              setIsDrawerOpen((prevIsOpenState) => !prevIsOpenState);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div className="relative">
        {isDrawerOpen && (
          <ul
            tabIndex={0}
            className="menu text-center w-full dropdown-content bg-white border-gray-200 dark:bg-gray-900 p-2 shadowrounded-box absolute z-50"
            onClick={() => {
              setIsDrawerOpen(false);
            }}
          >
            <li className="flex items-center m-0 justify-center">
              <a
                href="/"
                className="block py-2 px-3.5 dark:text-white text-gray-900 bg-transparent"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li className="flex items-center m-0 justify-center">
              <a
                href="/auctions"
                className="block py-2 px-3.5 text-gray-900 rounded border-0  dark:text-white"
              >
                Auction
              </a>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;
