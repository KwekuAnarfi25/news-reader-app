import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';

function NewsList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async (query = '') => {
    setLoading(true);
    setError(null);

    try {
      const searchParam = query ? `?q=${encodeURIComponent(query)}` : '';
      const response = await fetch(`/api/news${searchParam}`);
      const data = await response.json();

      if (data.status === 'ok') {
        setArticles(data.articles || []);
      } else {
        setError(data.message || 'Failed to fetch news');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (query) => {
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
        <div className="container mx-auto px-4 py-8">
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
      <div className="container mx-auto px-4 py-8">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No articles found. Try a different search term.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard
                key={article.url || index}
                article={article}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default NewsList;

