import React from 'react'

export default function Input(props) {
// destructuring
    const {id ,name, value, placeholder, type, setLoginDetails} = props
  return (
    <input id={id} name={name} placeholder={placeholder} value = {value} type={type} onChange={(e)=>{
      const value = e.target.value
      if(name==="email"){
        setLoginDetails((prevValue)=>{
          return {...prevValue, email:value}
        })
      }

      else if(name==="OTP"){
        setLoginDetails((prevValue)=>{
          return {...prevValue, OTP:value}
        })
      }

      else if(name == "chat"){
        setLoginDetails((prevValue)=>{
          return {...prevValue, chat:value}
        })
      }
    }}></input>
  )
}
