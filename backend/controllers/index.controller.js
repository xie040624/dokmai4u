const db = require('../db');

exports.get = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `SELECT * FROM Flower JOIN Category ON Flower.CID = Category.CID WHERE FlowerID = ?`;
        const [rows] = await db.query(sql, id);

        if (!rows.length) {
            return res.status(404).json({ message: 'No data found' });
        }

        return res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Database error' });
    }
};