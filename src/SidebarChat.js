import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'

function SidebarChat({ addNewChat }) {
  const [seed, setSeed] = useState('')

  const createChat = () => {
    const roomName = prompt("Please enter name for chat")

    if (roomName) {
      // do some clever stuff...
    }
  }

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])
  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg?mood[]=happy`} />
      <div className="sidebarChat__info">
        <h2>Room Name</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat
