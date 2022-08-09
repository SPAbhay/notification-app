import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { socket } from '../config'

export default function ChatPage() {
  const [chatDetails, setChatDetails] = useState({"email":"", "chat":""});
  
  function handleClick(){
      socket.emit("send_notification", {send_to:chatDetails.email, sent_by:socket.id, notification:chatDetails.chat});
  }

  socket.on("getnotified", data=>{
    console.log(data);
    });

  socket.on("isChatSent", data=>{
        console.log("chat sent");
    }); 

  return (
    <div>
        
       
        
        <Input id ='email' name = 'email' value = {chatDetails.email} placeholder='email' type = 'email' setLoginDetails= {setChatDetails}></Input>
        <Input id = 'chat' name='chat' value = {chatDetails.chat} placeholder = 'chat' type = 'text' setLoginDetails = {setChatDetails}></Input>
        <Button id='text' type = 'submit' name = 'text'  onClick = {handleClick}></Button>
    </div>
  )
}
