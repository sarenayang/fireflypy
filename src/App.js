import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch('/currently_playing').then(
      response => response.text(),
      console.log("hello")
    ).then(
      data => { 
        console.log('hello2u')
        setData(data)
        console.log(data)
      }
    )
  }, [])
  return (
    <div>
      {(typeof data.name === 'undefined') ? (
            <p>loading...</p>  ) : (
            <p>{data.name}</p>
        )
      }
    </div>
  )
}

export default App