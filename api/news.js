export default async function handler(req, res) {
  try {
    const API_KEY = process.env.NEWS_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "NEWS_API_KEY missing" });
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`
    );

    const data = await response.json();

    if (data.status !== "ok") {
      return res.status(500).json({ error: data.message });
    }

    res.status(200).json({
      articles: data.articles
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
