import fetch from "node-fetch";
import dotenv from "dotenv"; // Для використання змінних середовища

dotenv.config(); // Завантажує змінні з .env файлу

const url = process.env.API_NEWS;

let articles = [];

async function fetchArticles() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    articles = data.results;
    console.log(articles);
    return articles;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// fetchArticles();

// setInterval(fetchArticles, 3600000); // 3600000 мс = 1 година

export { fetchArticles };
