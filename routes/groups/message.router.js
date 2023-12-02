// подключаем модуль express для маршрутизации
const { Router } = require("express");
const MessageController = require("../../controllers/Message.controller");

const router = new Router();

// описываем маршруты
// router.post("/", MessageController.create);

module.exports = router;
