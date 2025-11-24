1. Run the dokmai4u.sql script in MySQL Workbench.

2. Open the Front End folder, then run:
    npm install
    npm start

3. Open the Back End folder and create a .env file with:
   PORT=3001
   MYSQL_HOST=127.0.0.1
   MYSQL_PORT=3306
   MYSQL_USERNAME=
   MYSQL_PASSWORD=
   MYSQL_DATABASE=dokmai4u
   FRONT_ORIGIN=http://localhost:3000
   SESSION_SECRET=

4. In the Back End folder, run:
   npm install
   node tools/create_admin.js
   npm start