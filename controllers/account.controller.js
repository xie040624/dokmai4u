const db = require('../db');
const path = require('path');

module.exports = {
    root: (req, res, next) => {
        res.sendFile(path.resolve(__dirname, '../html/admin-users-account-management.html'));
    },
    select: async (req, res, next) => {
        try {
            const [rows] = await db.query('SELECT * FROM admin');
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Database error');
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
