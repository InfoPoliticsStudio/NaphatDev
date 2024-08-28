const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql'); // หรือฐานข้อมูลอื่นๆ

const app = express();
const port = 3000;

app.use(bodyParser.json());

// เชื่อมต่อกับฐานข้อมูล
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername',
    password: 'yourPassword',
    database: 'yourDatabase'
});

connection.connect();

// รับข้อมูลจากหน้าแดชบอร์ด
app.post('/saveData', (req, res) => {
    const data = req.body;
    // แทรกหรืออัปเดตข้อมูลในฐานข้อมูล
    const query = 'REPLACE INTO cash_data SET ?';
    connection.query(query, data, (error, results) => {
        if (error) throw error;
        res.json({ success: true });
    });
});

// ดึงข้อมูลจากฐานข้อมูล
app.get('/getData', (req, res) => {
    const query = 'SELECT * FROM cash_data ORDER BY id DESC LIMIT 1';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
