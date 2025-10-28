const db = require('../db');
const path = require('path');

module.exports = {
    root: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'product-management.html')),
    addPage: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-add.html')),
    updatePage: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-update.html')),
    deletePage: (req, res, next) => res.sendFile(path.join(__dirname, '../views/account', 'product-delete.html')),
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
    },
    getall: async (req, res) => {
        try {
            const [rows] = await db.query(
                `SELECT FlowerID, FlowerName, Price, CName
                FROM Flower JOIN Category
                ON Flower.CID = Category.CID`
            );
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Database error' });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            let { FlowerName, CID, Price, StartDate, EndDate, Meaning } = req.body;

            if (!FlowerName || Price == null || !Meaning) {
                return res.status(400).json({ message: 'FlowerName, Price, Meaning are required' });
            }

            // แปลง type เผื่อฟรอนต์ส่ง string มาบางที
            CID = CID ? Number(CID) : null;
            Price = Number(Price);

            const [result] = await db.query(
                `UPDATE Flower
       SET FlowerName = ?, CID = ?, Price = ?, StartDate = ?, EndDate = ?, Meaning = ?
       WHERE FlowerID = ?`,
                [FlowerName, CID, Price, StartDate || null, EndDate || null, Meaning, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Flower not found' });
            }
            return res.json({ ok: true, updatedId: id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }
    },
    delete: async (req, res) => {
        try {
            const FlowerID = req.params.id;
            if (!FlowerID) return res.status(400).json({ message: 'Missing Flower ID' });

            const [result] = await db.query('DELETE FROM Flower WHERE FlowerID = ?', [FlowerID]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });

            res.status(200).json({ message: 'Product deleted successfully', FlowerID });
        } catch (error) {
            console.error('Delete error:', error);
            res.status(500).json({ message: 'Database error during deletion' });
        }
    },
    // search: async (req, res) => {
    //     try {
    //         const { searchKey } = req.body;
    //         const [rows] = await db.query(
    //             `SELECT FlowerName, Price, CName
    //             FROM Flower JOIN Category
    //             ON Flower.CID = Category.CID
    //             WHERE FlowerName LIKE ?`,
    //             [searchKey]
    //         );
    //         res.json(rows);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Database error' });
    //     }
    // }
};
