import { Sequelize } from "sequelize";

const db = new Sequelize('analisis', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db