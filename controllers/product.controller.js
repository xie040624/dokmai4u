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
            const [rows] = await db.query(`
                SELECT * FROM Flower JOIN Category
                ON Flower.CID = Category.CID
            `);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Database error' });
        }
    },
    add: async (req, res) => {
        try {
            let { FlowerName, CID, Price, StartDate = null, EndDate = null, Meaning, srcImage = null } = req.body || {};

            FlowerName = (FlowerName || '').trim();
            Meaning = (Meaning || '').trim();
            const cidNum = Number(CID);
            const priceNum = Number(Price);

            if (!FlowerName || !Meaning || Number.isNaN(cidNum) || Number.isNaN(priceNum)) {
                return res.status(400).json({ message: 'FlowerName, CID, Price, Meaning are required' });
            }

            StartDate = StartDate ? String(StartDate).slice(0, 10) : null;
            EndDate = EndDate ? String(EndDate).slice(0, 10) : null;
            srcImage = srcImage ? String(srcImage).trim() : null;

            const [result] = await db.query(`
                INSERT INTO Flower(FlowerName, CID, Price, StartDate, EndDate, Meaning, srcImage)
                VALUES(?, ?, ?, ?, ?, ?, ?)`,
                [FlowerName, cidNum, priceNum, StartDate, EndDate, Meaning, srcImage]
            );

            return res.status(201).json({
                message: 'Inserted successfully',
                insertId: result.insertId
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            let { FlowerName, CID, Price, StartDate, EndDate, Meaning } = req.body;

            if (!FlowerName || !Price || !Meaning) {
                return res.status(400).json({ message: 'Flower Name, Price, Meaning are required' });
            }

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
    search: async (req, res) => {
        try {
            const FlowerName = (req.query.FlowerName || '').trim();
            const CIDraw = (req.query.CID ?? req.query.Category ?? '').toString().trim();
            const MinPrice = (req.query.MinPrice ?? '').toString().trim();
            const MaxPrice = (req.query.MaxPrice ?? '').toString().trim();

            const where = [];
            const params = [];

            if (FlowerName) { where.push(`FlowerName LIKE ?`); params.push(`%${FlowerName}%`); }
            if (CIDraw !== '') {
                const cidNum = Number(CIDraw);
                if (!Number.isNaN(cidNum)) { where.push(`CID = ?`); params.push(cidNum); }
            }
            if (MinPrice !== '') { where.push(`Price >= ?`); params.push(Number(MinPrice)); }
            if (MaxPrice !== '') { where.push(`Price <= ?`); params.push(Number(MaxPrice)); }

            const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

            const [rows] = await db.query(`
                SELECT FlowerID, FlowerName, Meaning, Price, srcImage, CID, CName
                FROM flower f JOIN category c ON f.CID = c.CID
                ${whereSql}
                ORDER BY FlowerID DESC
                LIMIT 100
                `, params);

            res.json(rows);
        } catch (err) {
            console.error('Search error:', err);
            res.status(500).json({ message: 'Database error' });
        }
    }
};
