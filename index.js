require("dotenv").config();

// пакет mongoose
const mongoose = require("mongoose");
// пакет express
const express = require("express");

// подключаем маршруты
const router = require("./routes");

// включение екземпляра приложения express
const app = express();
// парсинг данных в теле запроса
app.use(express.json());
app.use(express.urlencoded());

app.use("/api", router);

async function start() {
  await mongoose.connect(process.env.DBURL);
  console.log("Connection DB sucsess");

  app.listen(process.env.LISSEN_PORT);
  console.log("HTTP server has been started on port 8080");
}

start();
