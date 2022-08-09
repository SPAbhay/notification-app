exports.connectionFunction = (socket)=>{
    console.log('a user connected');
    socket.emit('hello', new Date())
}