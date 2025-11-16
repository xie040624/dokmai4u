const db = require('../db');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = {
    root: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'account-management.html')),
    addPage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'account-add.html')),
    updatePage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'account-update.html')),
    deletePage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'account-delete.html')),
    // Test API to get account by ID
    // method: get
    // URL: http://localhost:3000/account/api/admin/:id
    // params: id (AdminID)
    get: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await db.query(
                'SELECT * FROM Admin WHERE AdminID = ?',
                [id]
            );
            if (!rows.length) return res.status(404).json({ message: 'Not found' });
            return res.json(rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }
    },
    // Test API to get all accounts
    // method: get
    // URL: http://localhost:3000/account/getall
    getall: async (req, res) => {
        try {
            const [rows] = await db.query(
                'SELECT AdminID, Role, Username FROM Admin'
            );
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Database error' });
        }
    },
    // Test API to add new account
    // method: post
    // URL: http://localhost:3000/account/add
    // body: { FName, LName, Email, PhoneNumber, Username, Password }
    add: async (req, res) => {
        try {
            const FName = (String(req.body.FName) || '').trim();
            const LName = (String(req.body.LName) || '').trim();
            const Email = (String(req.body.Email) || '').trim();
            const PhoneNumber = (String(req.body.PhoneNumber) || '').trim();
            const Username = (String(req.body.Username) || '').trim();
            const Password = (String(req.body.Password) || '').trim();

            if (![FName, LName, Email, PhoneNumber, Username, Password].every(Boolean)) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const [duplicate] = await db.query(
                'SELECT 1 FROM Admin WHERE Username = ? OR Email = ? LIMIT 1',
                [Username, Email]
            );

            if (duplicate.length > 0) {
                return res.status(409).json({ message: 'Username or Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(Password, 10);

            const sql = `
                INSERT INTO Admin(FName, LName, Email, PhoneNumber, Username, Password)
                VALUES(?, ?, ?, ?, ?, ?)`;

            const params = [FName, LName, Email, PhoneNumber, Username, hashedPassword];

            const [result] = await db.query(sql, params);

            res.status(201).json({
                message: 'Inserted successfully',
                AdminID: result.insertId,
                account: { AdminID: result.insertId, FName: FName, LName: LName, Email: Email, PhoneNumber: PhoneNumber, Username: Username }
            });

        } catch (error) {
            if (error && error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Duplicate entry', error: error.sqlMessage });
            }
            console.error('Insert error:', error);
            res.status(500).json({ message: 'Insert error', error: error.message });
        }
    },
    // Test API to update account by ID
    // method: put
    // URL: http://localhost:3000/account/update/:id
    // params: id (AdminID)
    // body: { FName, LName, Email, Phone }
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { FName, LName, Email, Phone } = req.body;

            if (!FName || !LName || !Email) {
                return res.status(400).json({ message: 'First Name, Last Name, Email are required' });
            }

            const [result] = await db.query(
                `UPDATE Admin SET FName = ?, LName = ?, Email = ?, PhoneNumber = ? WHERE AdminID = ?`,
                [FName, LName, Email, Phone || "-", id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Account not found' });
            }
            return res.status(200).json({ ok: true, updatedId: id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }
    },
    // Test API to delete account by ID
    // method: delete
    // URL: http://localhost:3000/account/delete/:id
    // params: id (AdminID)
    delete: async (req, res) => {
        try {
            const adminId = req.params.id;
            if (!adminId) return res.status(400).json({ message: 'Missing Admin ID' });

            const [result] = await db.query('DELETE FROM Admin WHERE AdminID = ?', [adminId]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Account not found' });

            res.status(200).json({ message: 'Account deleted successfully', adminId });
        } catch (error) {
            console.error('Delete error:', error);
            res.status(500).json({ message: 'Database error during deletion' });
        }
    },
    // Test API to search accounts
    // method: post
    // URL: http://localhost:3000/account/search
    // body: {
    //   "searchKey": "",
    //   "searchId": "",
    //   "searchRole": ""
    // }
    search: async (req, res) => {
        try {
            const searchKey = (req.body.searchKey || '').trim();
            const searchId = (req.body.searchId || '').trim();
            const searchRole = (req.body.searchRole || '').trim();

            const where = [];
            const params = [];

            if (searchId) {
                where.push('AdminID = ?');
                params.push(searchId);
            }

            if (searchKey) {
                where.push('Username LIKE ?');
                params.push(`%${searchKey}%`);
            }

            if (searchRole) {
                where.push('Role = ?');
                params.push(searchRole);
            }

            let sql = 'SELECT AdminID, Role, Username FROM Admin';

            if (where.length) {
                sql += ' WHERE ' + where.join(' OR ');
            }

            const [rows] = await db.query(sql, params);
            res.json(rows);
        } catch (error) {
            console.error('Search error:', error);
            res.status(500).json({ message: 'Database error' });
        }
    }
};