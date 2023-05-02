import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import {
    VStack,
    Heading,
    Text,
    Center,

} from '@chakra-ui/react'

function SongInput() {

    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [answer, setAnswer] = useState(
                    {'song_guess': '', 
                    'artist_guess': '',
                    'song_correct': '',
                    'artist_correct': '',
                    'song_answer': '',
                    'artist_answer': '' ,
                    'points': 0,
                    'already_guessed':  ''    
                    }
    )
    const [points, setPoints] = useState(0)
    
    // i think there's something wrong with resetting the answers, which messes with the points
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { name: title, artist: artist, points: points}
        axios.post('http://localhost:8080/title_input', data)
        .then((res) => {
            // JSON response is handled by a json() promises
            console.log(res.data)
            setAnswer(res.data)
            setPoints(res.data.points)
            
         });
    }

    const resetPoints = (event) => {
        event.preventDefault();
        setPoints(0)
    }

    return (
        <>
            
            <Container centerContent>
                <form onSubmit={handleSubmit} method='post'>
                    <FormControl>
                        <div>
                            <FormLabel>Song Name</FormLabel>
                            <Input htmlSize={20} width='auto' type='text' id='namesong' onChange={e => setTitle(e.currentTarget.value)}/>
                        </div>
                        <br></br>
                        <div>
                            <FormLabel>Artist Name</FormLabel>
                            <Input htmlSize={20} width='auto' type='text' id='nameartist' onChange={e => setArtist(e.currentTarget.value)}/>
                        </div>
                    </FormControl>
                    <Center>
                        <Button colorScheme='purple' variant='outline' m='4' type='submit'>Submit</Button>
                    </Center>
                    
                </form>
            </Container>
            <br></br>
            <Container>
                <VStack>
                    <Heading size='md'>Your Song and Artist Guess:</Heading>
                    <Text>{answer.song_guess} by {answer.artist_guess}</Text>
                    <Heading size='md'>Correct answer:</Heading>
                    <Text>{answer.song_correct} by {answer.artist_correct}</Text>
                    <Text><i>{answer.song_answer}</i></Text>
                    <Text><i>{answer.artist_answer}</i></Text>
                    <Text>{answer.already_guessed}</Text>

                    <Heading size='md'>Points: {points}</Heading>
                    <Button colorScheme='purple' variant='outline' onClick={resetPoints}>Reset Points</Button>
                </VStack>
            </Container>
                    
                
        </>
    );
    
}

export default SongInput