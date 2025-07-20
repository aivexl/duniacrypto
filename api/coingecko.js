export default async function handler(req, res) {
  const { url, method, headers } = req;
  // Ambil path dan query setelah /api/coingecko
  const coingeckoPath = req.url.replace(/^\/api\/coingecko/, '');
  const apiUrl = `https://api.coingecko.com${coingeckoPath}`;

  try {
    const response = await fetch(apiUrl, {
      method,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      },
    });
    const contentType = response.headers.get('content-type');
    res.statusCode = response.status;
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    } else {
      const text = await response.text();
      res.setHeader('Content-Type', contentType || 'text/plain');
      res.end(text);
    }
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Proxy error', detail: error.message }));
  }
} 