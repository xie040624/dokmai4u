const express = require('express');
const dotenv = require('dotenv');
const indexRoute = require('./routes/index.route');

const app = express();
dotenv.config();

app.use('/', indexRoute);

app.listen(process.env.port, () => console.log(`Run on http://localhost:${process.env.port}`));