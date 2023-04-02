const express = require('express')
const auth = require('./controllers/auth')
const content = require('./controllers/content')

// Create router
const router = express.Router()

// Routes for authentification
router.post('/signup', auth.signUp)
router.post('/signin', auth.signIn)
router.post('/signout', auth.signOut)

// Routes for content management
router.get('/test', content.test)
router.post('/addbox', auth.verifyToken, content.addBox)
router.post('/getbox', auth.verifyToken, content.getBox)
router.post('/changebox', auth.verifyToken, content.changeBox)
router.post('/deletebox', auth.verifyToken, content.deleteBox)

module.exports = { router }
