// This script creates a super admin user in the database.
const bcrypt = require('bcryptjs');
const db = require('../../db');

async function main() {
    try {
        const FName = 'super';
        const LName = 'admin';
        const Email = 'example@dokmai4u.com';
        const PhoneNumber = '0123456789';
        const Role = 'SuperAdmin'; // SuperAdmin, Admin
        const Username = 'root';
        const plain = 'rootpassword';

        const hash = await bcrypt.hash(plain, 10);

        const sql = 'INSERT INTO Admin (FName, LName, Email, PhoneNumber, Role, Username, Password) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const paramas = [FName, LName, Email, PhoneNumber, Role, Username, hash];

        await db.query(sql, paramas);

        console.log('Created successfully');
    } catch (error) {
        console.error({ message: `Error creating ${Role}`, error });
    } finally {
        process.exit(0);
    }
}

main();