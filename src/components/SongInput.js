import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SongInput() {

    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [answer, setAnswer] = useState(
                    {'song_guess': '', 
                    'artist_guess': '',
                    'song_correct': '',
                    'artist_correct': '',
                    'song_answer': '',
                    'artist_answer': ''     
                    }
    )
    const [points, setPoints] = useState(0)
    
    function handleSubmit(e) {
        e.preventDefault()
        const data = { name: title, artist: artist}
        axios.post('http://localhost:8080/title_input', data)
        .then((res) => {
            // JSON response is handled by a json() promises
            setAnswer(res.data)
            if (answer.song_guess === answer.song_correct && answer.artist_guess === answer.artist_correct) {
                setPoints(points + 2)
            }
            else if (answer.song_guess === answer.song_correct || answer.artist_guess === answer.artist_correct) {
                setPoints(points + 1)
            }
       });
       

        e.target.reset()
    }
    

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
                        <button> submit </button>
                    </form>
                </div>
                <div>
                    <h3>Your Song and Artist Guess:</h3>
                    <p>{answer.song_guess} by {answer.artist_guess}</p>
                    <h3>Correct answer:</h3>
                    <p>{answer.song_correct} by {answer.artist_correct}</p>
                    <p><i>{answer.song_answer}</i></p>
                    <p><i>{answer.artist_answer}</i></p>
                </div>
                <div>
                    <h3>Points: {points}</h3>
                </div>
            </div>
        </>
    );
    
}

export default SongInput