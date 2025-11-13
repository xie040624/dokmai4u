// This script creates a super admin user in the database.
require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../db');

async function main() {
    try {
        const FName = 'Thanakorn';
        const LName = 'Kansorn';
        const Email = 'superadmin@dokmai4u.com';
        const PhoneNumber = '0123456789';
        const Role = 'SuperAdmin'; // SuperAdmin, Admin
        const Username = 'root';
        const plain = '6787104';

        const hash = await bcrypt.hash(plain, 10);

        await db.query(
            'INSERT INTO Admin (FName, LName, Email, PhoneNumber, Role, Username, Password) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [FName, LName, Email, PhoneNumber, Role, Username, hash]
        );

        console.log('Created successfully');
    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}

main();