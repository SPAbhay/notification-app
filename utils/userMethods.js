const redis_method = require("../redis/functions");

let onlineUsers;

redis_method.getValue("onlineUsers").then((data)=>{
    if (!data){
        redis_method.setKey("onlineUsers", JSON.stringify([]));
        onlineUsers=[];
    }else{
        onlineUsers = JSON.parse(data);
    }
});

const get_all_users =async ()=>{
  onlineUsers = JSON.parse(await redis_method.getValue("onlineUsers"));
  return onlineUsers;
}

// methods
const addNewUser = (username, socketId) => {
    let beenThere = false;
      onlineUsers.forEach(element => {
          if(element.username==username){
              element.socketId=socketId;
              beenThere=true;
          }
      });
    //   push new obj if username not found in reddis
      if(!beenThere){
      onlineUsers.push({ username, socketId });
      }
    
      redis_method.setKey("onlineUsers", JSON.stringify(onlineUsers));
  };
  
  const removeUserByEmail = (email) => {
    onlineUsers = onlineUsers.filter((user) => user.username !== email);
    redis_method.setKey("onlineUsers", JSON.stringify(onlineUsers));
  };
  
  const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
  };

  const getUserBySocketId = (socketId) => {
    return onlineUsers.find((user) => user.socketId === socketId);
  };


module.exports={
    addNewUser,
    removeUserByEmail,
    getUser,
    getUserBySocketId,
    get_all_users
}