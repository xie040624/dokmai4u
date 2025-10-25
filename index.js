const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const createError = require('http-errors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'html')));
app.use('/image', express.static(path.join(__dirname, 'image')));

const indexRoute = require('./routes/index.route');
const accountRoute = require('./routes/account.route');
const productRoute = require('./routes/product.route')

app.use('/', indexRoute);
app.use('/account', accountRoute);
app.use('/product', productRoute);

app.use((req, res, next) => next(createError.NotFound()));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Run on http://localhost:${PORT}`));