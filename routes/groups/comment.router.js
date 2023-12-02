// подключаем модуль express для маршрутизации
const { Router } = require("express");
const CommentController = require("../../controllers/Comment.controller");

// const isAdminMiddleware = require("../../middlewares/permission/isAdmin");
const isUserMiddleware = require("../../middlewares/permission/isUser");

const router = new Router();

// описываем маршруты
//Создание коментария
router.post("/", isUserMiddleware, CommentController.create);

//Удаление коментария
router.delete("/", isUserMiddleware, CommentController.delete);

//Получение коментария
router.get("/:id", CommentController.getByPostId);

module.exports = router;
