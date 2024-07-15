import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.css';
import 'jquery-ui-dist/jquery-ui.js';
import './Calendar.css'; // Estilos personalizados aqui
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Icon,
} from '@chakra-ui/react';
import axios from 'axios';
import { FaEdit, FaTrash } from "react-icons/fa";



interface CalendarioProps {
  refresh: boolean;
}

interface Apontamento {
  id: number;
  data: string;
  entrada: string;
  saida: string;
  atividade: string;
}

const Calendario: React.FC<CalendarioProps> = ({ refresh }) => {
  const [data, setData] = useState<Apontamento[]>([]); // Inicializa com um array vazio
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Estado para a data selecionada
  const [editApontamento, setEditApontamento] = useState<Apontamento | null>(null);
  const [editFormData, setEditFormData] = useState<{ data: string; entrada: string; saida: string; atividade: string }>({
    data: '',
    entrada: '',
    saida: '',
    atividade: ''
  });
  const initialRef = React.useRef<HTMLInputElement | null>(null);
  const finalRef = React.useRef<HTMLInputElement | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Configuração do datepicker usando jQuery
    $("#datepicker").datepicker({
      onSelect: function (dateText) {
        setSelectedDate(dateText); // Atualiza a data selecionada
      }
    });

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:5000/api/apontamento',
          { headers: { Authorization: `Bearer ${token}` } });
        setData(response.data); // Define os dados recebidos do servidor
      } catch (error) {
        console.error("Houve um erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleEditClick = (apontamento: Apontamento) => {
    setEditApontamento(apontamento);
    setEditFormData({
      data: apontamento.data,
      entrada: apontamento.entrada,
      saida: apontamento.saida,
      atividade: apontamento.atividade
    });
    onOpen();
  };

  const deleteApontamento  = async (apontamento: Apontamento) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.delete(`http://localhost:5000/api/apontamento/${apontamento.id}`, config);
      // Recarregar os dados após a exclusão
      const response = await axios.get('http://localhost:5000/api/apontamento', config);
      setData(response.data);
    } catch (error) {
      console.error("Erro ao excluir apontamento:", error);
    }
  };


  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editApontamento) return;
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.put(`http://localhost:5000/api/apontamento/${editApontamento.id}`, editFormData, config);
      setEditApontamento(null);
      setEditFormData({ data: '', entrada: '', saida: '', atividade: '' });
      onClose();
      // Recarregar os dados após a edição
      const response = await axios.get('http://localhost:5000/api/apontamento', config);
      setData(response.data);
    } catch (error) {
      console.error("Erro ao editar apontamento:", error);
    }
  };

  // Função para formatar a data no mesmo formato usado no datepicker (MM/DD/YYYY)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const day = String(utcDate.getDate()).padStart(2, '0');
    const month = String(utcDate.getMonth() + 1).padStart(2, '0');
    const year = utcDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Filtra os apontamentos de acordo com a data selecionada
  const filteredData = selectedDate ? data.filter(item => formatDate(item.data) === selectedDate) : [];

  return (
    <>
      <Center>
        {filteredData.length > 0 && (
          <Card>
            <CardHeader>
              <Heading size="md">Apontamento</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="7">
                {filteredData.map((filteredItem) => (
                  <Box
                    key={filteredItem.id}
                    display="flex"
                    alignItems="center"
                    gap="2"
                  >
                    <Text>
                      {filteredItem.atividade} -{" "}  {new Date(filteredItem.data).toLocaleDateString("pt-BR", {timeZone: "UTC",})}{" "}
                      - {filteredItem.entrada} - {filteredItem.saida}
                    </Text>
                    <button
                      onClick={() => handleEditClick(filteredItem)}
                      title="Edit"
                    > <Icon as={FaEdit} />
                    </button>
                    <button   onClick={() => deleteApontamento(filteredItem)} title="Delete"> <Icon as={FaTrash} /> </button>
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>
        )}
      </Center>
      <Center>
        <p id="texto"></p>
      </Center>
      <div className="calendar-container">
        <Center>
          <Box w="full" maxW="1200px" textAlign="left">
            <h1>Apontamentos</h1>
          </Box>
        </Center>
        <Center>
          <Box w="full" maxW="1200px" textAlign="left">
            <div id="datepicker"></div>
          </Box>
        </Center>
      </div>

      {isOpen && (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Apontamento</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleEditFormSubmit}>
                <FormControl>
                  <FormLabel>Data</FormLabel>
                  <Input
                    ref={initialRef}
                    name="data"
                    type="date"
                    value={editFormData.data}
                    onChange={handleEditFormChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Entrada</FormLabel>
                  <Input
                    name="entrada"
                    type="time"
                    value={editFormData.entrada}
                    onChange={handleEditFormChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Saída</FormLabel>
                  <Input
                    name="saida"
                    type="time"
                    value={editFormData.saida}
                    onChange={handleEditFormChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Atividade</FormLabel>
                  <Textarea
                    name="atividade"
                    value={editFormData.atividade}
                    onChange={handleEditFormChange}
                  />
                </FormControl>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} type="submit">
                    Salvar
                  </Button>
                  <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Calendario;
