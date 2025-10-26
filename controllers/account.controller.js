// const db = require('../db');
// const path = require('path');
// const bcrypt = require('bcryptjs');

// module.exports = {
//     get: (req, res) => {
//         res.sendFile(path.join(__dirname, '../views/account', 'account-management.html'));
//     },
//     searchPage: (req, res) => {
//         res.sendFile(path.join(__dirname, '../views/account', 'account-search.html'));
//     },
//     search: async (req, res) => {
//         try {
//             const { AdminID } = req.body;
//             const [rows] = await db.query(
//                 'SELECT * FROM admin WHERE AdminID LIKE ? OR Username LIKE ?',
//                 [`%${AdminID}%`, `%${AdminID}%`]
//             );
//             res.json(rows);
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Database error' });
//         }
//     },
//     addPage: (req, res) => {
//         res.sendFile(path.join(__dirname, '../views/account', 'account-add.html'));
//     },
//     add: async (req, res) => {
//         try {
//             let { FName, LName, Email, PhoneNumber, Role, Username, Password } = req.body;

//             FName = (FName || '').trim();
//             LName = (LName || '').trim();
//             Email = (Email || '').trim();
//             PhoneNumber = (PhoneNumber || '').trim();
//             Role = (Role || '').trim();
//             Username = (Username || '').trim();
//             Password = (Password || '');

//             if (!FName || !LName || !Email || !PhoneNumber || !Role || !Username || !Password) {
//                 return res.status(400).json({ message: 'Missing required fields' });
//             }

//             if (!ALLOWED_ROLES.has(Role)) {
//                 return res.status(400).json({ message: 'Invalid role' });
//             }

//             const [dup] = await db.query(
//                 `SELECT 1 FROM Admin WHERE Username = ? OR Email = ? LIMIT 1`,
//                 [Username, Email]
//             );
//             if (dup.length > 0) {
//                 return res.status(409).json({ message: 'Username or Email already exists' });
//             }

//             const hashedPassword = await bcrypt.hash(Password, 10);

//             const [result] = await db.query(
//                 `INSERT INTO Admin (FName, LName, Email, PhoneNumber, Role, Username, Password)
//          VALUES (?, ?, ?, ?, ?, ?, ?)`,
//                 [FName, LName, Email, PhoneNumber, Role, Username, hashedPassword]
//             );

//             res.status(201).json({
//                 message: 'Inserted successfully',
//                 insertId: result.insertId,
//                 account: { AdminID: result.insertId, FName, LName, Email, PhoneNumber, Role, Username }
//             });

//         } catch (error) {
//             if (error && error.code === 'ER_DUP_ENTRY') {
//                 return res.status(409).json({ message: 'Duplicate entry', error: error.sqlMessage });
//             }
//             console.error('Insert error:', error);
//             res.status(500).json({ message: 'Insert error', error: error.message });
//         }
//     },
//     deletePage: (req, res) => {
//         const id = req.params.id;
//         res.sendFile(path.join(__dirname, '../views/account', 'account-delete.html'));
//     },
//     delete: async (req, res) => {
//         try {
//             const { AdminID } = req.params.id;
//             const [rows] = await db.query(
//                 'SELECT * FROM admin WHERE AdminID LIKE ? OR Username LIKE ?',
//                 [`%${AdminID}%`, `%${AdminID}%`]
//             );
//             res.json(rows);
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Database error' });
//         }
//     }
// };

// C:\Users\Lenovo\Documents\GitHub\dokmai4u\account-controller.js

const db = require('../db');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/account', 'account-management.html'));
    },
    searchPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/account', 'account-search.html'));
    },
    search: async (req, res) => {
        try {
            const { AdminID } = req.body;
            const [rows] = await db.query(
                'SELECT * FROM admin WHERE AdminID LIKE ? OR Username LIKE ?',
                [`%${AdminID}%`, `%${AdminID}%`]
            );
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Database error' });
        }
    },
    addPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/account', 'account-add.html'));
    },
    add: async (req, res) => {
        try {
            let { FName, LName, Email, PhoneNumber, Role, Username, Password } = req.body;

            FName = (FName || '').trim();
            LName = (LName || '').trim();
            Email = (Email || '').trim();
            PhoneNumber = (PhoneNumber || '').trim();
            Role = (Role || '').trim();
            Username = (Username || '').trim();
            Password = (Password || '');

            if (!FName || !LName || !Email || !PhoneNumber || !Role || !Username || !Password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            if (!ALLOWED_ROLES.has(Role)) {
                return res.status(400).json({ message: 'Invalid role' });
            }

            const [dup] = await db.query(
                `SELECT 1 FROM Admin WHERE Username = ? OR Email = ? LIMIT 1`,
                [Username, Email]
            );
            if (dup.length > 0) {
                return res.status(409).json({ message: 'Username or Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(Password, 10);

            const [result] = await db.query(
                `INSERT INTO Admin (FName, LName, Email, PhoneNumber, Role, Username, Password)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [FName, LName, Email, PhoneNumber, Role, Username, hashedPassword]
            );

            res.status(201).json({
                message: 'Inserted successfully',
                insertId: result.insertId,
                account: { AdminID: result.insertId, FName, LName, Email, PhoneNumber, Role, Username }
            });

        } catch (error) {
            if (error && error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Duplicate entry', error: error.sqlMessage });
            }
            console.error('Insert error:', error);
            res.status(500).json({ message: 'Insert error', error: error.message });
        }
    },
    deletePage: (req, res) => {
        // ไม่จำเป็นต้องประกาศ const id = req.params.id; ที่นี่
        res.sendFile(path.join(__dirname, '../views/account', 'account-delete.html'));
    },
    delete: async (req, res) => {
        try {
            // ✅ FIX: ดึงค่า AdminID จาก req.params.id
            const adminId = req.params.id;

            if (!adminId) {
                return res.status(400).json({ message: 'Missing Admin ID' });
            }

            // ✅ FIX: เปลี่ยนเป็นคำสั่ง DELETE
            const [result] = await db.query(
                'DELETE FROM Admin WHERE AdminID = ?',
                [adminId]
            );

            if (result.affectedRows === 0) {
                // หากไม่มีแถวถูกลบ หมายความว่าไม่พบ AdminID นั้น
                return res.status(404).json({ message: 'Account not found' });
            }

            res.status(200).json({ message: 'Account deleted successfully', adminId });

        } catch (error) {
            console.error('Delete error:', error);
            res.status(500).json({ message: 'Database error during deletion' });
        }
    },
    // แสดงหน้า HTML (ไม่มี JSON)
    updatePage: (req, res) => {
        return res.sendFile(path.join(__dirname, '../views/account', 'account-update.html'));
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
    // API: อ่านข้อมูลแอดมินรายเดียวเป็น JSON
    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await db.query(
                'SELECT AdminID, FName, LName, Email, PhoneNumber, Role FROM Admin WHERE AdminID = ?',
                [id]
            );
            if (!rows.length) return res.status(404).json({ message: 'Not found' });
            return res.json(rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Database error' });
        }
    }
};