const jwt = require('jsonwebtoken');
const config = require('../config.js');

const db = config.db
const key = config.key

async function signUp(req, res, next) {
  try {
    const user = await db.any("SELECT * FROM users WHERE email = $1", req.body.email)
    if (!user.length) {
      const emailValid = /^\S+@\S+$/.test(req.body.email)
      const pwdValid = req.body.pwd.length >= 8
      if (emailValid && pwdValid) {
        await db.none("INSERT INTO users VALUES ($1, $2)", [req.body.email, req.body.pwd])
        return res.send("User created successfully.")
      }
      else {
        if (!emailValid) {
          return res.send("User email is invalid.")
        }
        if (!pwdValid) {
          return res.send("User password must be 8 characters or longer.")
        }
      }
    }
    else {
      return res.send("User email already exists.")
    }
  } 
  catch (error) {
    next(error)
  }
}

async function signIn(req, res, next){
  try {
    const user = await db.any("SELECT * FROM users WHERE email = $1", req.body.email)
    if (user.length) {
      if (user[0].pwd === req.body.pwd) {
        const token = jwt.sign(
          { email: req.body.email },
          key,
          { expiresIn: 86400 }
        )
        req.session.token = token
        return res.send("Signed in successfully.")
      }
      else {
        return res.send("Password incorrect.")
      }
    }
    else {
      return res.send("User does not exist.")
    }
  }
  catch (error) {
    next(error)
  }
}

async function signOut(req, res, next){
  try {
    req.session = null;
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
    req.email = decoded.email
    next()
  })
}

module.exports = { signUp, signIn, signOut, verifyToken }
