const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 3000
const mysql = require("mysql")

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "analisis"
})


app.get('/', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/create', (req,res) => {
    const sql = "INSERT INTO users(`Rol`, `Correo`, `Nombre`, `Apellidos`) VALUES (?)";
    const values = [
        req.body.rol,
        req.body.email,
        req.body.name,
        req.body.apellidos
    ]
    db.query(sql, [values], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.put('/update/:id', (req,res) => {
    const sql = "UPDATE users SET Rol = ? Correo = ? Nombre = ? Apellidos = ? Pwd = ? where UserID = ?";
    const values = [
        req.body.rol,
        req.body.email,
        req.body.name,
        req.body.apellidos,
        req.body.pwd,
    ]
    const id = req.params.id;
    db.query(sql, [values, id], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})


/* 
app.post('/login', async (req,res) => {
    const sql = 'SELECT * FROM users WHERE user = ? AND password = ?'
    const values = [
        req.body.user,
        req.body.pass
    ]
    if (user && pass){
        db.query(sql, [values], (error, results) => {
            if(results.lenght == 0 ){
                return res.json('USUARIO Y/O PASSWORD INCORRECTA');
            }else{
                return res.json(data);
            }
        })
    }else{
        res.send('login exitoso')
    }
})


 */
app.listen(port, () =>{
    console.log('listening')
})