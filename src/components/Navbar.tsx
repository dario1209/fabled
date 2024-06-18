/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow m-4 rounded-lg">
      <div className="max-w-screen-xl flex flex-col sm:flex-row flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://getfabled.art/"
          className="flex flex-col sm:flex-row flex-wrap px-3.5 dark:text-white text-gray-900 bg-transparent justify-between items-center"
          aria-current="page"
        >
          <img
            src="fabled.png"
            alt="fabled"
            className="h-5 object-contain mb-2 sm:mb-0"
          ></img>
          <div className="px-2 my-0">
            incentivized experimental art factory on bitcoin
          </div>
        </a>
        <div className="q-login-button m-0 text-right pt-5 sm:pt-0">
          <ConnectButton
            label="connect wallet"
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
