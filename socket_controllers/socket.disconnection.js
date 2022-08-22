const event_functions = require("../utils/userMethods");

exports.disconnectionFunction = async (socket_id)=>{
    const get_user = event_functions.getUserBySocketId(socket_id);
    if (get_user){
        event_functions.removeUserByEmail(get_user.username);
    }
    console.log(await event_functions.get_all_users());
    console.log('user disconnected');
}