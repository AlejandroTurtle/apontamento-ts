import React, { useState } from "react";
import Calendario from "./Calendario";
import {
  Box,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  data: string;
  entrada: string;
  saida: string;
  atividade: string;
}

const Apontamento: React.FC = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm<FormValues>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef<HTMLInputElement | null>(null);
  const finalRef = React.useRef<HTMLInputElement | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [apontamentoExists, setApontamentoExists] = useState("");

  const validaSaida = (value: string) => {
    const { entrada } = getValues();
    if (value <= entrada) {
      return "Saída deve ser maior que a entrada";
    }
    return true;
  };

  const validaHora = (value: string) => {
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours();
    const minutoAtual = dataAtual.getMinutes();

    const [entradaHora, entradaMinuto] = value.split(":").map(Number);

    if (entradaHora > horaAtual || (entradaHora === horaAtual && entradaMinuto > minutoAtual)) {
      return "A hora deve ser menor que a hora atual";
    }
    return true;
  };

  const validaEntrada = (value: string) => {
    const { data } = getValues();

    const [anoSelecionado, mesSelecionado, diaSelecionado] = data.split("-").map(Number);
    const dataSelecionada = new Date(anoSelecionado, mesSelecionado - 1, diaSelecionado);

    const dataAtual = new Date();
    const dataAtualZerada = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());

    if (dataSelecionada.getTime() < dataAtualZerada.getTime()) {
      return true;
    } else if (dataSelecionada.getTime() === dataAtualZerada.getTime()) {
      return validaHora(value);
    }
  };

  const validaData = (value: string) => {
    const data = new Date(value);
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    if (data > dataAtual) {
      return "Não é possível apontar para datas futuras";
    }
    return true;
  };

  const onSubmit: SubmitHandler<FormValues> = async (forma) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.post("http://localhost:5000/api/apontamento", forma, config);
      setRefresh(prev => !prev); // Atualiza o estado para forçar a atualização do Calendario
      onClose();
      reset();
    } catch (error: any) {
      if (error.response.status === 400) {
        setApontamentoExists(error.response.data.message);
        notify();
      }
      console.error("Erro ao enviar dados:", error);
    }
  };

  const notify = () => toast.error(apontamentoExists);

  return (
    <>
      <Box padding={10}>
        <Center>
          <Button backgroundColor={"green"} onClick={() => { setOverlay(<OverlayOne />); onOpen(); }}>
            Realizar Apontamento
          </Button>
        </Center>
      </Box>
      <Center>
        <Box w="full" maxW="1200px" textAlign="left">
          <Calendario refresh={refresh} />
        </Box>
      </Center>

      {isOpen && (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          {overlay}
          <ModalContent>
            <ModalHeader>Apontamento</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.data} isRequired>
                  <FormLabel>Data</FormLabel>
                  <Input type="date" {...register("data", { required: "Campo obrigatório", validate: validaData })} />
                  <FormErrorMessage>
                    {errors.data && errors.data.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.entrada} isRequired>
                  <FormLabel>Entrada</FormLabel>
                  <Input type="time" placeholder="entrada" {...register("entrada", { required: "Campo obrigatório", validate: validaEntrada })} />
                  <FormErrorMessage>
                    {errors.entrada && errors.entrada.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.saida} isRequired>
                  <FormLabel>Saída</FormLabel>
                  <Input type="time" placeholder="saída" {...register("saida", { required: "Campo obrigatório", validate: validaSaida })} />
                  <FormErrorMessage>
                    {errors.saida && errors.saida.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.atividade} isRequired>
                  <FormLabel>Atividade</FormLabel>
                  <Textarea placeholder="Atividade" {...register("atividade", { required: "Campo obrigatório" })} />
                  <FormErrorMessage>
                    {errors.atividade && errors.atividade.message}
                  </FormErrorMessage>
                </FormControl>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} type="submit">
                    Salvar
                  </Button>
                  <Button onClick={() => { onClose(); reset(); }} type="button">Cancelar</Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <ToastContainer />
    </>
  );
}

export default Apontamento;
