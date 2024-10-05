//Exmp1

// import cron from "node-cron";
// import https from "https";

// const keepAliveUrl = "https://testapinews.onrender.com/api/news";

// console.log("Cron job started");

// cron.schedule("*/14 * * * *", () => {
//   https
//     .get(keepAliveUrl, (res) => {
//       console.log(`Ping to keep server alive: Status ${res.statusCode}`);
//     })
//     .on("error", (error) => {
//       console.error("Error keeping server alive:", error);
//     });
// });

//Exp2

// const cron = require("node-cron");
// const axios = require("axios");

// // Виконання запиту до самого себе кожні 14 хвилин
// cron.schedule("*/14 * * * *", () => {
//   axios
//     .get("https://your-server-url.com/your-endpoint")
//     .then((response) => {
//       console.log("Запит успішний, сервер не буде спати");
//     })
//     .catch((error) => {
//       console.error("Помилка під час запиту:", error);
//     });
// });

//Exp3

import { CronJob } from "cron";
import { get } from "https";

const backendUrl = "https://testapinews.onrender.com/api/news"; // provider_backend

// This function will be executed every 14 minutes.
const job = new CronJob("*/14 * * * *", function () {
  console.log("Hitting backend to keep it alive");

  // HTTPS request to hit the backend API
  get(backendUrl, (res) => {
    if (res.statusCode === 200) {
      console.log("Server is kept alive");
    } else {
      console.error(
        `Failed to keep server alive with status code: ${res.statusCode}`
      );
    }
  }).on("error", (err) => {
    console.error("Error hitting backend:", err.message);
  });
});

export { job };
//....
// import { job } from "./cron.js";
// job.start();
