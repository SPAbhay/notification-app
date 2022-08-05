import React from 'react'

export default function Button(props) {
const {type, id, name, onClick} = props

  return (
    //   destructuring
    <button id = {id} type={type} onClick={()=>{
      onClick()
    }}>{name}</button>
  )
}
