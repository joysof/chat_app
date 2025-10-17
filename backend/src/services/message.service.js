const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const Message = require('../models')

const createMessage = async (messageBody , file) =>{
    const {senderId ,receiverId,message} = messageBody;
    if (!senderId || !receiverId) {
        throw new ApiError(httpStatus.BAD_REQUEST , "sender or Reciver id not found")
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