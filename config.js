const env = require("dotenv")
const pgp = require('pg-promise')

// Config .env file
env.config()

// Create private key for cookie generation
const key = process.env.KEY

// Create a shared postgresql object
const postgre = pgp()
const db = postgre(process.env.DB)

// Initiate tables if not exist
// Table test
db.none(
    "CREATE TABLE IF NOT EXISTS Test (Message TEXT PRIMARY KEY);" +
    "INSERT INTO Test VALUES ('Database is working.') ON CONFLICT (Message) DO NOTHING"
).catch((error) => {
    console.log(error)
})
// Table users
db.none(
    "CREATE TABLE IF NOT EXISTS Users (" +
        "ID SERIAL PRIMARY KEY," + 
        "Username VARCHAR(12)," +
        "Password VARCHAR(20)" +
    ")"
).catch((error) => {
    console.log(error)
})
// Table contents
db.none(
    "CREATE TABLE IF NOT EXISTS Contents (" +
        "ID SERIAL PRIMARY KEY," + 
        "Content TEXT," +
        "UserID INT" +
    ")"
).catch((error) => {
    console.log(error)
})

module.exports = { db, key }