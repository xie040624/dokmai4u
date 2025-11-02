const db = require('../db');
const path = require('path');

module.exports = {
    root: (req, res) => res.sendFile(path.join(__dirname, '../html', 'home.html')),
    team: (req, res) => res.sendFile(path.join(__dirname, '../html', 'team.html')),
    search: (req, res) => res.sendFile(path.join(__dirname, '../html', 'search.html')),
    login: (req, res) => res.sendFile(path.join(__dirname, '../html', 'login.html')),
    detail: (req, res) => res.sendFile(path.join(__dirname, '../html', 'detail.html')),
    detailPage: (req, res) => res.sendFile(path.join(__dirname, '../html', 'detail.html')),
    get: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await db.query(`
                SELECT * FROM Flower JOIN Category
                ON Flower.CID = Category.CID
                WHERE FlowerID = ?`,
                [id]
            );
            if (!rows.length) return res.status(404).json({ message: 'Not found' });
            return res.json(rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }
    }
};