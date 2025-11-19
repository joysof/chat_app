const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        receiverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        message:{
            type:String
        },
        image:{
            type:String
        },
        file:{
            fileName: { type: String, default: null },
            fileUrl: { type: String, default: null },
            fileType: { type: String, default: null },
            fileSize: { type: Number, default: null }
        }
    },{timestamps:true}
)

const message = mongoose.model('message' , messageSchema)

module.exports = message