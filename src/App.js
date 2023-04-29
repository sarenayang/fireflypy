import React, { useState, useEffect } from 'react'
import { accessToken, logout, getCurrentUserProfile } from './Spotify';
import { catchErrors } from './utils';
import CurrentlyPlaying from './components/CurrentlyPlaying';
import SongInput from './components/SongInput';

function App() {

  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);

    };

    catchErrors(fetchData());
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
                {/* <SpotifyPlayer
                  token={token}
                  uris={['spotify:playlist:7wViefD8fKvF59vD24g8Bi']}
                /> */}
                <CurrentlyPlaying token={token} />
                <SongInput></SongInput>
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
    </div>
  )
}

export default App