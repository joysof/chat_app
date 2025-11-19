const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
const http = require("http");

// My Local IP Address
const myIp = process.env.BACKEND_IP;

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, myIp, () => {
    logger.info(`Listening to port ${config.port}`);
    logger.info(`Listening to ip http://${myIp}:${config.port}`);
  });

  //initializing socket io

  // const socketIo = require("socket.io");
  // const socketIO = require("./utils/socketIO");
  // const socketServer = http.createServer();
  // const io = socketIo(socketServer, {
  //   cors: {
  //     origin: ["http://localhost:5173", `http://${myIp}:5173`],
  //     credentials: true,
  //   },
  // });
  

  // socketIO(io);

  // global.io = io;
  // socketServer.listen(config.socketPort, process.env.BACKEND_IP, () => {
  //   logger.info(`Socket IO listening to port ${config.socketPort}`);
  // });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
