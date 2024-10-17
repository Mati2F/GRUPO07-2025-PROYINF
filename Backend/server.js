const express = require('express');
const mysql = require('mysql');
const corse = require('cors');

const app = express()
app.use(corse())

const db = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : '',
    database : 'analisis'
})

app.get('/', (re, res) => {
    return res.json("From backend")
})

app.get('/user', (req, res) => {
    const sql = "SELECT * FROM imagenes";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, () =>{
    console.log("listening")
})