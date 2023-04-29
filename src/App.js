import React, { useState, useEffect } from 'react'
import { accessToken, logout, getCurrentUserProfile } from './Spotify';
import { catchErrors } from './utils';
<<<<<<< HEAD
import CurrentlyPlaying from './components/CurrentlyPlaying';
import SongInput from './components/SongInput';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebPlayback from './pages/WebPlayback';
import Dictaphone from './components/Dictaphone';

// import useToken from './components/useToken'
>>>>>>> ur message here

function App() {

  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);

    };
    // const fetchAnswer = async () => {
    //   const { ans } = await fetch('http://localhost:8080/input_title');
    //   setAnswer(ans);
    // };

    catchErrors(fetchData());
    // catchErrors(fetchAnswer());
  }, []);


  
  return (
    <div className="App">
      <header className="App-header">
      {!token ? (
          <a className="App-link" href="http://127.0.0.1:8080/authorize">
            Log in to Spotify
          </a>
        ) : (
                <>
                <button onClick={logout}>Log Out</button>
<<<<<<< HEAD
                {/* <SpotifyPlayer
                  token={token}
                  uris={['spotify:playlist:7wViefD8fKvF59vD24g8Bi']}
                /> */}
                <CurrentlyPlaying token={token} />
                <SongInput></SongInput>
=======
                <Dictaphone />
>>>>>>> fixed dictaphone load page
                <br></br>
                {profile && (
                  <div>
                    <h1>{profile.display_name}</h1>
                    <p>{profile.followers.total} Followers</p>
                    {profile.images.length && profile.images[0].url && (
                      <img src={profile.images[0].url} alt="Avatar"/>
                    )}
                  </div>
                )}
              </>
        )}
      </header>
      <div>
       
      </div>
    </div>
  )
}

export default App