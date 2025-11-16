const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../db');

module.exports = {
    loginPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../html', 'login.html'));
    },
    // Test login API
    // method: post
    // URL: http://localhost:3000/login
    // body: raw JSON
    // {
    //   "username": "",
    //   "password": ""
    // }
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // หา user จาก database
            const [rows] = await db.query(
                'SELECT * FROM Admin WHERE Username = ?',
                [username]
            );

            // ถ้าไม่เจอ user ใน database ส่งกลับไปที่หน้า login
            if (!rows.length) {
                return res.redirect('/login?error=Invalid%20username%20or%20password');
            }

            const user = rows[0];

            // ตรวจสอบรหัสผ่าน
            const ok = await bcrypt.compare(password, user.Password);
            if (!ok) {
                return res.redirect('/login?error=Invalid%20username%20or%20password');
            }

            // เก็บ session
            req.session.user = {
                id: user.AdminID,
                username: user.Username,
                role: user.Role
            };

            // บันทึกเวลาที่ login
            await db.query(
                'INSERT INTO Login (AdminID) VALUES (?)',
                [user.AdminID]
            );

            return res.redirect('/product');
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