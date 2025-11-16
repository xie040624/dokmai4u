const db = require('../db');
const path = require('path');

module.exports = {
    root: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'product-management.html')),
    addPage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'product-add.html')),
    updatePage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'product-update.html')),
    deletePage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'product-delete.html')),
    // Testing getOne API
    // method: get
    // URL: http://localhost:3000/product/api/product/:id
    // params: id (FlowerID)
    getOne: async (req, res) => {
        try {
            const { id } = req.params;

            const sql = `
                SELECT * FROM Flower
                JOIN Category
                ON Flower.CID = Category.CID
                WHERE FlowerID = ?`;

            const params = [id];

            const [rows] = await db.query(sql, params);
            if (!rows.length) return res.status(404).json({ message: 'Not found' });
            return res.json(rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }
    },
    // Testing getAll API
    // method: get
    // URL: http://localhost:3000/product/getall  
    getAll: async (req, res) => {
        try {
            const [rows] = await db.query(`
                SELECT * FROM Flower
                JOIN Category ON Flower.CID = Category.CID`);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Database error' });
        }
    },
    // Testing add API
    // method: post
    // URL: http://localhost:3000/product/add
    // body: raw JSON
    // {
    //   "FlowerName": "",
    //   "CID": "",
    //   "Price": "",
    //   "StartDate": "",
    //   "EndDate": "",
    //   "Meaning": "",
    //   "srcImage": ""
    // }
    add: async (req, res) => {
        try {
            const FlowerName = (req.body.FlowerName || '').trim();
            const CID = Number(req.body.CID || 3);
            const Price = Number(req.body.Price || 0);
            const StartDate = req.body.StartDate ? String(req.body.StartDate).slice(0, 10) : null;
            const EndDate = req.body.EndDate ? String(req.body.EndDate).slice(0, 10) : null;
            const Meaning = (req.body.Meaning || '').trim();
            const srcImage = req.body.srcImage ? String(req.body.srcImage).trim() : null;

            if (!FlowerName || isNaN(Price) || !Meaning) {
                return res.status(400).json({ message: 'Flower Name, Price, Meaning are required' });
            }

            const sql = `
                INSERT INTO Flower(FlowerName, CID, Price, StartDate, EndDate, Meaning, srcImage)
                VALUES(?, ?, ?, ?, ?, ?, ?)`;

            const params = [FlowerName, CID, Price, StartDate, EndDate, Meaning, srcImage];

            const [result] = await db.query(sql, params);

            return res.status(201).json({
                message: 'Inserted successfully',
                insertId: result.insertId
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }
    },
    // Testing update API
    // method: put
    // URL: http://localhost:3000/product/update/:id
    // params: id (FlowerID)
    // body: raw JSON
    // {
    //   "FlowerName": "",
    //   "CID": "",
    //   "Price": "",
    //   "StartDate": "",
    //   "EndDate": "",
    //   "Meaning": ""
    // }
    update: async (req, res) => {
        try {
            const { id } = req.params;
            let { FlowerName, CID, Price, StartDate, EndDate, Meaning } = req.body;

            CID = CID ? Number(CID) : 3;
            Price = Number(Price);

            if (!FlowerName || isNaN(Price) || !Meaning) {
                return res.status(400).json({ message: 'Flower Name, Price, and Meaning are required' });
            }

            const sql = `
                UPDATE Flower SET FlowerName = ?, CID = ?, Price = ?, StartDate = ?, EndDate = ?, Meaning = ?
                WHERE FlowerID = ?`;

            const params = [FlowerName, CID, Price, StartDate || null, EndDate || null, Meaning, id];

            const [result] = await db.query(sql, params);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Flower not found' });
            }
            return res.status(200).json({ ok: true, updatedId: id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }
    },
    // Testing delete API
    // method: delete
    // URL: http://localhost:3000/product/delete/:id
    // params: id (FlowerID)
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
    // Testing search API
    // method: get
    // URL: http://localhost:3000/searchs
    // body: raw JSON
    // {
    //   "FlowerName": "",
    //   "Category": "",
    //   "MinPrice": "",
    //   "MaxPrice": ""
    // }
    search: async (req, res) => {
        try {
            const FlowerName = (req.query.FlowerName ?? '').toString().trim();
            const CID = (req.query.Category ?? '').toString().trim();
            const MinPrice = (req.query.MinPrice ?? '').toString().trim();
            const MaxPrice = (req.query.MaxPrice ?? '').toString().trim();

            const where = [];
            const params = [];

            if (FlowerName) {
                where.push('f.FlowerName LIKE ?');
                params.push(`%${FlowerName}%`);
            }

            if (CID !== '') {
                const cid = Number(CID);
                if (!Number.isNaN(cid)) {
                    where.push('f.CID = ?');
                    params.push(cid);
                }
            }
            if (MinPrice !== '') {
                const min = Number(MinPrice);
                if (!Number.isNaN(min)) {
                    where.push('f.Price >= ?');
                    params.push(min);
                }
            }
            if (MaxPrice !== '') {
                const max = Number(MaxPrice);
                if (!Number.isNaN(max)) {
                    where.push('f.Price <= ?');
                    params.push(max);
                }
            }

            const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

            const sql = `
            SELECT
                f.FlowerID,
                f.FlowerName,
                f.Meaning,
                f.Price,
                f.srcImage,
                f.CID,
                c.CName
            FROM Flower AS f
            JOIN Category AS c ON f.CID = c.CID
            ${whereSql}
            `;

            const [rows] = await db.query(sql, params);
            res.type('application/json').status(200).send(JSON.stringify(rows));
        } catch (err) {
            console.error('Search error:', err);
            res.status(500).json({ message: 'Database error' });
        }
    },
    // Testing search API
    // method: post
    // URL: http://localhost:3000/product/search2
    // body: raw JSON
    // {
    //   "searchKey": "",
    //   "searchId": "",
    //   "CID": ""
    // }
    search2: async (req, res) => {
        try {
            const searchKey = (req.body.searchKey || '').toString().trim();
            const searchId = (req.body.searchId || '').toString().trim();
            const CID = (req.body.CID || '').toString().trim();

            const where = [];
            const params = [];

            if (searchId) {
                where.push('f.FlowerID = ?');
                params.push(searchId);
            }

            if (searchKey) {
                where.push('f.FlowerName LIKE ?');
                params.push(`%${searchKey}%`);
            }

            if (CID) {
                where.push('f.CID = ?');
                params.push(CID);
            }

            const whereSql = where.length ? `WHERE ${where.join(' OR ')}` : '';

            const sql = `
            SELECT 
                f.FlowerID,
                f.FlowerName,
                f.Price,
                f.srcImage,
                f.CID,
                c.CName
            FROM Flower AS f
            JOIN Category AS c ON f.CID = c.CID
            ${whereSql}
            `;

            const [rows] = await db.query(sql, params);
            res.json(rows);
        } catch (error) {
            console.error('Search error:', error);
            res.status(500).json({ message: 'Database error' });
        }
    }
};