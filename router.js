const express = require('express')
const auth = require('./controllers/auth')
const content = require('./controllers/content')

// Create router
const router = express.Router()

// Test route
router.get('/test', content.test)

// Routes for authentification
router.post('/signup', auth.signUp)
router.post('/signin', auth.signIn)
router.post('/signout', auth.signOut)

// Routes for content management
router.post('/box', auth.verifyToken, content.createBox)
router.get('/box', auth.verifyToken, content.readBox)
router.put('/box', auth.verifyToken, content.updateBox)
router.delete('/box', auth.verifyToken, content.deleteBox)

module.exports = { router }
