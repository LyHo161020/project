const express = require('express');
const app = express();

var cookieParser = require('cookie-parser');

app.use(cookieParser());

// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request
app.use(express.json());

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

const initRoutes = require('./src/api/v1/routes/index.route');

// Khởi tạo các routes cho ứng dụng
initRoutes(app);

const SocketService = require('./src/api/v1/services/Socket.service');

_io.on('connection', SocketService.connection);

module.exports = app;