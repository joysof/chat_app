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

const getMessageBetweenUsers = async(senderId , receiverId)=>{
    const message = await Message.find({
        $or:[
            {senderId , receiverId},
            {senderId : receiverId , receiverId : senderId},
        ],
    }).sort({createdAt : 1})

    return message
}
const deleteMessage = async(messageId) =>{
    const message = await Message.findById(messageId)
    if (!message) {
        throw new ApiError(httpStatus.NOT_FOUND,"Message not found")

    }
    await message.deleteOne()
    return message
}
module.exports ={
    createMessage,
    getMessageBetweenUsers,
    deleteMessage
}