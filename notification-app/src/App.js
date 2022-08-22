import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import { socket } from "./config";
import ChatPage from "./pages/ChatPage";
import MassNotificatin from "./pages/MassNotificatin";
import {endpoints, live} from './config';
import axios from 'axios'


export default function ClientComponent() {
  const [response, setResponse] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false)
  const[notificationHistory, setNotificationHistory] = useState([])

  
  useEffect(() => {
    socket.on("hello", data => {
      setResponse(data);
    });

  }, []);

  function getNotificationHistory(){
    socket.emit("getNotificationHistory", socket.id);
  }

  socket.on("notificationHistory", (data)=>{
    setNotificationHistory(data);
    console.log(data);
  })


  function getChatHistoryFromServer(){
    axios.get(live.redis_server_base_url+endpoints.getChats, {
      headers: {
        'jwt': localStorage.getItem('user_jwt')
      }}).then((response)=>{
      if(response.status==200){
          console.log(response)
      }
    }).catch(
      (err)=>{
        console.log(err)
      }
    )
  }

  return (
    <div>
      <p>
      It's <time dateTime={response}>{response}</time>
      </p>

      {loginSuccess?<div>
        <button onClick={getNotificationHistory}>get history</button>

        {localStorage.getItem('user_jwt')}
        {/* {socket.on("auth_error", data=>{console.log(data)})}
        {socket.on("user_server_connected", data=>{console.log(data)})} */}
        <ChatPage></ChatPage>
        <MassNotificatin></MassNotificatin>
        <button onClick={getChatHistoryFromServer}>chat history from mongo</button>
        </div>:<Login loginStatus = {setLoginSuccess}></Login>}
      {}

    </div>
  );
}