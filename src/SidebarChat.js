import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'

import './SidebarChat.css'
import db from './firebase'

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState('')
  const [messages, setMessages] = useState('')

  const createChat = () => {
    const roomName = prompt("Please enter name for chat")

    if (roomName) {
      db.collection('rooms').add({
        name: roomName,
      })
    }
  }

  useEffect(() => {
    if (id) {
      db
        .collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('added', 'desc')
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }
  }, [id])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg?mood[]=happy`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{ messages.length > 0 ? messages[0].message : '' }</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat
