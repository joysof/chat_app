const express = require('express')
const auth = require('../../middlewares/auth')
const {messageController} = require('../../controllers')
const upload = require('../../middlewares/fileUpload')('uploads/') 

const messageRoute = express.Router()

messageRoute.post('/' , auth() ,upload.single('file') ,messageController.sendMessage)
messageRoute.get('/' , auth() , messageController.getMessage)
messageRoute.delete('/:id' , auth() , messageController.deleteMessage)
messageRoute.post('/file' , auth(),upload.any(), messageController.sendfile)


module.exports = messageRoute