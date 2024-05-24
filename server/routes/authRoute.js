const express = require('express')
const authRouter = express();
const authController = require('../controller/authController')

authRouter.post('/register', authController.registerUser)
authRouter.post('/login', authController.loginUser)

module.exports = authRouter