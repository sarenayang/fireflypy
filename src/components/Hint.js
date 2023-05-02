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



function Hint(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        <Button colorScheme='purple' variant='outline' onClick={onOpen}>View hint</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Hint</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <img src={props.hint} alt="hint" />
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

export default Hint;