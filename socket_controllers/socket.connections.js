const event_functions = require("../utils/userMethods");

exports.connectionFunction = (socket)=>{
    console.log('a user connected');
    socket.emit('hello', new Date())
}