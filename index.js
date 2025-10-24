const express = require('express');
const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const indexRoute = require('./routes/index.route');
app.use('/', indexRoute);

const adminRoute = require('./routes/admin.route');
app.use('/admin', adminRoute);

app.listen(process.env.PORT, () => console.log(`Run on http://localhost:${process.env.port}`));