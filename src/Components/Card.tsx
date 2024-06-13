import { Flex, Icon, Tooltip } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { LuFileSpreadsheet } from "react-icons/lu";

export const Card = () => {
  return (
    <Flex
      flexDirection="column"
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      width="80px"
      backgroundColor="gray"
      padding="4"
      overflowY="auto"
      transition="width 0.3s ease-in-out"
      _hover={{ width: "200px" }}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        flex="1"
      >
        <Tooltip label="Profile" placement="right">
          <Flex
            align="center"
            justify="center"
            w="100%"
            h="100px"
            cursor="pointer"
            _hover={{ bg: "white" }}
            mb="70" // Adiciona margem inferior para espaçamento
          >
            <Icon as={FaUser} boxSize={"50px"} />
          </Flex>
        </Tooltip>
        <Tooltip label="Spreadsheet" placement="right">
          <Flex
            align="center"
            justify="center"
            w="100%"
            h="100px"
            cursor="pointer"
            _hover={{ bg: "white" }}
            mb="70" // Adiciona margem inferior para espaçamento
          >
            <Icon as={LuFileSpreadsheet} boxSize={"50px"} />
          </Flex>
        </Tooltip>
        <Tooltip label="Settings" placement="right">
          <Flex
            align="center"
            justify="center"
            w="100%"
            h="100px"
            cursor="pointer"
            _hover={{ bg: "white" }}
            mb="70" // Adiciona margem inferior para espaçamento
          >
            <Icon as={IoSettingsSharp} boxSize={"50px"} />
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
