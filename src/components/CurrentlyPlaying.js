import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    ArrowLeftIcon,
    ArrowRightIcon,
} from '@chakra-ui/icons'
import {
    IconButton,
    Button,
    Container,
    Center,
    HStack,
} from '@chakra-ui/react'

import Hint from './Hint';

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function CurrentlyPlaying(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
    window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
            name: 'scoobity bop bop bop',
            getOAuthToken: cb => { cb(props.token); },
            volume: 0.85
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.addListener('player_state_changed', ( state => {

            if (!state) {
                return;
            }

            setTrack(state.track_window.current_track);
            setPaused(state.paused);
            console.log(state.track_window.current_track)

            axios.post('http://localhost:8080/add', state.track_window.current_track).then(
                function(response) {
                    // console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
            console.log(state.track_window.current_track.name + ',' + state.track_window.current_track.artists[0].name);

            player.getCurrentState().then( state => { 
                (!state)? setActive(false) : setActive(true) 
            });

        }));

        player.connect();

    };

    if (!is_active) { 
        return (
            <>
                <Container maxW='container.md' centerContent>
                    <div className="container">
                        <div className="main-wrapper">
                            <b> Instance not active. Transfer your playback using your Spotify app </b>
                        </div>
                    </div>
                </Container>
                
            </>)
    } else {
        return (
            <>
                <Container maxW='container.md' centerContent>
                    {/* <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" /> */}
                    <Hint hint={current_track.album.images[0].url}></Hint>
                        <div className="now-playing__side">
                            {/* <Center>
                                <div className="now-playing__name">{current_track.name}</div>
                            </Center>
                            <Center>
                                <div className="now-playing__artist">{current_track.artists[0].name}</div>
                            </Center> */}
                            <br></br>
                            <HStack>
                                <IconButton colorScheme='green' variant='outline' className='btn-spotify' icon={<ArrowLeftIcon />} onClick={() => { player.previousTrack() }} />
                                <Button className='btn-spotify' colorScheme='green' variant='outline' onClick={() => { player.togglePlay() }}> { is_paused ? "PLAY" : "PAUSE" } </Button>
                                <IconButton className='btn-spotify' colorScheme='green' variant='outline' icon={<ArrowRightIcon />} onClick={() => { player.nextTrack() }} />
                            </HStack>    
                        </div>
                </Container>
                        
            </>
        );
    }
}

export default CurrentlyPlaying