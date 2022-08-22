import React, { useState } from 'react'
import { socket } from '../config'


export default function MassNotificatin() {
    const [massNotificationData, SetMassNotificationData] = useState({send_to:[], sent_by:socket.id, notification:""});
    const [sendToUser, setSendToUser] = useState("");

    socket.on("massNotificationRecieve", data=>{
        console.log("massNotificationRecieve", data);
    }); 


    function handleSendMassNotification(){
      socket.emit("massNotification", massNotificationData);
    }

    function addSendTo(){
        SetMassNotificationData((prevValue)=>{
            return {...prevValue, send_to:[...prevValue.send_to, sendToUser]};
        })
        console.log("user added", massNotificationData);

    }

    function addNotification(e){
        SetMassNotificationData((prevValue)=>{
            return {...prevValue, notification:e.target.value};
        })
        console.log("notification added", massNotificationData);

    }

    function setInputSendToUser(e){
        return setSendToUser(e.target.value);
    };
  return (
    <div>
        <input id ='email' name = 'email' value = {sendToUser} placeholder='email' type = 'email' onChange={setInputSendToUser}></input>
        <input id = 'chat' name='chat' value = {massNotificationData.notification} placeholder = 'chat' type = 'text' onChange={addNotification}></input>
        <button id='text' type = 'submit' name = 'text'  onClick = {addSendTo}> add send to user</button>
        
        <button id='text' type = 'submit' name = 'text'  onClick = {handleSendMassNotification}> send mass notification</button>
    </div>
  )
}
