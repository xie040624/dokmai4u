const db = require('../db');
const path = require('path');

module.exports = {
    root: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'product-management.html')),
    addPage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'product-add.html')),
    updatePage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'product-update.html')),
    deletePage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'product-delete.html')),
    getOne: async (req, res) => {
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
    getAll: async (req, res) => {
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
            const FlowerNameRaw = (req.query.FlowerName ?? req.query.PName ?? '').toString().trim();
            const CIDraw = (req.query.CID ?? req.query.Category ?? '').toString().trim();
            const MinPriceRaw = (req.query.MinPrice ?? '').toString().trim();
            const MaxPriceRaw = (req.query.MaxPrice ?? '').toString().trim();

            const where = [];
            const params = [];

            if (FlowerNameRaw) { where.push('f.FlowerName LIKE ?'); params.push(`%${FlowerNameRaw}%`); }
            if (CIDraw !== '') {
                const cid = Number(CIDraw);
                if (!Number.isNaN(cid)) { where.push('f.CID = ?'); params.push(cid); }
            }
            if (MinPriceRaw !== '') {
                const min = Number(MinPriceRaw);
                if (!Number.isNaN(min)) { where.push('f.Price >= ?'); params.push(min); }
            }
            if (MaxPriceRaw !== '') {
                const max = Number(MaxPriceRaw);
                if (!Number.isNaN(max)) { where.push('f.Price <= ?'); params.push(max); }
            }

            const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

            const [rows] = await db.query(`
        SELECT
          f.FlowerID, f.FlowerName, f.Meaning, f.Price, f.srcImage, f.CID,
          c.CName
        FROM Flower AS f
        JOIN Category AS c ON f.CID = c.CID
        ${whereSql}
      `, params);

            res.type('application/json').status(200).send(JSON.stringify(rows));
        } catch (err) {
            console.error('Search error:', err);
            res.status(500).json({ message: 'Database error' });
        }
    }
};
