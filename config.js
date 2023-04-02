const env = require("dotenv")
const pgp = require('pg-promise')

// Config .env file
env.config()

// Create a shared postgresql object
const postgre = pgp()
const db = postgre(process.env.DB)

// Create private key for cookie generation
const key = process.env.KEY

module.exports = { db, key }