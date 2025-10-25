const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../db');

module.exports = {
    loginPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../html', 'login.html'));
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const [rows] = await db.query('SELECT * FROM Admin WHERE Username = ?', [username]);
            if (!rows.length) {
                return res.redirect('/login?error=Invalid%20username%20or%20password');
            }
            const user = rows[0];

            const ok = await bcrypt.compare(password, user.Password);
            if (!ok) {
                return res.redirect('/login?error=Invalid%20username%20or%20password');
            }

            req.session.user = { id: user.AdminID, username: user.username };
            return res.redirect('/account');
        } catch (e) {
            console.error(e);
            return res.status(500).send('Login error');
        }
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    }
};
