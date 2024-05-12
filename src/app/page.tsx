"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    document.body.classList.add("home-page-style");

    return () => {
      document.body.classList.remove("home-page-style");
    };
  }, []);

  return (
    <main className="home-page flex flex-col items-center justify-between p-24">
      <div className="hero">
        <h1 className="text-8xl animated-heading">fabled</h1>
        <p>incentivized experimental art factory on bitcoin</p>
        <Link href="/auctions">
          <button className="btn-a">Auctions</button>
        </Link>
      </div>
    </main>
  );
}
