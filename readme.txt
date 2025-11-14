1. เปิด MySQL Workbench รันไฟล์ dokmai4u.sql
2. สร้างไฟล์ .env ในโฟลเดอร์โปรเจกต์ และกำหนดค่าตัวแปรต่อไปนี้
    PORT
    MYSQL_HOST
    MYSQL_USERNAME
    MYSQL_PASSWORD
    MYSQL_DATABASE
    MYSQL_PORT
    SESSION_SECRET
3. เปิด Terminal ไปที่โฟลเดอร์โปรเจกต์ (DOKMAI4U) แล้วรันคำสั่ง
    npm i
4. หลังติดตั้งเสร็จ ให้รันคำสั่ง
    npm start
5. ถ้าต้องการสร้าง Super Admin ให้รันสคริปต์ (เนื่องจาก account ในไฟล์ถูกสร้างแล้วให้แก้ไขข้อมูลก่อน)
    node tools/create_admin.js