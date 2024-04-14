// page.js

import React from 'react';
import styles from './auctions.module.css'; // Import CSS module
import Image from 'next/image';

const Auctions = () => {
    return (
        <div className={styles.auctionsContainer}>
            <header className={styles.header}>
                <h1 className={styles.auctionsHeader}>Auctions</h1>
                <p className={styles.subHeader}>by Fabled</p>
            </header>
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
            
            <footer className={styles.footer}>
                <p>&copy; 2023 Fabled</p>
            </footer>
        </div>
    );
}

export default Auctions;
