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

app.get("/", (req, res) => {
    const sql = "SELECT * FROM imagenes";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data)
    })
})

//obtener por id
app.get("/images/:id", (req, res) => {
    const sql = "SELECT * FROM imagenes WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data)
    })
})

app.post('/login', (req, res) => {
    const sql= "SELECT * FROM users WHERE Correo = ? AND Pwd = ?"

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("Login Failed" )
        if(data.length > 0){
            return res.json("Login successfully")
        }else{
            return res.json("no record "+ data + " "+ req.body.email + " " + req.body.password)
        }
    })
})

app.get('/admin', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/admin/create', (req,res) => {
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
app.put('/admin/update/:id', (req,res) => {
    
    let sql = "UPDATE users SET ";
    const values = [
        req.body.rol,
        req.body.email,
        req.body.pwd,
        req.body.name,
        req.body.apellidos,
    ]
    let actualvalues = [];
    let setClauses = [];

    for(let i=0 ; i< values.length ; i++){
        if(values[i]!==""){ // Rol = ? Correo = ? Nombre = ? Apellidos = ? Pwd = ? where UserID = ?
            if(i==0){
                setClauses.push("Rol = ?");
                actualvalues.push(values[i])
            }else if(i==1){
                setClauses.push("Correo = ?");
                actualvalues.push(values[i])
            }else if(i==2){
                setClauses.push("Pwd = ?");
                actualvalues.push(values[i])
            }else if(i==3){
                setClauses.push("Nombre = ?");
                actualvalues.push(values[i])
            }else if(i==4){
                setClauses.push("Apellidos = ?");
                actualvalues.push(values[i])
            }
        }
    }
    sql += setClauses.join(", ")
    sql += "WHERE UserID = ?"

    const id = req.params.id;
    db.query(sql, [...actualvalues, id], (err, data) =>{
        if(err) {
            console.error("Error de actualización en la base de datos:", err); // Log para depuración
            return res.status(500).json("Error al actualizar el usuario");
        }
        return res.json(data);
    })
})

app.delete('/admin/:id', (req,res) => {
    
    let sql = "DELETE FROM users WHERE UserId = ? ";
    
    const id = req.params.id;
    db.query(sql, [id], (err, data) =>{
        if(err) {
            console.error("Error de actualización en la base de datos:", err); // Log para depuración
            return res.status(500).json("Error al eliminar el usuario");
        }
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