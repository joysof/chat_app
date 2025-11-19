const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const { Message, User } = require('../models')
const { getUserById } = require('./user.service')

const createMessage = async (senderId, receiverId, message, file) => {
  if (!senderId || !receiverId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'sender or Reciver id not found')
  }
  const sender = await getUserById(senderId)
  const reciver = await getUserById(receiverId)

  if (!sender) {
    throw new ApiError(httpStatus.NOT_FOUND, 'send user not found')
  }
  if (!reciver) {
    throw new ApiError(httpStatus.NOT_FOUND, 'reciver  user not found')
  }
  let imageUrl = null
  if (file) {
    imageUrl = `/uploads/chat_images/${file.filename}`
  }
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
    imageUrl,
  })
  return newMessage
}

const getMessageBetweenUsers = async (senderId, receiverId) => {
  const message = await Message.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ createdAt: 1 })

  return message
}
const deleteMessage = async (messageId) => {
  const message = await Message.findById(messageId)
  if (!message) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Message not found')
  }
  await message.deleteOne()
  return message
}

const sendFile = async (senderId, receiverId, files) => {
  if (!senderId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not login ')
  }
  if (!receiverId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'receiverId not found')
  }
  if (!files || files.length === 0) {
    throw new ApiError(400, 'No file uploaded')
  }

 const messages = [];

  for (const file of files) {
    const msg = await Message.create({
      senderId,
      receiverId,
      file: {
        fileName: file.originalname,
        fileUrl: `/uploads/${file.filename}`,
        fileType: file.mimetype,
        fileSize: file.size,
      },
    });
    messages.push(msg);
  }
  return messages
}
module.exports = {
  createMessage,
  getMessageBetweenUsers,
  deleteMessage,
  sendFile,
}
