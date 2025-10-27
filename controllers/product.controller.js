const db = require('../db');
const path = require('path');

module.exports = {
    root: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'product-management.html')),
    get: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-management.html')),
    add: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-add.html')),
    update: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-update.html')),
    delete: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-delete.html')),
    search: async (req, res) => {
        try {
            const { searchKey } = req.body;
            const [rows] = await db.query(
                `SELECT FlowerName, FPrice, CName
                FROM Flower JOIN Category
                ON Flower.CID = Category.CID
                WHERE FlowerName LIKE ?`,
                [searchKey]
            );
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Database error' });
        }
    }
};
