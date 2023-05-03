import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
    Button 
} from "@chakra-ui/react";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists/";

const SongPlaylists = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});
  const [playlistID, setID] = useState("");
  const [tracks, setTracks] = useState({});
  let flag = false;

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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSongs = (events) => {
    axios.get((PLAYLISTS_ENDPOINT + '7wViefD8fKvF59vD24g8Bi' + '/tracks'), {
        headers: {
          Authorization: "Bearer " + token,

        },
      })
    .then((response) => {
    setTracks(response.data);
    console.log(response.data)
    })
    .catch((error) => {
    console.log(error);
    });
  };

  return (
    <>
      <Button onClick={handleGetPlaylists}>Get Playlists</Button>
      {data?.items ? data.items.map((item, index) => <Button key={index} onClick={getSongs} value={item.id}>{item.id}</Button>) : null}
    </>
  );
};

export default SongPlaylists;