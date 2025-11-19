const bcrypt = require('bcryptjs');
const db = require('../db');

// Test login API
// method: post
// URL: http://localhost:3000/login
// body: raw JSON
// {
//   "username": "",
//   "password": ""
// }
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const [rows] = await db.query(
            'SELECT * FROM Admin WHERE Username = ?',
            [username]
        );

        if (!rows.length) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = rows[0];

        const ok = await bcrypt.compare(password, user.Password);
        if (!ok) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        req.session.user = {
            id: user.AdminID,
            username: user.Username,
            role: user.Role
        };

        await db.query(
            'INSERT INTO Login (AdminID) VALUES (?)',
            [user.AdminID]
        );

        console.log('login session:', req.session);
        return res.json({
            message: 'Login successful',
            user: {
                id: user.AdminID,
                username: user.Username,
                role: user.Role
            }
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Login error' });
    }
};

// Handles user logout (destroying session)
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('http://localhost:3000/login');
    });
}