const logger = require("../config/logger");

const jwt = require("jsonwebtoken");
const config = require("../config/config");

const onlineUsers = new Map();

const socketIO = (io) => {
  io.use((socket , next) =>{
    const token = socket.handshake.auth?.token;
    if(!token){
      console.log("no token provided")
      return next(new Error("Authentication error"))
    }
    try {
      const decoded = jwt.verify(token , config.jwt.secret)
      socket.userId = decoded.id
      next()
    } catch (error) {
      console.log("invalid token")
      return next(new Error("Authentication error"))
    }
  }) 
  io.on("connection", (socket) => {
    console.log(`ID: ${socket.id} just connected`);

    socket.on("add-user" , (userId) =>{
      if(userId){
        onlineUsers.set(userId , socket.id)
        io.emit("get-online-users" , Array.from(onlineUsers.keys()))
        console.log("online Users" , Array.from(onlineUsers.keys()))
      }
    })

    socket.on("join-room", (data, callback) => {
      //console.log('someone wants to join--->', data);
      if (data?.roomId) {
        socket.join("room" + data.roomId);
       callback && callback("Join room successful");
      } else {
      callback &&  callback("Must provide a valid user id");
      }
    });

    socket.on("leave-room", (data) => {
      if (data?.roomId) {
        socket.leave("room" + data.roomId);
      }
    });

    socket.on("disconnect", () => {
       for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("get-online-users", Array.from(onlineUsers.keys()));
      console.log(`ID: ${socket.id} disconnected`);
    });
  });
};

module.exports = socketIO;
