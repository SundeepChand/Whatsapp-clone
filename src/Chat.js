import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic, Send } from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import firebase from 'firebase'

import './Chat.css'
import db from './firebase'
import userEvent from '@testing-library/user-event'
import { useStateValue } from './StateProvider'

function Chat() {
  const [seed, setSeed] = useState('')
  const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState([])
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
        setRoomName(snapshot.data().name)
        setSeed(Math.floor(Math.random() * 5000))
      })

      db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('added', 'asc')
        .onSnapshot(snapshot => {
          setMessages( snapshot.docs.map(doc => doc.data()) )
        })
    }
  }, [roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()
    if (input.length <= 0)
      return

    db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add({
        message: input,
        name: user.displayName,
        added: firebase.firestore.FieldValue.serverTimestamp(),
      })

    setInput('')
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg?mood[]=happy`} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            {
              messages.length > 0 ?
                'last sent ' + new Date(messages[messages.length - 1]?.added?.toDate()).toUTCString()
                : 'No messages'
            }
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {
          messages.map(message => (
            <p className={`chat__message ${user.displayName === message.name && 'chat__receiver'}`} key={message.added}>
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                { new Date(message.added?.toDate()).toUTCString()}
              </span>
            </p>
          ))
        }
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>

        <form onSubmit={sendMessage}>
          <input value={input} onChange={(e) => {setInput(e.target.value)}} type="text" placeholder="Type your message" />
          <IconButton type="submit">
            <Send />
          </IconButton>
        </form>

        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
