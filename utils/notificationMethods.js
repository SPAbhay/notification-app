const ChatService = require("../database/services/chat.services");
const redis_method = require("../redis/functions");

/**
 * struncture of chat 
 * users_notifications = {
 *  
 *      {
 *          send_to: user2,
 *          send_by: user1,
 *          notification:xyz,
 *          date: 12-29-2000
 *      },
 *  
 *  
 *      {
 *          send_to:user2,
 *          send_by:user1,
 *          notification:xyz,
 *          date: 12-29-2000
 *      }
 *  
 * 
 **/ 


const getAllNotifications = async()=>{
    let notifications = await redis_method.getValue("users_notifications");
    if (!notifications){
        notifications = [];
        redis_method.setKey("users_notifications", JSON.stringify([]));
    }
    return JSON.parse(notifications);
}


const saveNotification = async (notificationOBJ)=>{
    let allNotifications = await getAllNotifications();
    allNotifications.push(notificationOBJ);

    redis_method.setKey("users_notifications", JSON.stringify(allNotifications));
    console.log(await getAllNotifications())

    console.log(allNotifications.length)
    if(allNotifications.length>5){
        allNotifications.forEach(async e=>{
            ChatService.create(e);
        })

        redis_method.setKey("users_notifications", JSON.stringify([]));

    }
}

const getNotificationsBySenderEmail = async(senderEmail)=>{
    let allNotifications = getAllNotifications();
    return allNotifications.filter((notification)=>notification.send_by === senderEmail);
}

const getNotificationsByRecieveEmail = async(recieverEmail)=>{
    let allNotifications = await getAllNotifications();
    return allNotifications.filter((notification)=>notification.send_to === recieverEmail);
}

const deleteNotificationsBySenderEmail = async(senderEmail)=>{
    let allNotifications = getAllNotifications();
    allNotifications = allNotifications.filter((notification)=>notification.send_by != senderEmail);
    redis_method.setKey("users_notifications", JSON.stringify(allNotifications));
}

const deleteNotificationsByRecieveEmail = async(recieverEmail)=>{
    let allNotifications = getAllNotifications();
    allNotifications = allNotifications.filter((notification)=>notification.send_to != recieverEmail);
    redis_method.setKey("users_notifications", JSON.stringify(allNotifications));
}

const deleteAllNotification = async()=>{
    await redis_method.setKey("users_notifications", JSON.stringify([]));
}
module.exports={
    getAllNotifications,
    saveNotification,
    deleteNotificationsByRecieveEmail,
    deleteNotificationsBySenderEmail,
    getNotificationsByRecieveEmail,
    getNotificationsBySenderEmail
}
