import fetch from "node-fetch";

const url = "";

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

fetchArticles();

setInterval(fetchArticles, 3600000); // 3600000 мс = 1 година

export { fetchArticles };
