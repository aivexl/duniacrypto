module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'duniacrypto-background': '#0D1117',
        'duniacrypto-panel': '#161B22',
        'duniacrypto-card': '#1F2937',
        'duniacrypto-green': '#22C55E',
        'duniacrypto-red': '#EF4444',
      },
      animation: {
        'star-movement-bottom': 'star-movement-bottom 3s linear infinite',
        'star-movement-top': 'star-movement-top 3s linear infinite',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'star-movement-top': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}; 