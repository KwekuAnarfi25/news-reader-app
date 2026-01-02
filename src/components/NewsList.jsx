import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';

function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const fetchNews = async (query = '') => {
    setLoading(true);
    setError(null);

    try {
      // Using NewsAPI.org endpoint
      const searchParam = query ? `&q=${encodeURIComponent(query)}` : '';
      const url = `https://newsapi.org/v2/top-headlines?country=us${searchParam}&apiKey=${API_KEY}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'ok') {
        setArticles(data.articles || []);
      } else {
        setError(data.message || 'Failed to fetch news');
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchNews(query);
  };

  if (loading) {
    return (
      <>
        <SearchBar onSearch={handleSearch} />
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SearchBar onSearch={handleSearch} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <p className="text-center text-grayText py-8">
            No articles found. Try a different search term.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={article.url || index} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default NewsList;
