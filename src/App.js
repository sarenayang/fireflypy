import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './components/Login'
// import useToken from './components/useToken'

function App() {

  const [token, setToken] = useState([{}])

  useEffect(() => {
    fetch('http://127.0.0.1:8080/callback').then(
      response => response.text(),
      console.log("hello")
    ).then(
      data => { 
        console.log('hello2u')
        setToken(data.access_token)
        console.log(data)
      }
    )
  }, [])

  console.log(token)
  
  return (
    <div>
      {/* {!token && token !=="" && token !== undefined? (
         <a href='http://127.0.0.1:8080/accesstoken'>Log in to Spotify</a>
        ) : (
          <p>logged in</p>
        )
      } */}
      <a href='http://127.0.0.1:8080/authorize'>Log in to Spotify</a>
    </div>
  )
}

export default App