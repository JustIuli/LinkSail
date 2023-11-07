const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const api = require('./api');
require('dotenv').config();

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api', api);


console.log(process.env.MONGO_URL)