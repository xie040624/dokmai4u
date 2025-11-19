const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const createError = require('http-errors');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  }
}));

const authRoute = require('./routes/auth.route');
const indexRoute = require('./routes/index.route');
const accountRoute = require('./routes/account.route');
const productRoute = require('./routes/product.route');

app.use((req, res, next) => {
  console.log('REQ:', req.method, req.url);
  next();
});

app.use('/api', indexRoute);
app.use('/api/auth', authRoute);
app.use('/api/account', accountRoute);
app.use('/api/product', productRoute);

app.use((req, res, next) => next(createError.NotFound()));

app.use((err, req, res) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error'
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));