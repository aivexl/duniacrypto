import React, { createContext, useContext, useEffect, useState } from 'react';

const CoinGeckoContext = createContext();

const COINS_URL = 'https://api.coincap.io/v2/assets?limit=10';
const GLOBAL_URL = 'https://api.coincap.io/v2/assets';

export function CoinGeckoProvider({ children }) {
  const [coins, setCoins] = useState(null);
  const [global, setGlobal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch both endpoints in parallel
  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [coinsRes, globalRes] = await Promise.all([
        fetch(COINS_URL),
        fetch(GLOBAL_URL),
      ]);
      if (!coinsRes.ok || !globalRes.ok) throw new Error('Failed to fetch CoinCap data');
      const coinsData = await coinsRes.json();
      const globalData = await globalRes.json();
      
      // Transform CoinCap data to match CoinGecko format
      const transformedCoins = coinsData.data.map((coin, index) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`,
        current_price: parseFloat(coin.priceUsd),
        market_cap: parseFloat(coin.marketCapUsd),
        market_cap_rank: index + 1,
        price_change_percentage_24h: parseFloat(coin.changePercent24Hr),
        total_volume: parseFloat(coin.volumeUsd24Hr),
      }));
      
      // Calculate global market data
      const totalMarketCap = globalData.data.reduce((sum, coin) => sum + parseFloat(coin.marketCapUsd), 0);
      const totalVolume = globalData.data.reduce((sum, coin) => sum + parseFloat(coin.volumeUsd24Hr), 0);
      const btcData = globalData.data.find(coin => coin.symbol === 'BTC');
      const btcDominance = btcData ? (parseFloat(btcData.marketCapUsd) / totalMarketCap) * 100 : 0;
      
      setCoins(transformedCoins);
      setGlobal({
        data: {
          total_market_cap: { usd: totalMarketCap },
          total_volume: { usd: totalVolume },
          market_cap_percentage: { btc: btcDominance },
          market_cap_change_percentage_24h_usd: 0, // CoinCap doesn't provide this
        }
      });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 5 * 60 * 60 * 1000); // 5 hours
    return () => clearInterval(interval);
  }, []);

  return (
    <CoinGeckoContext.Provider value={{ coins, global, loading, error, refresh: fetchAll }}>
      {children}
    </CoinGeckoContext.Provider>
  );
}

export function useCoinGecko() {
  return useContext(CoinGeckoContext);
} 