const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const {Message, User} = require('../models')
const { getUserById } = require('./user.service')

const createMessage = async (senderId , receiverId ,message , file) =>{
    if (!senderId || !receiverId) {
        throw new ApiError(httpStatus.BAD_REQUEST , "sender or Reciver id not found")
    }
    const sender = await getUserById(senderId)
    const reciver = await getUserById(receiverId)

    if (!sender) {
        throw new ApiError(httpStatus.NOT_FOUND , "send user not found")
    }
    if (!reciver) {
        throw new ApiError(httpStatus.NOT_FOUND , "reciver  user not found")
    }
    let imageUrl = null 
    if(file){
        imageUrl = `/uploads/chat_images/${file.filename}`
    }
    const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
        imageUrl
    })
    return newMessage
}

module.exports ={
    createMessage
}