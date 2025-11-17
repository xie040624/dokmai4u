1. รันไฟล์ dokmai4u.sql บน MySQL Workbench
2. สร้างไฟล์ .env ในโฟลเดอร์โปรเจกต์ และกำหนดค่าให้แต่ละตัวแปร
    PORT
    MYSQL_HOST
    MYSQL_USERNAME
    MYSQL_PASSWORD
    MYSQL_DATABASE
    MYSQL_PORT
    SESSION_SECRET
3. เปิด Terminal รันคำสั่ง
    npm i
4. หลังติดตั้งเสร็จ รันคำสั่ง
    npm start
5. สร้าง Super Admin
    node tools/create_admin.js