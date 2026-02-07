document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".news-section");

  if (!container) return;

  container.innerHTML =
    "<p style='text-align:center;padding:20px;'>Loading news…</p>";

  fetch("/api/news")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch news");
      }
      return res.json();
    })
    .then(data => {
      container.innerHTML = "";

      if (!data.articles || data.articles.length === 0) {
        container.innerHTML =
          "<p style='text-align:center;padding:20px;'>No news available.</p>";
        return;
      }

      data.articles.slice(0, 6).forEach(article => {
        const news = document.createElement("article");
        news.className = "news-article";

        news.innerHTML = `
          <img 
            src="${article.urlToImage || 'imgs/default.jpg'}" 
            alt="news image" 
            class="article-image"
          />

          <h2 class="news-title">
            <a href="${article.url}" target="_blank" rel="noopener">
              ${article.title}
            </a>
          </h2>

          <p class="news-summary">
            ${article.description || "No description available."}
          </p>
        `;

        container.appendChild(news);
      });
    })
    .catch(err => {
      console.error("News error:", err);
      container.innerHTML = `
        <p style="text-align:center;padding:20px;color:red;">
          ⚠️ Failed to load news.
        </p>
      `;
    });
});
