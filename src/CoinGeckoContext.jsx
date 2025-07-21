import React, { createContext, useContext, useEffect, useState } from 'react';

const CoinGeckoContext = createContext();

const COINS_URL = 'https://duniacryptoproxy.onrender.com/coingecko/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
const GLOBAL_URL = 'https://duniacryptoproxy.onrender.com/coingecko/api/v3/global';

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
      if (!coinsRes.ok || !globalRes.ok) throw new Error('Failed to fetch CoinGecko data. Please try again later.');
      const coinsData = await coinsRes.json();
      const globalData = await globalRes.json();
      
      // Transform CoinCap data to match CoinGecko format
      const transformedCoins = coinsData.map((coin, index) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`,
        current_price: parseFloat(coin.current_price),
        market_cap: parseFloat(coin.market_cap),
        market_cap_rank: index + 1,
        price_change_percentage_24h: parseFloat(coin.price_change_percentage_24h),
        total_volume: parseFloat(coin.total_volume),
      }));
      
      // Calculate global market data
      const totalMarketCap = globalData.data.total_market_cap.usd;
      const totalVolume = globalData.data.total_volume.usd;
      const btcData = globalData.data.market_cap_percentage.btc;
      const btcDominance = btcData ? parseFloat(btcData) : 0;
      
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
      setError('Failed to fetch CoinGecko data. Please try again later.');
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