// (один раз при запуску сервера:)

import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv"; // Для використання змінних середовища

dotenv.config(); // Завантажує змінні з .env файлу

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI; // URI MongoDB зберігається у змінних середовища

let db; // Підключення до бази даних
let cachedArticles = null; // Кешовані дані
let lastFetchTime = 0; // Час останнього запиту
const cacheDuration = 60000; // Час кешування (60 секунд)

// Дозволяємо доступ тільки з певних доменів (вказати ваш клієнтський домен)
const allowedOrigins = [
  "http://localhost:3000", // Локальний сервер для розробки
  "http://127.0.0.1:5500", // Якщо ви використовуєте Live Server
  "https://your-client-domain.com", // Домен клієнтської частини в продакшні
  "https://another-allowed-domain.com", // Інший продакшн домен
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Підключення до MongoDB (з перез'єднанням у випадку помилки)
async function connectToMongo() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db("NewsDb");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    setTimeout(connectToMongo, 5000); // Перез'єднання через 5 секунд
  }
}

// Виклик підключення до MongoDB при старті сервера
connectToMongo();

// API маршрут для отримання новин
app.get("/api/news", async (req, res) => {
  try {
    // Перевіряємо, чи є в кеші дані і чи не закінчився час кешування
    if (cachedArticles && Date.now() - lastFetchTime < cacheDuration) {
      console.log("Serving from cache");
      return res.json(cachedArticles);
    }

    // Якщо кеш застарів, робимо запит до MongoDB
    const collection = db.collection("data");
    const articles = await collection.find().toArray();

    // Зберігаємо результат в кеш
    cachedArticles = articles;
    lastFetchTime = Date.now();

    console.log("Serving from MongoDB");
    res.json(articles);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
