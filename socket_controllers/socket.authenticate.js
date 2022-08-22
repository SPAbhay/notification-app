const event_functions = require("../utils/userMethods");
var Jwt = require('jsonwebtoken');

exports.authenticateFunction = (data)=>{
        const {jwt, socket_id, socket} = data;
        Jwt.verify(jwt, '1234', async function(err, decoded) {
          if (err) socket.emit("auth_error", "JWT TOKEN is Invalid")
          if(decoded){
            event_functions.addNewUser(decoded.email, socket_id);
            console.log(await event_functions.get_all_users());
            
            socket.emit("user_server_connected", `${decoded.email} is connected with expiry ${decoded.exp}`)
          }
        });
}