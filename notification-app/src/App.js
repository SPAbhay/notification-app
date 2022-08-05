import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import { socket } from "./config";


export default function ClientComponent() {
  const [response, setResponse] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false)

  
  useEffect(() => {
    socket.on("hello", data => {
      setResponse(data);
    });

  }, []);


  return (
    <div>
      <p>
      It's <time dateTime={response}>{response}</time>
      </p>

      {loginSuccess?<div>
        {localStorage.getItem('user_jwt')}
        {socket.on("auth_error", data=>{console.log(data)})}
        {socket.on("user_server_connected", data=>{console.log(data)})}
        </div>:<Login loginStatus = {setLoginSuccess}></Login>}
      {}
    </div>
  );
}