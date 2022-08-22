const event_functions = require("../utils/userMethods");
const notification_functions = require("../utils/notificationMethods");
const ChatServices = require("../database/services/chat.services");
exports.sendNotification = async (data)=>{
  const {send_to,sent_by, notification,socket} = data;

    let send_to_user=event_functions.getUser(send_to);

    // if user exist in redis then send the notification
    if(send_to_user){
        // console.log("here senf to user "+ send_to_user.socketId);
        socket.to(send_to_user.socketId).emit("getnotified",notification);
    }else{
      // mail
    }

    // save it to redis
    notificationOBJ={
      send_to:send_to,
      sent_by: await event_functions.getUserBySocketId(sent_by).username,
      notification:notification,
      date: new Date()
    };
    notification_functions.saveNotification(notificationOBJ);
    
    socket.emit("isChatSent", `chat sent to ${send_to}`);
}


exports.sendMassNotification = async (data)=>{
  const {send_to,sent_by, notification,socket} = data;

        // add all the farticipants to the room
        send_to.forEach(async (email)=>{
          if(event_functions.getUser(email)){
            console.log("Added to room "+event_functions.getUser(email).socketId);
            socket.to(event_functions.getUser(email).socketId).emit("getnotified",notification);
          }
        // save it to redis
        notificationOBJ={
          send_to:email,
          sent_by: await event_functions.getUserBySocketId(sent_by).username,
          notification:notification,
          date: new Date()
        };

        notification_functions.saveNotification(notificationOBJ);
        }
        )

        // console.log("here senf to user "+ send_to_user.socketId);
    socket.emit("isChatSent", `chat sent to ${send_to}`);
}

exports.getNotificationHistoryByEmail=async(socket_id, socket)=>{
  let redisHistory = await notification_functions.getNotificationsByRecieveEmail(await event_functions.getUserBySocketId(socket_id).username);
  socket.emit("notificationHistory", redisHistory);
}