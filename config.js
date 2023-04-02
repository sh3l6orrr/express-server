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
    "CREATE TABLE IF NOT EXISTS test (message text);" +
    "INSERT INTO test VALUES ('Database is working.')"
).catch((error) => {
    console.log(error)
})
// Table users
db.none(
    "CREATE TABLE IF NOT EXISTS users (" +
        "id SERIAL PRIMARY KEY," + 
        "username VARCHAR(12)," +
        "pwd VARCHAR(20)" +
    ")"
).catch((error) => {
    console.log(error)
})
// Table contents
db.none(
    "CREATE TABLE IF NOT EXISTS contents (" +
        "id SERIAL PRIMARY KEY," + 
        "content TEXT," +
        "user_id INT" +
    ")"
).catch((error) => {
    console.log(error)
})

module.exports = { db, key }