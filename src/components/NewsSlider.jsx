import React, { useEffect, useRef, useState } from 'react';

const PLACEHOLDER = '/Asset/duniacrypto.png';
const GNEWS_API_KEY = '52e430bd78a0701d71d6cfa29d5f760b';
const API_URL = `/gnews/api/v4/search?q=crypto&lang=en&max=30&token=${GNEWS_API_KEY}`;

export default function NewsSlider() {
  const [news, setNews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const intervalRef = useRef();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        if (json.articles && json.articles.length > 0) {
          setNews(json.articles);
        } else {
          setNews([]);
          setError('No news available from GNews.');
        }
      } catch (e) {
        setNews([]);
        setError('Failed to fetch news from GNews.');
        console.error('Failed to fetch news:', e);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % news.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [news]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + news.length) % news.length);
  };
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % news.length);
  };

  if (loading) {
    return <div className="bg-duniacrypto-panel rounded-lg shadow p-4 text-center text-gray-400 animate-pulse">Loading news slider...</div>;
  }
  if (error) {
    return <div className="bg-duniacrypto-panel rounded-lg shadow p-4 text-center text-red-400 font-semibold">{error}</div>;
  }
  if (news.length === 0) {
    return <div className="bg-duniacrypto-panel rounded-lg shadow p-4 text-center text-gray-400">No news available.</div>;
  }

  return (
    <div className="relative bg-duniacrypto-panel rounded-lg shadow p-0 overflow-hidden w-full max-w-full mb-6" style={{height: '400px'}}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          className="bg-duniacrypto-card rounded-full p-2 hover:bg-duniacrypto-green/20 focus:outline-none"
          onClick={handlePrev}
          aria-label="Previous news"
        >
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          className="bg-duniacrypto-card rounded-full p-2 hover:bg-duniacrypto-green/20 focus:outline-none"
          onClick={handleNext}
          aria-label="Next news"
        >
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="w-full h-full flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
        {news.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full h-full flex flex-col items-center justify-center relative"
            style={{ minWidth: '100%', maxWidth: '100%', height: '400px' }}
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full group">
              <img
                src={item.image || PLACEHOLDER}
                alt="news"
                className="w-full h-full object-cover rounded-t-lg bg-black/30 transition-transform group-hover:scale-105"
                style={{margin: 0, padding: 0, width: '100%', height: '100%'}}
                onError={e => { e.target.src = PLACEHOLDER; }}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                <div className="text-lg md:text-2xl font-bold text-white line-clamp-2 drop-shadow-lg mb-8">
                  {item.title}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {news.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === current ? 'bg-duniacrypto-green' : 'bg-gray-600'}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 