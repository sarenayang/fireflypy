import React, { useState, useEffect } from 'react'
import { accessToken, logout, getCurrentUserProfile } from './Spotify';
import { catchErrors } from './utils';
import CurrentlyPlaying from './components/CurrentlyPlaying';
import SongInput from './components/SongInput';
import Instructions from './components/Instructions';

import {
  Link,
  Button,
  Container,
  Center,
  Heading,
  HStack,
  VStack
} from '@chakra-ui/react'

import { Select } from "@chakra-ui/react"
import ViewPlaylists from './components/ViewPlaylists';


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

  const [inputMethod, setInputMethod] = useState('keyboard');
  const handleSelectChange = (event) => {
    setInputMethod(event.target.value);
  };


  
  return (
    <>
      <div className="App">
        <header className="App-header">
        {!token ? (
            // <a className="App-link" href="http://127.0.0.1:8080/authorize">
            //   Log in to Spotify
            // </a>
            <Center>
              <VStack>
                <Heading mt='20%' size='lg'>Welcome to Firefly, the Spotify Guessing Game!</Heading>
                <Button mt='10%' colorScheme='green'>
                  <Link href="http://127.0.0.1:8080/authorize">
                  Log in to Spotify
                  </Link>
                </Button>
              </VStack>
              
              
            </Center>
            
          ) : (
                <>
                  <Container mt='0.5%' centerContent> 
                    <Button colorScheme='purple' variant='outline' onClick={logout}>Log Out</Button>
                  </Container>
                  <Container mt='1%' centerContent>
                    <Instructions></Instructions>
                    <br></br>
                    <Select htmlSize={20} width='auto' onChange={handleSelectChange}>
                      {console.log(inputMethod)}
                      <option value="keyboard">Keyboard Input</option>
                      <option value="microphone">Microphone Input</option>
                    </Select>
                  </Container>
                  <br></br>
                  <HStack>
                    <CurrentlyPlaying token={token} />
                    <br></br>
                    <SongInput inputMethod={inputMethod}></SongInput>
                  </HStack>
                  
                  <br></br>
                  <Center>
                    <Heading size='sm'>Profile: </Heading>
                    {profile && (
                      <div>
                        <Heading size='sm'>{profile.display_name}</Heading>
                        <p>{profile.followers.total} Followers</p>
                        {/* {profile.images.length && profile.images[0].url && (
                          <img src={profile.images[0].url} alt="Avatar"/>
                        )} */}
                      </div>
                    )}
                  </Center>
                  <br></br>
                  <Center>
                    <ViewPlaylists></ViewPlaylists>
                  </Center>
                </>
          )}
        </header>
      </div>
    </>
  )
}

export default App