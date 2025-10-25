const db = require('../db');
const path = require('path');

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/account', 'account-management.html'));
    },
    searchPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/account', 'account-search.html'));
    },
    select: async (req, res) => {
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
    insert: async (req, res, next) => {
        try {
            const { fname, lname } = req.body;
            const [result] = await db.query(
                'INSERT INTO admin (fname, lname) VALUES (?, ?)',
                [fname, lname]
            );
            res.json({ message: 'Inserted successfully', insertId: result.insertId });
        } catch (error) {
            console.error(error);
            res.status(500).send('Insert error');
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { fname, lname } = req.body;
            const [result] = await db.query(
                'UPDATE admin SET fname = ?, lname = ? WHERE id = ?',
                [fname, lname, id]
            );
            res.json({ message: 'Updated successfully', affectedRows: result.affectedRows });
        } catch (error) {
            console.error(error);
            res.status(500).send('Update error');
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const [result] = await db.query('DELETE FROM admin WHERE id = ?', [id]);
            res.json({ message: 'Deleted successfully', affectedRows: result.affectedRows });
        } catch (error) {
            console.error(error);
            res.status(500).send('Delete error');
        }
    }
};
