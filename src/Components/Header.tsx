import { Box, Button, Flex, Icon } from "@chakra-ui/react"
import { FaBell } from "react-icons/fa"


export const Header = () => {
    return (
        <Flex
        backgroundColor="gray" // Define a cor de fundo do contêiner Flex como cinza
        color="#0a39ab" // Define a cor do texto como um azul específico
        padding="5px" // Adiciona um padding (espaçamento interno) de 5 pixels ao redor do contêiner
        justifyContent="flex-end" // Alinha os itens no final do contêiner Flex (lado direito)
        alignItems="center" // Alinha os itens verticalmente ao centro dentro do contêiner Flex
        height="100px" // Define a altura do contêiner Flex como 100 pixels para ocupar toda a parte superior
      >
        <Box color="white" >
        <Box w="auto" h="auto" p={2} >
          <Icon as={FaBell} boxSize={10} mt={2} />
          <Button ml={5} mb={2}>
            Sair
          </Button>
        </Box>
      </Box>
      </Flex>
    )
}