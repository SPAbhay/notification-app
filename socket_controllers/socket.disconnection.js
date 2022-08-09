const event_functions = require("../utils/methods");

exports.disconnectionFunction = ()=>{
    event_functions.removeUser();
    console.log('user disconnected');
}