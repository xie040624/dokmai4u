const db = require('../db');

// Testing get a flower data API
// method: get
// Test 1
// URL: http://localhost:3001/api/product/get/1
// Test 2
// URL: http://localhost:3001/api/product/get/2
exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM Flower JOIN Category ON Flower.CID = Category.CID WHERE FlowerID = ?`;
        const [rows] = await db.query(sql, id);
        if (!rows.length) return res.status(404).json({ message: 'Not found' });
        return res.json(rows[0]);
    } catch (error) {
        console.error('Get error:', error);
        return res.status(500).json({ message: 'Database error' });
    }
}

// Testing get all flower data API
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

// Testing search API (Product management page)
// method: post
// URL: http://localhost:3001/api/product/search
// body: raw JSON
// Test 1
// { "searchKey": "rose", "searchID": "", "cid": "" }
// Test 2
// { "searchKey": "", "searchID": "2", "cid": "" }
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

// Testing search API (Search page)
// method: post
// URL: http://localhost:3001/api/search
// body: raw JSON
// Test 1
// { "FlowerName": "rose", "Category": "0", "MinPrice": "99", "MaxPrice": "199" }
// Test 2
// {  "FlowerName": "", "Category": "2", "MinPrice": "", "MaxPrice": "" }
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
// Test 1
// { "FlowerName": "test", "CID": "1", "Price": "100", "StartDate": "2023-10-01", "EndDate": "2023-12-31", "Meaning": "This is a test flower", "srcImage": "test.jpg" }
// Test 2
// { "FlowerName": "orchid", "CID": "2", "Price": "150", "StartDate": "", "EndDate": "", "Meaning": "This is an orchid flower", "srcImage": "orchid.jpg" }
exports.add = async (req, res) => {
    try {
        const FlowerName = (req.body.FlowerName ?? '').toString().trim();
        const CID = req.body.CID ? Number(req.body.CID) : null;
        const Price = Number(req.body.Price ?? null);
        const StartDate = req.body.StartDate ? req.body.StartDate.toString().slice(0, 10) : null;
        const EndDate = req.body.EndDate ? req.body.EndDate.toString().slice(0, 10) : null;
        const Meaning = (req.body.Meaning ?? '').toString().trim();
        const srcImage = (req.body.srcImage ?? '').toString().trim();

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
// Test 1
// URL: http://localhost:3001/api/product/update/1
// body: raw JSON
// { "FlowerName": "updated flower", "CID": "1", "Price": "120", "StartDate": "2023-11-01", "EndDate": "2023-12-31", "Meaning": "This is an updated flower", "srcImage": "updated.jpg" }
// Test 2
// URL: http://localhost:3001/api/product/update/2
// body: raw JSON
// { "FlowerName": "lily", "CID": "3", "Price": "180", "StartDate": "", "EndDate": "", "Meaning": "This is a lily flower", "srcImage": "lily.jpg" }
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const FlowerName = (req.body.FlowerName ?? '').toString().trim();
        const CID = req.body.CID ? Number(req.body.CID) : null;
        const Price = Number(req.body.Price ?? null);
        const StartDate = req.body.StartDate ? req.body.StartDate.toString().slice(0, 10) : null;
        const EndDate = req.body.EndDate ? req.body.EndDate.toString().slice(0, 10) : null;
        const Meaning = (req.body.Meaning ?? '').toString().trim();
        const srcImage = (req.body.srcImage ?? '').toString().trim();

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
// Test 1
// URL: http://localhost:3001/api/product/delete/1
// Test 2
// URL: http://localhost:3001/api/product/delete/2
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: 'Missing Flower ID' });

        const [result] = await db.query('DELETE FROM Flower WHERE FlowerID = ?', [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Flower not found' });

        res.status(200).json({ message: 'Flower deleted successfully', FlowerID: id });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Database error during deletion' });
    }
};