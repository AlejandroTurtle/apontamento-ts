import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Center, FormControl, Input, VStack, Text, Link  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';




const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState("");
  const navigate = useNavigate();

  const baseUrl = "https://api-apontamento.vercel.app"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/register`, {
        name,
        email,
        password,
      });
      navigate("/");
      console.log(response.data);
    } catch (error: any) {
      if (error.response.status === 400) {
        setEmailExists("Já existe um email igual a este cadastrado");
        alert("Já existe um email igual a este cadastrado");
      }
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh" backgroundColor={"#6da8e3"}>
        <Center>
          <form onSubmit={handleSubmit}>
          <FormControl borderColor="black" borderWidth={1} width="300px" padding="20px" borderRadius="5px" color={'black'} backgroundColor={'#3d638a'}>
            <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold" color={'black'}>Registro</Text>
            <Text alignSelf={"flex-start"} fontSize="xl">Nome Completo</Text>
              <Input 
                border={'2px'} borderColor={'#6da8e3'}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                required
              />
              <Text alignSelf={"flex-start"} fontSize="xl">Email</Text>
              <Input
                border={'2px'} borderColor={'#6da8e3'}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <Text alignSelf={"flex-start"} fontSize="xl">Senha</Text>
              <Input
                border={'2px'} borderColor={'#6da8e3'}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
              />
              <Button colorScheme="blue" type="submit">Cadastrar</Button>
              <Text>Já tem uma conta? <Link color="blue.500" href="/">Login</Link></Text>
              {emailExists && <Text color="red.500">{emailExists}</Text>}
            </VStack>
          </FormControl>
          </form>
        </Center>
      </Box>
    </>
  );
};

export default Register;
