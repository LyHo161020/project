
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middlewares/Auth.middleware.js");
const HomeController = require("../controllers/Home.controller");
const LoginController = require("../controllers/Login.controller");
const CustomerController = require("../controllers/Customer.controller");

 /**
  * Init all APIs on your application
  * @param {*} app from express
  */
let initRoutes = (app) => {

    router.get("/", HomeController.showHomePage);
    router.get("/login", LoginController.showLoginPage);

    router.use(AuthMiddleware.hasToken);

    router.get("/customers", CustomerController.showListPage);
 
    return app.use("/", router);
}

 
module.exports = initRoutes;
 