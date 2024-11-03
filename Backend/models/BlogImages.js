import db from "../database/db.js";
import { DataTypes } from "sequelize";

db.define('imagenes',{
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
})
export default ImagesModel