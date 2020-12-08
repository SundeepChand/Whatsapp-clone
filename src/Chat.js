import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic, Send } from '@material-ui/icons'
import './Chat.css'

function Chat() {
  const [seed, setSeed] = useState('')
  const [input, setInput] = useState('')

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()
    if (input.length <= 0)
      return
    console.log(input)
    setInput('')
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg?mood[]=happy`} />

        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
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
        <p className={`chat__message ${true && 'chat__receiver'}`}>
          <span className="chat__name">Sundeep</span>
          Hey guys
          <span className="chat__timestamp">3:52pm</span>
        </p>
        <p className="chat__message">Hey guys</p>
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
