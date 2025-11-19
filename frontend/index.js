const express = require('express');
const path = require('path');
const createError = require('http-errors');

const app = express();
const router = express.Router();
app.use(router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/image', express.static(path.join(__dirname, 'image')));

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './html', 'home.html'))
});

router.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname, './html', 'team.html'))
});

router.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, './html', 'search.html'))
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './html', 'login.html'))
});

router.get('/detail/:id', (req, res) => {
  res.sendFile(path.join(__dirname, './html', 'detail.html'))
});

app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/account/account-management.html'));
});

router.get('/account/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/account/account-add.html'))
});

router.get('/account/delete/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/account/account-delete.html'))
});

router.get('/account/update/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/account/account-update.html'))
});

app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/product/product-management.html'));
});

router.get('/product/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/product/product-add.html'))
});

router.get('/product/delete/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/product/product-delete.html'))
});

router.get('/product/update/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/product/product-update.html'))
});

app.use((req, res, next) => next(createError.NotFound()));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error'
    }
  });
});

app.listen(3000, () => console.log('Frontend running at http://localhost:3000'));