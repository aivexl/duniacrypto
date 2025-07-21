export async function GET(req) {
  const { searchParams, pathname } = new URL(req.url);
  const apiPath = pathname.replace(/^\/api\/coingecko/, '');
  const apiUrl = `https://api.coingecko.com${apiPath}${searchParams ? '?' + searchParams.toString() : ''}`;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json',
    'x-cg-pro-api-key': process.env.COINGECKO_API_KEY || ''
  };
  const res = await fetch(apiUrl, { headers });
  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('content-type') || 'application/json' }
  });
} 