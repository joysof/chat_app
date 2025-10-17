const express = require('express')
const auth = require('../../middlewares/auth')
const {messageController} = require('../../controllers')

const messageRoute = express.Router()

messageRoute.post('/' , auth() ,messageController.sendMessage)
messageRoute.get('/' , auth() , messageController.getMessage)


module.exports = messageRoute