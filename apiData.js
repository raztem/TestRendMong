import fetch from "node-fetch";

const url =
  "https://newsdata.io/api/1/news?country=ua&size=10&language=uk&apikey=pub_39547913a0efdae4ded7dc3f9341b00f6a608";

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
