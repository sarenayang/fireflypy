import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    List,
  } from '@chakra-ui/react'

  import {
    Button,
    Heading,
  } from '@chakra-ui/react'

  import {
    ListItem,
    OrderedList,
  } from '@chakra-ui/react'

function Instructions() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Button colorScheme='purple' variant='outline' onClick={onOpen}>How-to-play</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>How to Play</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <OrderedList>
                        <ListItem>Enable browser playback by going to the Spotify desktop app
                        and clicking on Spotify Connect button in the bottom right corner. Select the device "scoobity bop bop bop"
                        to begin browser playback.</ListItem>
                        <ListItem>Choose a playlist to start guessing songs from!</ListItem>
                        <ListItem>Enter your guesses for the song title and artist in the text boxes.</ListItem>
                        <ListItem>If using Microphone Input, please use the format "(Song Title) by (Artist)"</ListItem>
                        <ListItem>Click on the "Submit" button to submit your guesses.</ListItem>
                        <ListItem>If you guess both song and artist correctly, you will be awarded 2 points.
                        If you guess only one correctly, you will be awarded 1 point.</ListItem>
                        <ListItem>Click on the "Next" button to play the next song.</ListItem>
                    </OrderedList>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Instructions;