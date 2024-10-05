import { MongoClient } from "mongodb";
import { fetchArticles } from "./apiData.js";
import dotenv from "dotenv"; // Для використання змінних середовища

dotenv.config(); // Завантажує змінні з .env файлу

const uri = process.env.MONGODB_URI;

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const dbName = "NewsDb";
    const collectionName = "data";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Очищуємо колекцію перед вставкою нових даних для уникнення дублікатів
    await collection.deleteMany({});

    const data = await fetchArticles();
    const insertManyResult = await collection.insertMany(data);
    console.log(
      `${insertManyResult.insertedCount} documents successfully inserted.\n`
    );
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
  } finally {
    await client.close();
  }
}

// Запускаємо оновлення даних кожну годину
// run();
// setInterval(run, 3600000); // 1 година
export { run };
