const express = require("express");
const router = express.Router();

// const AuthMiddleware = require("../middlewares/Auth.middleware.js");
const homeController = require("../controllers/home.controller");
const showScheduleController = require("../controllers/showSchedule.controller");
const movieController = require("../controllers/movie.controller");

// const LoginController = require("../controllers/Login.controller");
// const customerController = require("../controllers/customer.controller");

let initRoutes = (app) => {

    router.get("/", homeController.showHomePage);
    router.get("/phim", movieController.showMoviePage);
    router.get("/lichchieu", showScheduleController.showShowSchedulePage);

    // router.get("/login", LoginController.showLoginPage);

    // Sử dụng authMiddleware.isAuth trước những api cần xác thực
    // router.use(AuthMiddleware.hasToken);

    // router.get("/customers", customerController.showListPage);
 
    return app.use("/", router);
}

 
module.exports = initRoutes;
 