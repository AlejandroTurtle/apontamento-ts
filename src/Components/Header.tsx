import { Box, Button, Center, Flex, Icon } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { changeLocalStorage } from '../services/storage'
import { AppContext } from '../Components/AppContext'
import { useContext, useEffect, useState } from "react";



export const Header = () => {
  const navigate = useNavigate();
  const { setisLoggedIn } = useContext(AppContext)
  const [userName, setUserName] = useState<string | null>(null)

  const logout = () => {
    changeLocalStorage({ login: false })
    setisLoggedIn(false)
    navigate("/")
}

useEffect(() => {
  const storedUserName = localStorage.getItem('userName');
  if (storedUserName) {
    setUserName(storedUserName);
  }
}, []);



  return (
    <>

    

    <Flex
      backgroundColor="#2e343b"
      color="white"
      padding="5px"
      justifyContent="flex-end"
      alignItems="center"
      height="100px"
    >
      <Box>
        <Box>
          <Icon as={FaBell} boxSize={10} mt={2} />
          <Button ml={5} mb={2} onClick={() => logout()}>
            Sair
          </Button>
        </Box>
      </Box>
    </Flex>
    { userName && <Center>
        <h1> Seja bem vindo {userName}</h1>
    </Center>
    }
    </>
  );
};
