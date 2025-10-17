const httpStatus = require("http-status")
const catchAsync = require("../utils/catchAsync")
const response = require("../config/response")
const { messageService } = require('../services')

const sendMessage = catchAsync(async(req,res) =>{
      const senderId = req.user.id 
      const receiverId = req.body.receiverId
      const file = req.file
      const message = req.body.message

    const data = await messageService.createMessage(senderId , receiverId ,message, file)
  

    res.status(httpStatus.CREATED).json(
        response({
            message : "Message sent successfully",
            status : "Ok",
            statusCode:httpStatus.CREATED,
            data
        })
    )
})


const getMessage = catchAsync(async(req ,res) =>{
    const { senderId, receiverId } = req.query;
    const data = await messageService.getMessageBetweenUsers(senderId , receiverId)

      res.status(httpStatus.OK).json(
    response({
      message: "Messages fetched successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data
    })
  );
})
const deleteMessage = catchAsync(async(req,res)=>{
    const data = await messageService.deleteMessage(req.params.id)
    
res.status(httpStatus.OK).json(
    response({
      message: "Message deleted successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data
    })
  );
})

module.exports =
{
    sendMessage,
    getMessage,
    deleteMessage
}