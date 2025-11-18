const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const createError = require('http-errors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/image', express.static(path.join(__dirname, 'image')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

const indexRoute = require('./routes/index.route');
const accountRoute = require('./routes/account.route');
const productRoute = require('./routes/product.route');
const authRoute = require('./routes/auth.route');

app.use('/', indexRoute);
app.use('/auth', authRoute);
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