const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const event_functions = require("./utils/userMethods");

const {connectionFunction} = require("./socket_controllers/socket.connections");
const {disconnectionFunction} = require("./socket_controllers/socket.disconnection");
const { authenticateFunction } = require('./socket_controllers/socket.authenticate');
const {sendNotification, sendMassNotification, getNotificationHistoryByEmail} = require('./socket_controllers/socket.sendNotification');

const cors = require("cors");

app.use(cors());
// For parsing application/json
app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


io.on('connection', (socket) => {
    
    connectionFunction(socket);
    socket.on('disconnect',async () => {
      await disconnectionFunction(socket.id);
    });

    socket.on('chat message', (message)=>{
      console.log("message "+ message);
    });

    socket.on('chat message', (message)=>{
      console.log("message "+ message);
    });

    
    socket.on('set name', ({jwt, socket_id})=>{
        authenticateFunction({jwt, socket_id, socket});
    });

  socket.on("send_notification",(data)=>{
      sendNotification({...data,socket});
  });

  socket.on("massNotification",(data)=>{
      sendMassNotification({...data, socket});
  });

  socket.on("getNotificationHistory", (socket_id)=>{
    getNotificationHistoryByEmail(socket_id, socket);
  })
});

app.use("/api/chats", require("./routes/chat"));

server.listen(5000, () => {
  console.log('listening on *:3000');
});