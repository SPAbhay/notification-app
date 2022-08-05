import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import { live, endpoints,socket } from '../config'

export default function Login(props) {
  const {loginStatus} = props
  const [loginDetails, setLoginDetails] = useState({"email":"", "OTP":""})


  function handleClick(){
    axios.post(live.base_url+endpoints.login,{"email":loginDetails.email, "OTP":loginDetails.OTP}).then((response)=>{
      if(response.status==200){
        if(response.data.message==="202"){
          console.log("login success")
          loginStatus(true)
          localStorage.setItem('user_jwt', response.data.data.access_token)
          socket.emit("set name", {jwt:response.data.data.access_token, socket_id:socket.id})
        }
      }
    }).catch(
      (err)=>{
        console.log(err)
      }
    )
  }
  return (

    <div>
        <Input id = 'email' name='email' value={loginDetails.email} placeholder='email' type='email' setLoginDetails={setLoginDetails}></Input>
        <Input id = 'password' name='OTP' value={loginDetails.OTP} placeholder='password' type ='password' setLoginDetails={setLoginDetails}></Input>
        <Button id = 'login' type='submit' name='login' onClick = {handleClick}></Button>
    </div>
  )
}
