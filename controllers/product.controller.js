const db = require('../db');
const path = require('path');

module.exports = {
    root: (req, res, next) => res.sendFile(path.join(__dirname, '../html', 'admin-product-management.html')),
    add: (req, res, next) => res.sendFile(path.join(__dirname, '../html', 'admin-product-add.html')),
    update: (req, res, next) => res.sendFile(path.join(__dirname, '../html', 'admin-product-update.html')),
    delete: (req, res, next) => res.sendFile(path.join(__dirname, '../html', 'admin-product-delete.html'))
};
