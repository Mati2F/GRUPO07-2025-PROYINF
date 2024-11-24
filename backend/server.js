const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 8081
const mysql = require("mysql")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST","GET"],
    credentials: true
}))
app.use(cookieParser())

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

const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){ //si no existe la cookie del login
        return res.json({Error: "Not loged in :("})
    }else {
        jwt.verify(token, "jwt-secret-key", (err, decoded)=> {
            if(err){
                return res.json({Error: "Token not right"})
            } else {
                req.name = decoded.name
                next();
            }
        })
    }
}
app.get("/admin/all-drafts",verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name})
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
            const name = data[0].name
            const token = jwt.sign({name},"jwt-secret-key", {expiresIn: '1d'}); //Generate token\
            res.cookie('token',token)
            return res.json("Login successfully")
        }else{
            return res.json("No record")
        }
    })
})

app.get('/logout', (req, res)=>{
    res.clearCookie('token')
    return res.json({Status: "Success"});
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
        if(err) return res.json({Error: "Inserting data error in server"});
        return res.json({Status: "Success"});
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


app.listen(port, () =>{
    console.log('listening')
}) 