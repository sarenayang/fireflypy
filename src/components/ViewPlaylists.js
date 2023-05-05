import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'

  import {
    Button,
    Heading,
  } from '@chakra-ui/react'

  import {
    ListItem,
    OrderedList,
  } from '@chakra-ui/react'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SongPlaylists from './SongPlaylists'

function ViewPlaylists() {
    const { isOpen, onOpen, onClose } = useDisclosure()



    return (
        <>
        <Button colorScheme='purple' variant='outline' onClick={onOpen}>Playlist Mood Meter</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Mood Meter</ModalHeader>
                <ModalCloseButton />
                <SongPlaylists></SongPlaylists>
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

export default ViewPlaylists;