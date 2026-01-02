export const fetchTopHeadlines = async () => {
  const response = await fetch("/api/news");
  const data = await response.json();
  return data.articles;
};
