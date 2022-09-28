const express = require('express')();
require('dotenv').config();

const http = require('http').Server(express);
const io = require('socket.io')(http);

io.set('origins', '*:*');

global.__basedir = __dirname;
global._io = io;

const app = require('./app');

const port = process.env.PORT || '11003';

express.use(app);

http.listen(port, () => {
    console.log('server running at ' + port);
});
