import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Center,
} from '@chakra-ui/react'


import {
  useDisclosure,
} from '@chakra-ui/react'

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const SongPlaylists = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const [mood, setMood] = useState("");
  const [id, setID] = useState("");
  
  
  const ENDPOINT = "https://api.spotify.com/v1/playlists/"
  const playlistID = '64AZ6N0CHszdFVNwnat1ig'

  const handleSubmit = async (event) => {
      const data = { id: id, username: 'neap', token: token}
      await axios.post('http://localhost:8080/get_valence', data)
      .then((res) => {
          // JSON response is handled by a json() promises
          setMood(res.data)
          console.log(mood)
       });
  }


  return (
    <>
      <Button colorScheme='purple' variant='outline' onClick={handleGetPlaylists}>View Playlists</Button>
        {data?.items ? data.items.map((item) => 
        <Button onClick={async (event) =>  {await setID(item.id); await handleSubmit()}}>{item.name}</Button>) 
        : null}
      <Button colorScheme='cyan'>Happiness meter: {mood}</Button>
    </>
  );
};

export default SongPlaylists;