import React, { useState } from 'react'
import { Button } from '@material-ui/core'

import './Login.css'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

function Login() {
  const [{}, dispatch] = useStateValue()

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch(error => {
        alert(error.message)
      })
  }

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png" alt="">
        </img>

        <div className="login__text">
          <h1>Sign In to Whatsapp</h1>
        </div>

        <Button onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  )
}

export default Login
