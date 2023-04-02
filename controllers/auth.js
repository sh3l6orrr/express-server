const jwt = require('jsonwebtoken');
const config = require('../config.js');

const db = config.db
const key = config.key

async function signUp(req, res, next) {
    try {
        const user = await db.oneOrNone("SELECT * FROM Users WHERE Username = $1", req.body.username)
        if (!user) {
            const usernameValid = req.body.password.length >= 4 && req.body.password.length <= 12
            const passwordValid = req.body.password.length >= 8 && req.body.password.length <= 20
            if (usernameValid && passwordValid) {
                await db.none("INSERT INTO Users(Username, Password) VALUES ($1, $2)", [req.body.username, req.body.password])
                return res.send("User created successfully.")
            } else {
                if (!usernameValid) {
                    return res.send("Username must be between 4 and 12 characters.")
                } else {
                    return res.send("User password must be between 8 and 20 characters.")
                }
            }
        } else {
            return res.send("Username already exists.")
        }
    } catch (error) {
        next(error)
    }
}

async function signIn(req, res, next) {
    try {
        const user = await db.oneOrNone("SELECT * FROM Users WHERE Username = $1", req.body.username)
        if (user) {
            if (user.password === req.body.password) {
                const token = jwt.sign(
                    { id: user.id },
                    key,
                    { expiresIn: 24 * 60 * 60 }
                )
                req.session.token = token
                return res.send("Signed in successfully.")
            } else {
                return res.send("Password incorrect.")
            }
        } else {
            return res.send("User does not exist.")
        }
    } catch (error) {
        next(error)
    }
}

async function signOut(req, res, next) {
    try {
        req.session = null
        return res.send("Signed out successfully.")
    } catch (error) {
        next(error)
    }
}

function verifyToken(req, res, next) {
    const token = req.session.token
    if (!token) {
        return res.status(400).send("No token provided!")
    }
    jwt.verify(token, key, (error, decoded) => {
        if (error) {
            return res.status(401).send("Unauthorized!")
        }
        req.userid = decoded.id
        next()
    })
}

module.exports = { signUp, signIn, signOut, verifyToken }
