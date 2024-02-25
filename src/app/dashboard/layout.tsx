import styles from '../styles/dashboard.module.css'


export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <section className="auction-item">
        <img src="image2.jpg" alt="Auction Item 1" />
        <div className="auction-details">
          <h2>S is for Satoshi</h2>
          <p className="artist">By Fabled</p>
          <p className="description">The Tinies-Genesis Collection.</p>
          <div className="bid-info">
            <p className="current-bid">Current Bid: 2.2 BTC</p>
            <p className="time-left">Time Left: 1d 6h 15m</p>
          </div>
          <button>Place Bid</button>
        </div>
      </section>
    );
  }