import React from 'react';
import { useCoinGecko } from '../CoinGeckoContext';
import StarBorder from './StarBorder';
import './MarketOverview.module.css';

function formatNumber(num) {
  if (!num && num !== 0) return '-';
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toLocaleString();
}

export default function MarketOverview() {
  const { global, loading } = useCoinGecko();

  if (loading && !global) {
    return (
      <div className="bg-duniacrypto-panel rounded-lg shadow p-4 animate-pulse text-gray-400">
        Loading market overview...
      </div>
    );
  }

  const { total_market_cap, total_volume, market_cap_change_percentage_24h_usd, market_cap_percentage } = global || {};
  const btcDominance = market_cap_percentage?.btc;
  const marketCap = total_market_cap?.usd;
  const volume = total_volume?.usd;
  const capChange = market_cap_change_percentage_24h_usd;

  return (
    <>
      <div className="relative bg-duniacrypto-panel rounded-lg shadow p-4 mb-8">
        <h2 className="text-lg font-bold mb-4">Market Overview</h2>
        {/* Overlay spinner saat loading dan data sudah ada */}
        {loading && global && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 rounded-lg">
            <div className="w-6 h-6 border-2 border-duniacrypto-green border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Market Cap</span>
            <span className="font-mono">${formatNumber(marketCap)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">24H Volume</span>
            <span className="font-mono">${formatNumber(volume)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">BTC Dominance</span>
            <span className="font-mono">{btcDominance?.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Market Cap Change (24H)</span>
            <span className={capChange >= 0 ? 'text-duniacrypto-green font-semibold flex items-center' : 'text-duniacrypto-red font-semibold flex items-center'}>
              {capChange >= 0 ? '▲' : '▼'} {capChange?.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
      {/* Subscribe Section terpisah */}
      <StarBorder as="div" color="cyan" speed="8s" thickness={1} className="relative bg-duniacrypto-panel rounded-lg shadow p-4 flex flex-col items-center gap-3 w-full max-w-full mt-0 mb-8">
        <h3 className="text-base font-bold mb-3 text-white">Subscribe for Crypto Updates</h3>
        <form className="w-full flex flex-col sm:flex-row gap-2 items-center justify-center mt-2">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-duniacrypto-green text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-duniacrypto-green text-black font-bold hover:bg-green-400 transition text-sm"
          >
            Subscribe
          </button>
        </form>
      </StarBorder>
    </>
  );
} 