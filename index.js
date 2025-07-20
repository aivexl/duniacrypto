import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const cache = {}; // { [url]: { status, contentType, body, timestamp } }
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 jam

// Proxy CoinGecko
app.use('/coingecko', async (req, res) => {
  const url = `https://api.coingecko.com${req.url}`;
  const cacheKey = url;
  const now = Date.now();

  if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_DURATION)) {
    const cached = cache[cacheKey];
    res.status(cached.status);
    res.set('Content-Type', cached.contentType);
    return res.send(cached.body);
  }

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }
    });
    const body = await response.buffer();
    const contentType = response.headers.get('content-type');
    cache[cacheKey] = {
      status: response.status,
      contentType,
      body,
      timestamp: now
    };
    res.status(response.status);
    res.set('Content-Type', contentType);
    res.send(body);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', detail: err.message });
  }
});

// Proxy CoinCap - Fixed route
app.use('/coincap', async (req, res) => {
  // Remove /coincap from the path and construct correct URL
  const path = req.url.replace(/^\/coincap/, '');
  const url = `https://api.coincap.io${path}`;
  const cacheKey = url;
  const now = Date.now();

  console.log('CoinCap proxy request:', { originalUrl: req.url, path, finalUrl: url });

  if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_DURATION)) {
    const cached = cache[cacheKey];
    res.status(cached.status);
    res.set('Content-Type', cached.contentType);
    return res.send(cached.body);
  }

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`CoinCap API responded with status: ${response.status}`);
    }
    
    const body = await response.buffer();
    const contentType = response.headers.get('content-type');
    cache[cacheKey] = {
      status: response.status,
      contentType,
      body,
      timestamp: now
    };
    res.status(response.status);
    res.set('Content-Type', contentType);
    res.send(body);
  } catch (err) {
    console.error('CoinCap proxy error:', err);
    res.status(500).json({ error: 'CoinCap proxy error', detail: err.message });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'DuniaCrypto Proxy Server', 
    status: 'running',
    endpoints: ['/coingecko/*', '/coincap/*']
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy with 24h cache listening on port ${PORT}`)); 