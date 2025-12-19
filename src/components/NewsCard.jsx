import { Link } from 'react-router-dom';

function NewsCard({ article, index }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const imageUrl = article.urlToImage || 'https://via.placeholder.com/400x240?text=No+Image';

  return (
    <Link to={`/article/${index}`} state={{ article }}>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col cursor-pointer">
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x240?text=No+Image';
            }}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {article.title}
          </h2>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
            {article.description || 'No description available.'}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
            <span className="font-medium">
              {article.source?.name || 'Unknown Source'}
            </span>
            <span>
              {article.publishedAt ? formatDate(article.publishedAt) : 'Date unavailable'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
