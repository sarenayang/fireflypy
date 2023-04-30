import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {levenshteinEditDistance} from 'levenshtein-edit-distance'

function SongInput() {

    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [answer, setAnswer] = useState({'guess': '', 'answer': 'Please make a guess.', 'title': ''})
    
    function handleSubmit(e) {
        e.preventDefault()
        const data = { name: title }
        console.log(title)
        axios.post('http://localhost:8080/title_input', data)
        .then((res) => {
            // JSON response is handled by a json() promises
            console.log(res.data);
            setAnswer(res.data)
       });
        e.target.reset()
    }

    const {
          transcript,
          listening,
          resetTranscript,
    } = useSpeechRecognition();
      

    const [value, setValue] = useState('');

    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <form action='' onSubmit={handleSubmit} method='post'> 
                        <label htmlFor='namesong'>Song Name </label>
                        <input type='text' id='namesong' onChange={e => setTitle(e.target.value)}/>
                        <br></br>
                        <label htmlFor='nameartist'>Artist Name </label>
                        <input type='text' id='nameartist' onChange={e => setArtist(e.target.value)}/>
                        <p>Microphone: {listening ? 'on' : 'off'}</p>
                        <button onClick={SpeechRecognition.startListening}>Start</button>
                        <button onClick={resetTranscript}>Reset</button>
                        <p>{transcript}</p> 
                        <button onClick={() => setTitle(transcript)}>Confirm</button>
                        <button> submit </button>
                    </form>
                </div>
                <div>
                    <h3>Your guess:</h3>
                    <p>{answer.guess}</p>
                    <h3>Correct answer:</h3>
                    <p>{answer.title}</p>
                    <p><i>{answer.answer}</i></p>
                </div>
            </div>
        </>
    );
    
};

export default SongInput;