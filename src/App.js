import React, { useState, useEffect } from 'react'
import { accessToken, logout, getCurrentUserProfile } from './Spotify';
import { catchErrors } from './utils';
import CurrentlyPlaying from './components/CurrentlyPlaying';
import SongInput from './components/SongInput';

import {
  Link,
  Button,
  Container,
  Center,
  Heading
} from '@chakra-ui/react'

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
    <>
      <div className="App">
        <header className="App-header">
        {!token ? (
            // <a className="App-link" href="http://127.0.0.1:8080/authorize">
            //   Log in to Spotify
            // </a>
            <Center>
              <Button colorScheme='green' m='400'>
                <Link href="http://127.0.0.1:8080/authorize">
                Log in to Spotify
                </Link>
              </Button>
              
            </Center>
            
          ) : (
                <>
                  <Container mt='100' centerContent> 
                    <Button onClick={logout}>Log Out</Button>
                  </Container>
                  <br></br>
                  
                  <CurrentlyPlaying token={token} />
                  <br></br>
                  <SongInput></SongInput>
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
                  
                </>
          )}
        </header>
      </div>
    </>
  )
}

export default App