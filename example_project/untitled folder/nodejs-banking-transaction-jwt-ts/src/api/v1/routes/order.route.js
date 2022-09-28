const express = require('express');
const routes = express.Router();

routes.get('/order', (req, res, next) => {
    res.send('/v1/order');
});

module.exports = routes;

