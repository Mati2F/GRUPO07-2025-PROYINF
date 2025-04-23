const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 8081
const mysql = require("mysql")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const nodemailer = require('nodemailer')
        
const app = express()
app.use(express.json({limit: "25mb"}))
app.use(express.urlencoded({limit:"25mb"}))
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST","GET",'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))
app.use(cookieParser())

//pinga
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "analisis"
})


//Show boletines
app.get("/", (req, res) => {
    const sql = "SELECT * FROM imagenes";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data)
    })
})

app.get("/categorias", (req, res) => {
    const sql = "SELECT categorias FROM imagenes";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        const elementMap = new Map()
        const categorias = []
        for(let categoria in data){
            if(elementMap.has(data[categoria].categorias)) elementMap.set(data[categoria].categorias, elementMap.get(data[categoria].categorias) + 1);
            else elementMap.set(data[categoria].categorias, 1);
        }
        elementMap.forEach((count, element) =>{
            if(count > 1) {
                categorias.push(element);
            }
        })
        return res.json(categorias)
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

//Verify user with cookie
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
                req.role = decoded.role
                next();
            }
        })
    }
}
app.get("/admin/all-drafts",verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name, role: req.role})
    })

app.post('/login', (req, res) => {
    const sql= "SELECT * FROM users WHERE Correo = ? AND Pwd = ?"

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("Login Failed" )
        if(data.length > 0){
            const name = data[0].Nombre
            const role = data[0].Rol
            const token = jwt.sign({name, role},"jwt-secret-key", {expiresIn: '1d'}); //Generate token\
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

//  Show users
app.get('/admin', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

//Create usr
app.post('/admin/create', (req,res) => {
    const sql = "INSERT INTO users(`Rol`, `Correo`, `Pwd`, `Nombre`, `Apellidos`) VALUES (?)";
    const values = [
        req.body.rol,
        req.body.email,
        req.body.pass,
        req.body.name,
        req.body.apellidos
    ]
    db.query(sql, [values], (err, data) =>{
        if(err) return res.json({Error: "Inserting data error in server"});
        return res.json({Status: "Success"});
    })
})


//Email con contrase;a
function sendEmail(receiver, password){
    return new Promise((resolve,reject)=>{
        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'proyectovigifiausm@gmail.com',
                pass:'Analisis2024grupo2'
            }
        })
        const mail_configs ={
            from:'proyectovigifiausm@gmail.com',
            to:receiver,
            subject:'Tu contrasena para Vigifia',
            text: 'Inicia sesion en vigifia con tu este correo y la siguiente contrasena '+password
        }
        transporter.sendMail(mail_configs, function(error, info){
            if(error){
                console.log(error);
                return reject({message: 'Error with sending mail'})
            }
            return resolve({message:"Email sent successfully"})
        })
    })
}
app.post("/send_email",(req,res)=>{
    sendEmail(req.body)
        .then((response)=> res.send(response.message))
        .catch((error)=> res.status(500).send(error.message))
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