import React, { useState } from 'react';
import CryptoTicker from './components/CryptoTicker';
import CryptoTable from './components/CryptoTable';
import MarketOverview from './components/MarketOverview';
import NewsFeed from './components/NewsFeed';
import DailyRecap from './components/DailyRecap';
import Mindshare from './components/Mindshare';
import NewsSlider from './components/NewsSlider';
import StarBorder from './components/StarBorder';
import GradientText from './components/GradientText';
import { CoinGeckoProvider } from './CoinGeckoContext';

export default function Home() {
  const [popup, setPopup] = useState('');
  const [navOpen, setNavOpen] = useState(false);
  return (
    <CoinGeckoProvider>
      <div className="min-h-screen bg-duniacrypto-background text-white flex flex-col">
        <header className="sticky top-0 z-50 bg-duniacrypto-panel border-b border-gray-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <img src="/Asset/duniacrypto.png" alt="Dunia Crypto Logo" className="h-10 w-10 object-contain" style={{filter: 'drop-shadow(0 0 16px #22c5ff)'}} />
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="text-2xl font-bold tracking-tight font-sans"
              >
                Dunia Crypto
              </GradientText>
            </div>
          </div>
        </header>
        <CryptoTicker />
        <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 md:py-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 flex-1 w-full">
          <section className="col-span-1 xl:col-span-2 space-y-4 md:space-y-6">
            <NewsSlider />
            <DailyRecap />
            <NewsFeed perPage={30} initialCount={10} loadMoreCount={3} showThumbnails={true} noTitle={true} />
          </section>
          <aside className="col-span-1 space-y-4 md:space-y-6">
            <MarketOverview />
            <CryptoTable />
            <Mindshare />
          </aside>
        </main>
        <footer className="w-full bg-duniacrypto-panel text-gray-400 text-center py-6 mt-10 border-t border-gray-800">
          &copy; {new Date().getFullYear()} Dunia Crypto. All rights reserved.
        </footer>
      </div>
    </CoinGeckoProvider>
  );
} 