const express = require('express')
const {login,logout,signUp} = require('../controllers/auth.controller')

const router = express.Router()

router.post('/login',login)
router.post('/logout',logout)
router.post('/signup',signUp)

module.exports = router

