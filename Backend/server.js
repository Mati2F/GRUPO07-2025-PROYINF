const express = require('express');
const mysql = require('mysql');
const corse = require('cors');

const port = process.env.PORT || 3000
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

app.get('/w1', (req, res) => {
    const sql = "SELECT url FROM imagenes";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/w2', (req, res) => {
    const sql = "SELECT url FROM imagenes WHERE id = 2";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(port, () =>{
    console.log(`Server is http://localhost:${port}`)
})