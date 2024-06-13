import { Box, Button, Center, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, 
    FormControl,
    Input} from "@chakra-ui/react"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import React from "react"




const Apontamento = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)



    return (
        <>
        <Box padding={10}>
            <Center>
                <Button backgroundColor={"green"} onClick={onOpen}>
                    Realizar Apontamento
                </Button>
            </Center>
        </Box>
        <Box>
            <Center>
            <Calendar  />
            </Center>
            
        </Box>

        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
           <ModalOverlay />
           <ModalContent>
               <ModalHeader>Apontamento</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                   <FormControl>
                    <Input ref={initialRef} type="date" name="Data"  />
                   </FormControl>
                    <FormControl>
                    <Input  type="time" placeholder="Entrada" _placeholder={{ color: 'black' }} />
                    </FormControl>   
                    <FormControl>
                    <Input type="time" placeholder="Saída" _placeholder={{ color: 'black' }} />
                    </FormControl>
               </ModalBody>

               <ModalFooter>
                   <Button colorScheme='blue' mr={3}>
                       Salvar
                   </Button>
                   <Button onClick={onClose}>Cancelar</Button>
               </ModalFooter>
           </ModalContent>
        </Modal>
        </>
    )
}

export default Apontamento