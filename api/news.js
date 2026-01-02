export default async function handler(req, res) {
  const API_KEY = process.env.VITE_NEWS_API_KEY;

  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${API_KEY}`
  );

  const data = await response.json();

  res.status(200).json(data);
}
