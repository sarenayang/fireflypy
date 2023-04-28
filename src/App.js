import React, { useState, useEffect } from 'react'
import { accessToken, logout, getCurrentUserProfile, getCurrentUserPlayingTrack } from './Spotify';
import { catchErrors } from './utils';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SpotifyPlayer from 'react-spotify-web-playback';
import CurrentlyPlaying from './pages/CurrentlyPlaying';

function App() {

  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  // const [playingTrack, setPlayingTrack] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      // const { data: currentlyPlayingTrack } = await getCurrentUserPlayingTrack();
      // setPlayingTrack(currentlyPlayingTrack);
    };

    catchErrors(fetchData());
  }, []);
  // console.log(playingTrack)


  
  return (
    <div className="App">
      {/* <GlobalStyle /> */}
      <header className="App-header">
      {!token ? (
          <a className="App-link" href="http://127.0.0.1:8080/authorize">
            Log in to Spotify
          </a>
        ) : (
          <Router>
            <Routes>
              <Route path="/player" element={
                <h1>player</h1>
              } />
              <Route path="/top-artists" element={
                <h1>Top Artists</h1>
              } />
              <Route path="/top-tracks" element={
                <h1>Top Tracks</h1>
              }/>
              <Route path="/playlists/:id" element={
                <h1>Playlist</h1>
              } />
              <Route path="/playlists" element={
                <h1>Playlists</h1>
              } />
              <Route path="/" element={
                <>
                <button onClick={logout}>Log Out</button>
                {/* <SpotifyPlayer
                  token={token}
                  uris={['spotify:playlist:7wViefD8fKvF59vD24g8Bi']}
                /> */}
                <CurrentlyPlaying token={token} />
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
              } />
            </Routes>
          </Router>
        )}
      </header>
    </div>
  )
}

export default App