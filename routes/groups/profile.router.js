// подключаем модуль express для маршрутизации
const { Router } = require("express");
const ProfileController = require("../../controllers/Profile.controller");

//проверка прав
const isAdminMiddleware = require("../../middlewares/permission/isAdmin");
const isUserMiddleware = require("../../middlewares/permission/isUser");

const router = new Router();

//описываем маршруты
//Создание профиля пользователя
router.post("/", ProfileController.create);

//Авторизация
router.post("/auth", ProfileController.auth);

//Редактирование профиля пользователя
router.put("/", isUserMiddleware, ProfileController.update);

//Генерация случайного пароля
router.get("/genpassword", ProfileController.genPassword);

//Изменение пароля
router.put("/changepass", isUserMiddleware, ProfileController.changepPassword);

//Удаление профиля пользователя
router.delete("/", isAdminMiddleware, ProfileController.delete);

// Получение полностью всех профилей
router.get("/", isAdminMiddleware, ProfileController.getAll);

//Получить полную информацию о профиле пользователя
router.get("/full", isUserMiddleware, ProfileController.getFull);

//получить информацию о профиле пользователя
router.get("/getinfo", isUserMiddleware, ProfileController.getInfo);

module.exports = router;
