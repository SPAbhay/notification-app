const event_functions = require("../utils/methods");
var Jwt = require('jsonwebtoken');

exports.authenticateFunction = (data)=>{
        const {jwt, socket_id, socket} = data;
        console.log("jwt "+ jwt);
        console.log("socket_id "+ socket_id);
        Jwt.verify(jwt, '1234', function(err, decoded) {
          if (err) socket.emit("auth_error", "JWT TOKEN is Invalid")
          if(decoded){
            event_functions.addNewUser(decoded.email, socket_id);
            socket.emit("user_server_connected", `${decoded.email} is connected with expiry ${decoded.exp}`)
          }
        });
}