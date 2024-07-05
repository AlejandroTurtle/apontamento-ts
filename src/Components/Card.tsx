import { Button, Flex, Icon, Tooltip, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Switch,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  useColorMode, } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { LuFileSpreadsheet } from "react-icons/lu";



export const Card = () => {


  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      flexDirection="column"
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      width="80px"
      backgroundColor="#2e343b"
      padding="4"
      overflowY="auto"

    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        flex="1"
      >
        <Tooltip placement="right">
          <Flex
            align="center"
            justify="center"
            w="100%"
            h="100px"
            cursor="pointer"
            color={"white"}
            mb="70" // Adiciona margem inferior para espaçamento
          >
            <Icon as={FaUser} boxSize={"50px"} />
          </Flex>
        </Tooltip>
        
        <Tooltip placement="right">
          <Flex
            align="center"
            justify="center"
            w="100%"
            h="100px"
            cursor="pointer"
            color={"white"}
            mb="70" // Adiciona margem inferior para espaçamento
          >
            <Icon as={LuFileSpreadsheet} boxSize={"50px"} />
          </Flex>
        </Tooltip>

        <Tooltip placement="right">
          <Flex
            align="center"
            justify="center"
            w="100%"
            h="100px"
            cursor="pointer"
            color={"white"}
            mb="70" // Adiciona margem inferior para espaçamento
          >
           <button onClick={onOpen}> <Icon as={IoSettingsSharp} boxSize={"50px"} /> </button>  
           {isOpen && (
              <Modal
              isOpen={isOpen}
              onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Settings</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                  <FormControl display='flex' alignItems='center'>
                  <FormLabel htmlFor='Tema' mb='0'>
                    Alterar tema
                    </FormLabel>
                    <Switch id='Tema' isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              )}
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
