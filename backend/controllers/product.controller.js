const db = require('../db');

// Testing get API
// method: get
// URL: http://localhost:3001/api/product/get/:id
exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM Flower JOIN Category ON Flower.CID = Category.CID WHERE FlowerID = ?`;
        const params = [id];
        const [rows] = await db.query(sql, params);
        if (!rows.length) return res.status(404).json({ message: 'Not found' });
        return res.json(rows[0]);
    } catch (error) {
        console.error('Get error', error);
        return res.status(500).json({ message: 'Database error' });
    }
}

// Testing getall API
// method: get
// URL: http://localhost:3001/api/product/getall
exports.getall = async (req, res) => {
    try {
        const sql = `SELECT * FROM Flower JOIN Category ON Flower.CID = Category.CID`;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        console.error('Get all error:', error);
        return res.status(500).json({ message: 'Database error' });
    }
}

// Testing search API
// method: post
// URL: http://localhost:3001/api/product/search
// body: raw JSON
// {
//   "searchKey": "",
//   "searchId": "",
//   "CID": ""
// }
exports.search = async (req, res) => {
    try {
        const searchKey = (req.body.searchKey || '').toString().trim();
        const searchID = (req.body.searchID || '').toString().trim();
        const cid = (req.body.cid || '').toString().trim();

        const where = [];
        const params = [];

        if (searchKey) {
            where.push('f.FlowerName LIKE ?');
            params.push(`%${searchKey}%`);
        }

        if (searchID) {
            where.push('f.FlowerID = ?');
            params.push(searchID);
        }

        if (cid) {
            where.push('f.CID = ?');
            params.push(cid);
        }

        const whereSql = where.length ? `WHERE ${where.join(' OR ')}` : '';

        const sql = `
            SELECT
                f.FlowerID,
                f.FlowerName,
                f.Price,
                f.srcImage,
                f.CID
            FROM Flower AS f
            JOIN Category AS c
            ON f.CID = c.CID
            ${whereSql}
        `;

        const [rows] = await db.query(sql, params);
        res.json(rows);
    } catch (error) {
        console.error('Search error:', error);
        return res.status(500).json({ message: 'Database error' });
    }
};

// Testing search API
// method: post
// URL: http://localhost:3001/api/search
exports.searchs = async (req, res) => {
    try {
        const FlowerName = (req.body.FlowerName || '').toString().trim();
        const Category = (req.body.Category || '').toString().trim();
        const MinPrice = (req.body.MinPrice || '').toString().trim();
        const MaxPrice = (req.body.MaxPrice || '').toString().trim();

        const where = [];
        const params = [];

        if (FlowerName) {
            where.push('f.FlowerName LIKE ?');
            params.push(`%${FlowerName}%`);
        }

        if (Category !== '') {
            const cid = Number(Category);
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
            JOIN Category AS c
            ON f.CID = c.CID
            ${whereSql}
        `;

        const [rows] = await db.query(sql, params);
        return res.type('application/json').status(200).send(JSON.stringify(rows));
    } catch (err) {
        console.error('Search error:', err);
        return res.status(500).json({ message: 'Database error' });
    }
};

// Testing add API
// method: post
// URL: http://localhost:3001/api/product/add
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
exports.add = async (req, res) => {
    try {
        const FlowerName = (req.body.FlowerName || '').toString().trim();
        const CID = Number(req.body.CID || '');
        const Price = Number(req.body.Price || 0);
        const StartDate = req.body.StartDate ? String(req.body.StartDate).slice(0, 10) : null;
        const EndDate = req.body.EndDate ? String(req.body.EndDate).slice(0, 10) : null;
        const Meaning = (req.body.Meaning || '').trim();
        const srcImage = req.body.srcImage ? String(req.body.srcImage).trim() : null;

        if (!FlowerName || Number.isNaN(Price) || !Meaning) {
            return res.status(400).json({ message: 'Flower Name, Price, Meaning are required' });
        }

        const sql = `
            INSERT INTO Flower(FlowerName, CID, Price, StartDate, EndDate, Meaning, srcImage)
            VALUES(?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [FlowerName, CID, Price, StartDate, EndDate, Meaning, srcImage];
        const [result] = await db.query(sql, params);
        return res.status(201).json({
            message: 'Inserted successfully',
            insertId: result.insertId
        });
    } catch (error) {
        console.error('Insert error:', error);
        return res.status(500).json({ message: 'Database error' });
    }
};

// Testing update API
// method: put
// URL: http://localhost:3001/api/product/update/:id
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
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        let { FlowerName, CID, Price, StartDate, EndDate, Meaning, srcImage } = req.body;

        CID = CID ? Number(CID) : null;
        Price = Number(Price);

        if (!FlowerName || Number.isNaN(Price) || !Meaning) {
            return res.status(400).json({ message: 'Flower Name, Price, and Meaning are required' });
        }

        const sql = `
            UPDATE Flower SET
                FlowerName = ?,
                CID = ?,
                Price = ?,
                StartDate = ?,
                EndDate = ?,
                Meaning = ?,
                srcImage = ?
            WHERE FlowerID = ?
        `;

        const params = [FlowerName, CID, Price, StartDate, EndDate, Meaning, srcImage, id];
        const [result] = await db.query(sql, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Flower not found' });
        }

        return res.status(200).json({ ok: true, updatedId: id });
    } catch (error) {
        console.error('Update error:', error);
        return res.status(500).json({ message: 'Database error' });
    }
};

// Testing delete API
// method: delete
// URL: http://localhost:3001/api/product/delete/:id
exports.delete = async (req, res) => {
    try {
        const { FlowerID } = req.params;

        if (!FlowerID) return res.status(400).json({ message: 'Missing Flower ID' });

        const [result] = await db.query('DELETE FROM Flower WHERE FlowerID = ?', [FlowerID]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Flower not found' });

        res.status(200).json({ message: 'Flower deleted successfully', FlowerID });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Database error during deletion' });
    }
};