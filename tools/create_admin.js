require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../db');

bcrypt.hash('6787051',10).then(console.log)

async function main() {
    try {
        const FName = 'Thanakorn';
        const LName = 'Kansorn';
        const Email = 'admin@example.com';
        const PhoneNumber = '0123456789';
        const Role = 'SuperAdmin';
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