import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Crypto dashboard, news, and market overview" />
        <meta name="keywords" content="crypto, cryptocurrency, bitcoin, ethereum, market, news" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dunia Crypto</title>
      </head>
      <body className="bg-duniacrypto-background text-white min-h-screen">
        {children}
      </body>
    </html>
  );
} 