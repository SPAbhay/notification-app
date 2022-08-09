const event_functions = require("../utils/methods");

exports.sendNotification = (data)=>{
  const {send_to,sent_by, notification,socket} = data;

    console.log(data);
    let send_to_user=event_functions.getUser(send_to);
    console.log("send to ", send_to_user);
    console.log("send by ", event_functions.getUserBySocketId(sent_by));

    // if user exist in redis
    if(send_to_user){
        // console.log("here senf to user "+ send_to_user.socketId);
        socket.to(send_to_user.socketId).emit("getnotified",notification);
    }
    socket.emit("isChatSent", `chat sent to ${send_to}`);
}