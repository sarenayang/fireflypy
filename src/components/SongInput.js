import axios from 'axios';
import React, { useState } from 'react';

function SongInput() {

    const [title, setTitle] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        const data = { name: title }
        console.log(title)
        axios.post('http://localhost:8080/title_input', data)
        .then(res => console.log(res));
        e.target.reset()
        
    }
    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <form action='' onSubmit={handleSubmit}> 
                        <input type='text' id='namesong' onChange={e => setTitle(e.target.value)}/>
                        <button> submit </button>
                    </form>
                    
                </div>
            </div>
        </>
    );
    
}

export default SongInput