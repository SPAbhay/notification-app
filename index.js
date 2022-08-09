const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const event_functions = require("./utils/methods");

const {connectionFunction} = require("./socket_controllers/socket.connections");
const {disconnectionFunction} = require("./socket_controllers/socket.disconnection");
const { authenticateFunction } = require('./socket_controllers/socket.authenticate');
const {sendNotification} = require('./socket_controllers/socket.sendNotification');

let onlineUsers = [];


// methods
// const addNewUser = (username, socketId) => {
//     !onlineUsers.some((user) => user.username === username) &&
//       onlineUsers.push({ username, socketId });
//   };
  
//   const removeUser = (socketId) => {
//     onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
//   };
  
//   const getUser = (username) => {
//     return onlineUsers.find((user) => user.username === username);
//   };


io.on('connection', (socket) => {
    
    connectionFunction(socket);

    socket.on('disconnect', () => {
      disconnectionFunction();
    });

    socket.on('chat message', (message)=>{
      console.log("message "+ message);
    });

    socket.on('chat message', (message)=>{
      console.log("message "+ message);
    });

    
    socket.on('set name', ({jwt, socket_id})=>{
        
        authenticateFunction({jwt, socket_id, socket});
        // event_functions.addNewUser(jwt, socket_id);
        // console.log(onlineUsers)
        // var options = {
        //     url: "http://34.214.207.222:80/api/users/search_student_by_name?name="+name,
        //     headers: {
        //       'access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6InNhbWVlcnZhc2hpc2h0MzlAZ21haWwuY29tIiwiZXhwIjoxNjU0Njc4Mjg3fQ.WF2XWNgXvHldyudBzMz6-81NzxCxWAjeWMchrY0KUO8'
        //     },
          
        //   };

        // request.get(options, function(err, response, body) {
        //     if (!err && response.statusCode == 200) {
        //         var locals = JSON.parse(body);
        //         console.log(locals);
        //         socket.emit("set_user", locals);
        //     }
        // })

    });

  socket.on("send_notification",(data)=>{
      sendNotification({...data,socket});
  })
});

server.listen(5000, () => {
  console.log('listening on *:3000');
});