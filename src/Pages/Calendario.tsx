import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.css';
import 'jquery-ui-dist/jquery-ui.js';
import './Calendar.css'; 
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
  const [data, setData] = useState<Apontamento[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); 
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

  const baseUrl = "https://api-apontamento.vercel.app"

  useEffect(() => {
    $("#datepicker").datepicker({
      onSelect: function (dateText) {
        setSelectedDate(dateText); 
      }
    });

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseUrl}/api/apontamento`,
          { headers: { Authorization: `Bearer ${token}` } });
        setData(response.data); 
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
      await axios.delete(`${baseUrl}/api/apontamento/${apontamento.id}`, config);
      const response = await axios.get(`${baseUrl}/api/apontamento`, config);
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
      await axios.put(`${baseUrl}/api/apontamento/${editApontamento.id}`, editFormData, config);
      setEditApontamento(null);
      setEditFormData({ data: '', entrada: '', saida: '', atividade: '' });
      onClose();
      const response = await axios.get(`${baseUrl}/apontamento`, config);
      setData(response.data);
    } catch (error) {
      console.error("Erro ao editar apontamento:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    const day = String(utcDate.getDate()).padStart(2, '0');
    const month = String(utcDate.getMonth() + 1).padStart(2, '0');
    const year = utcDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const filteredData = selectedDate ? data.filter(item => formatDate(item.data) === selectedDate) : [];

  return (
    <>
      <Center>
        <div className="calendar-container">
          <Box w="full" maxW="600px" textAlign="left">
            <div id="datepicker"></div>
          </Box>
          <Box w="full" maxW="600px" textAlign="left" className="table-container">
            {filteredData.length > 0 && (
              <Box>
                <Heading as="h2" size="md" mb={4}>Apontamentos</Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Data</Th>
                      <Th>Entrada</Th>
                      <Th>Saída</Th>
                      <Th>Atividade</Th>
                      <Th>Editar</Th>
                      <Th>Excluir</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredData.map((filteredItem) => (
                      <Tr key={filteredItem.id}>
                        <Td>{new Date(filteredItem.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</Td>
                        <Td>{filteredItem.entrada}</Td>
                        <Td>{filteredItem.saida}</Td>
                        <Td>{filteredItem.atividade}</Td>
                        <Td><Button size="sm" onClick={() => handleEditClick(filteredItem)} title="Edit">
                            <Icon as={FaEdit} />
                          </Button> </Td>
                        <Td>
                          <Button size="sm" onClick={() => deleteApontamento(filteredItem)} title="Delete" ml={2}>
                            <Icon as={FaTrash} />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </Box>
        </div>
      </Center>

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
