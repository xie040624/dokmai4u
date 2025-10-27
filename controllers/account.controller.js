const db = require('../db');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = {
    root: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'account-management.html')),
    // searchPage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'account-search.html')),
    addPage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'account-add.html')),
    updatePage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'account-update.html')),
    deletePage: (req, res) => res.sendFile(path.join(__dirname, '../views/account', 'account-delete.html')),
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
    // search: async (req, res) => {
    //     try {
    //         const { searchKey } = req.body;
    //         const [rows] = await db.query(
    //             'SELECT AdminID, Role, Username FROM admin WHERE AdminID LIKE ? OR Username LIKE ?',
    //             [`%${searchKey}%`, `%${searchKey}%`]
    //         );
    //         res.json(rows);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Database error' });
    //     }
    // },
    add: async (req, res) => {
        try {
            const { FName, LName, Email, PhoneNumber, Username, Password } = req.body ?? {};

            if (![FName, LName, Email, PhoneNumber, Username, Password].every(Boolean)) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const fName = String(FName).trim();
            const lName = String(LName).trim();
            const email = String(Email).trim();
            const phone = String(PhoneNumber).trim();
            const username = String(Username).trim();
            const password = String(Password).trim();

            const [duplicate] = await db.query(
                'SELECT 1 FROM Admin WHERE Username = ? OR Email = ? LIMIT 1',
                [username, email]
            );
            if (duplicate.length > 0) {
                return res.status(409).json({ message: 'Username or Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await db.query(
                `INSERT INTO Admin (FName, LName, Email, PhoneNumber, Username, Password)
       VALUES (?, ?, ?, ?, ?, ?)`,
                [fName, lName, email, phone, username, hashedPassword]
            );

            res.status(201).json({
                message: 'Inserted successfully',
                insertId: result.insertId,
                account: { AdminID: result.insertId, FName: fName, LName: lName, Email: email, PhoneNumber: phone, Username: username }
            });

        } catch (error) {
            if (error && error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Duplicate entry', error: error.sqlMessage });
            }
            console.error('Insert error:', error);
            res.status(500).json({ message: 'Insert error', error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { FName, LName, Email, Phone } = req.body;

            if (!FName || !LName || !Email) {
                return res.status(400).json({ message: 'FName, LName, Email are required' });
            }

            const [result] = await db.query(
                `UPDATE Admin SET FName = ?, LName = ?, Email = ?, PhoneNumber = ? WHERE AdminID = ?`,
                [FName, LName, Email, Phone || null, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            return res.json({ ok: true, updatedId: id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }
    },
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
    }
};