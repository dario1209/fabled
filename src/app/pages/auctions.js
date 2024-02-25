// pages/auctions.js
import React from 'react';

const Auctions = () => {
  return (
    <div>
      

      <main className="gallery">
        <section className="auction-item">
          <img src="image1.jpg" alt="Auction Item 1" />
          <div className="auction-details">
            <h2>Auction Item Title 1</h2>
            <p className="artist">By Artist Name</p>
            <p className="description">Description of the auction item. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="bid-info">
              <p className="current-bid">Current Bid: 1.5 ETH</p>
              <p className="time-left">Time Left: 2d 4h 30m</p>
            </div>
            <button>Place Bid</button>
          </div>
        </section>

        <section className="auction-item">
          <img src="image2.jpg" alt="Auction Item 2" />
          <div className="auction-details">
            <h2>Auction Item Title 2</h2>
            <p className="artist">By Artist Name</p>
            <p className="description">Description of the auction item. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="bid-info">
              <p className="current-bid">Current Bid: 2.2 ETH</p>
              <p className="time-left">Time Left: 1d 6h 15m</p>
            </div>
            <button>Place Bid</button>
          </div>
        </section>

        {/* Add more auction items as needed */}

      </main>

      <footer>
        <p>&copy; 2023 Your Website Name</p>
      </footer>
    </div>
  );
};

export default Auctions;
