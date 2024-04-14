// page.js

import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path as needed
import styles from './auctions.module.css'; // Import CSS module
import Image from 'next/image';








const Auctions = () => {
    return (
        <div>
            <Navbar />
        <div className={styles.auctionsContainer}>
            
                
            
            <main className={styles.main}>
            <div className={styles.auctionItem}>
    <a href="https://www.ord.io/61011180" target="_blank" rel="noopener noreferrer">
        <Image className={styles.auctionItemImage} src="/P-is-for-Puppet.png" width={500} height={500} alt="Auction Item" />
    </a>
    <div className={styles.auctionItemDetails}>
        <h2 className={styles.auctionItemTitle}>P is for Puppet</h2>
        <p className={styles.auctionItemArtist}>the tinies</p>
        <p className={styles.auctionItemDescription}>Genesis/Chapter One</p>
        <div className={styles.bidInfo}>
            <p className={styles.currentBid}>Current Bid: 1 BTC</p>
            <p className={styles.timeLeft}>Time Left: 1d 4h 30m</p>
        </div>
        <button className={styles.bidButton}>Place Bid</button>
    </div>
    
</div>

                {/* Add more auction items */}
            </main>
            
            <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline">Fabled™</a> All Rights Reserved.</span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li><a href="#" className="hover:underline me-4 md:me-6"></a></li>
              <li><a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline me-4 md:me-6">Licensing</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </footer>
        </div>
        </div>
    );
};

export default Auctions;
