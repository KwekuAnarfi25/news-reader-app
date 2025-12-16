import { Link } from 'react-router-dom';

function NewsCard({ article }) {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Default image if none provided
  const imageUrl = article.image_url || article.urlToImage || 'https://via.placeholder.com/400x240?text=No+Image';

  return (
    <Link to={`/article/${article.uuid || article.url}`} state={{ article }}>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="w-full h-48 bg-lightGray overflow-hidden">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x240?text=No+Image';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Title */}
          <h2 className="text-lg font-semibold text-darkText mb-2 line-clamp-2">
            {article.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-grayText mb-4 line-clamp-3 flex-grow">
            {article.description || article.snippet || 'No description available.'}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-grayText mt-auto">
            <span className="font-medium">
              {article.source?.name || article.source || 'Unknown Source'}
            </span>
            <span>
              {article.published_at ? formatDate(article.published_at) : 
               article.publishedAt ? formatDate(article.publishedAt) : 
               'Date unavailable'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
