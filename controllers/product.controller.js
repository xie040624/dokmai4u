const db = require('../db');
const path = require('path');

module.exports = {
    get: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-management.html')),
    add: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-add.html')),
    update: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-update.html')),
    delete: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-delete.html'))
};
