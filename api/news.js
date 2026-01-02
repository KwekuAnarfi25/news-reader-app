export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  const { q } = req.query;
  const query = q || "latest";

  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&q=${encodeURIComponent(
    query
  )}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch news",
    });
  }
}

