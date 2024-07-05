import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "./AppContext"; // Importe a função logout diretamente

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate("/");
    });
  };

  return (
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
          <Button ml={5} mb={2} onClick={handleLogout}>
            Sair
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
