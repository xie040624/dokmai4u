const db = require('../db');

// Testing get a flower detail API
// method: get
// Test 1 (May delete when you test product api)
// URL: http://localhost:3001/api/product/get/1
// Test 2 (May delete when you test product api)
// URL: http://localhost:3001/api/product/get/2
exports.get = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `
            SELECT * FROM Flower
            JOIN Category
            ON Flower.CID = Category.CID
            WHERE FlowerID = ?
        `;

        const [rows] = await db.query(sql, id);

        if (!rows.length) return res.status(404).json({ message: 'No data found' });

        return res.json(rows[0]);
    } catch (error) {
        console.error('Detail error:', error);
        return res.status(500).json({ message: 'Database error' });
    }
};