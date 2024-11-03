import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ImagesModel = db.define('imagenes',{
    url: {type: DataTypes.STRING},
    contenido: {type: DataTypes.STRING},
})

export default ImagesModel