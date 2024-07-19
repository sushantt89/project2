import { Sequelize, DataTypes } from 'sequelize'
import dbConfig from '../config/dbConfig'

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: 3306,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        idle: dbConfig.pool.idle,
        acquire: dbConfig.pool.acquire,
    }
})


sequelize.authenticate()
    .then(() => {
        console.log("DB connected successfully")
    })
    .catch((err) => {
        console.log(err.message)
    })

const db: any = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.sequelize.sync({ force: false }).then(() => {
    console.log("Migrated")
})

export default db;