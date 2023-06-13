"use strict";

var express = require('express');

var app = express();

var dotenv = require('dotenv');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var databaseConnect = require('./config/database');

var authRouter = require('./routes/authRoute');

var messengerRoute = require('./routes/messengerRoute');

dotenv.config({
  path: 'backend/config/config.env'
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/messenger', authRouter);
app.use('/api/messenger', messengerRoute);
app.get('/', function (req, res) {
  res.send('ok');
});
databaseConnect();
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("server is running on port ".concat(PORT));
});