const express = require("express")
const cors = require("cors")
const cookieSession = require("cookie-session")
const router = require("./router")

// Create express REST api
const app = express()

// Use middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded(
    {
        extended: 'false'
    }
))
app.use(cookieSession(
    {
        secret: "lalaland3",
        maxAge: 24 * 60 * 60 * 1000
    }
))

// Use registered router
app.use("/", router.router)

// Server start listening
app.listen(3000, () => {
    console.log("Server listening on 3000")
})
