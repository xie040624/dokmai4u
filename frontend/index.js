const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const createError = require('http-errors');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/image', express.static(path.join(__dirname, 'image')));

// Path helpers
const html = file => path.join(__dirname, 'html', file);
const view = (folder, file) => path.join(__dirname, 'views', folder, file);

// --- Public pages ---
app.get('/', (_, res) => res.sendFile(html('home.html')));
app.get('/team', (_, res) => res.sendFile(html('team.html')));
app.get('/search', (_, res) => res.sendFile(html('search.html')));
app.get('/login', (_, res) => res.sendFile(html('login.html')));
app.get('/detail/:id', (_, res) => res.sendFile(html('detail.html')));

// --- Account pages ---
app.get('/account', (_, res) =>
  res.sendFile(view('account', 'account-management.html'))
);
app.get('/account/add', (_, res) =>
  res.sendFile(view('account', 'account-add.html'))
);
app.get('/account/update/:id', (_, res) =>
  res.sendFile(view('account', 'account-update.html'))
);
app.get('/account/delete/:id', (_, res) =>
  res.sendFile(view('account', 'account-delete.html'))
);

// --- Product pages ---
app.get('/product', (_, res) =>
  res.sendFile(view('product', 'product-management.html'))
);
app.get('/product/add', (_, res) =>
  res.sendFile(view('product', 'product-add.html'))
);
app.get('/product/update/:id', (_, res) =>
  res.sendFile(view('product', 'product-update.html'))
);
app.get('/product/delete/:id', (_, res) =>
  res.sendFile(view('product', 'product-delete.html'))
);

// 404
app.use((req, res, next) => next(createError.NotFound()));

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error'
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Frontend running at http://localhost:${PORT}`)
);