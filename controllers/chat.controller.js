const chatServices = require("../database/services/chat.services");

exports.getChatHistory = async(req,res)=>{
    try{
        const getData =await chatServices.findByRecieverEmail(req.user.email);
        return res.send({data:getData, msg:`chats by user ${req.user.email}`, err:""});
    }catch(err){
        console.log(err);
        return res.send({data:{}, msg:`something went wrong`, err:"something went wrong"});
    }
}