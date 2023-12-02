// подключаем модуль express для маршрутизации
const { Router } = require("express");
const LikeController = require("../../controllers/Like.controller");

// const isAdminMiddleware = require("../../middlewares/permission/isAdmin");
const isUserMiddleware = require("../../middlewares/permission/isUser");

const router = new Router();

// описываем маршруты
// Лайк поста
router.post("/", isUserMiddleware, LikeController.create);

// Получение лайков поста
router.get("/:id", LikeController.getByPostId);

// Удаление лайка
router.delete("/", isUserMiddleware, LikeController.delete);

module.exports = router;
