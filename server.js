require("dotenv").config();   // ✅ LOAD .env FIRST

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

// -------- NEWS API --------
app.get("/api/news", async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({
        error: "NEWS_API_KEY missing in .env"
      });
    }

    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`
    );

    const data = await response.json();

    // ✅ Handle NewsAPI errors properly
    if (data.status !== "ok") {
      return res.status(500).json({
        error: data.message || "NewsAPI error"
      });
    }

    res.json({
      articles: data.articles   // ✅ frontend expects this
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// -------- START SERVER --------
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
