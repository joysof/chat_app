const logger = require("../config/logger");

const socketIO = (io) => {
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
      console.log(`ID: ${socket.id} disconnected`);
    });
  });
};

module.exports = socketIO;
