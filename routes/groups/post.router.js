// подключаем модуль express для маршрутизации
const { Router } = require("express");
const PostController = require("../../controllers/Post.controller");

//проверка прав
const isAdminMiddleware = require("../../middlewares/permission/isAdmin");
const isUserMiddleware = require("../../middlewares/permission/isUser");

const router = new Router();

// описываем маршруты
//Создание записи
router.post("/", isUserMiddleware, PostController.create);

// Получение записи
router.get("/:id", PostController.getById);
router.get("/", PostController.getAll);

// Изменение записи
router.put("/", isUserMiddleware, PostController.update);

// Удаление записи
router.delete("/", isUserMiddleware, PostController.delete);

module.exports = router;
