import express from "express"
import cors from 'cors'
import db from "./database/db.js";
import imagesRoutes from './routes/routes.js'

const port = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/images', imagesRoutes)

try {
    db.authenticate()
    console.log("Exito en la conexión de la BD");
} catch (error) {
    console.log(`Error: ${error}`);
}

app.get('/', (re, res) => {
    return res.json("From backend")
})

/*
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
*/

app.listen(port, () =>{
    console.log(`Server is http://localhost:${port}`)
})