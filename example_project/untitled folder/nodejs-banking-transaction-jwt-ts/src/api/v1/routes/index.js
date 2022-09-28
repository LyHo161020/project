const express = require('express');
const routes = express.Router();

routes.use('', require('./v1'));

module.exports = routes;