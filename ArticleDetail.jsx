import { useLocation, useNavigate } from 'react-router-dom';

function ArticleDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {};

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Article not found.</p>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-primary text-white rounded">
          Back to Home
        </button>
      </div>
    );
  }

  const imageUrl = article.urlToImage || 'https://via.placeholder.com/800x450?text=No+Image';

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <button onClick={() => navigate('/')} className="text-primary hover:text-blue-600 font-medium">
          ← Back to News
        </button>
      </div>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="w-full h-96 bg-gray-100 rounded-xl overflow-hidden mb-6">
          <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>

        <div className="flex gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
          <span>{article.source?.name || 'Unknown Source'}</span>
          <span>•</span>
          <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Date unavailable'}</span>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-800 mb-6">
            {article.description || 'No description available.'}
          </p>
          {article.content && (
            <p className="text-base text-gray-800 mb-6">
              {article.content}
            </p>
          )}
        </div>

        <div className="mt-8">
          
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Read Full Article
          </a>
        </div>
      </article>
    </div>
  );
}

export default ArticleDetail;
