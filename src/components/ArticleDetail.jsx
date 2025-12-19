import { useLocation, useNavigate } from 'react-router-dom';

function ArticleDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600 mb-4">Article not found.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const imageUrl = article.urlToImage || 'https://via.placeholder.com/800x450?text=No+Image';

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          ← Back
        </button>
      </div>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-96 object-cover rounded-xl mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <div className="flex gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
          <span className="font-medium">{article.source?.name || 'Unknown Source'}</span>
          <span>•</span>
          <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Date unavailable'}</span>
        </div>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          {article.description || 'No description available.'}
        </p>
        {article.content && (
          <p className="text-base text-gray-800 leading-relaxed mb-6">
            {article.content}
          </p>
        )}

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Read Full Article
        </a>
      </article>
    </div>
  );
}

export default ArticleDetail;
