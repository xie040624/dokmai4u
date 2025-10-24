const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const createError = require('http-errors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'html')));
app.use('/image', express.static(path.join(__dirname, 'image')));

const indexRoute = require('./routes/index.route');
const adminRoute = require('./routes/admin.route');

app.use('/', require('./routes/index.route'));
app.use('/admin', require('./routes/admin.route'));

// app.use((req, res, next) => next(createError.NotFound()));

// app.use((err, req, res, next) => {
//     res.status(err.status || 500).json({
//         error: {
//             status: err.status || 500,
//             message: err.message || 'Internal Server Error'
//         }
//     });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Run on http://localhost:${PORT}`));