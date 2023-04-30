import React, { useEffect, useState } from "react";
import axios from "axios";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const SongPlaylists = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});
  const [playlistID, setID] = useState("");
  const [tracks, setTracks] = useState({});

  useEffect(() => {
    if (localStorage.getItem("spotify_access_token")) {
      setToken(localStorage.getItem("spotify_access_token"));
    }
  }, []);

  const handleGetPlaylists = () => {
    axios
      .get(PLAYLISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSongs = () => {
    axios.get((PLAYLISTS_ENDPOINT + playlistID + '/tracks'), {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
    .then((response) => {
    setTracks(response.data);
    })
    .catch((error) => {
    console.log(error);
    });
  };

  return (
    <>
      <button onClick={handleGetPlaylists}>Get Playlists</button>
      {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
    </>
  );
};

export default SongPlaylists;