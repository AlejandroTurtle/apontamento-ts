import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Box, Button, Center, FormControl, Input, VStack, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Components/AppContext';
import { changeLocalStorage } from "../services/storage";



const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailExists, setEmailExists] = useState('');
  const navigate = useNavigate();
  const { setisLoggedIn } = useContext(AppContext)

  const baseUrl = "https://api-apontamento.vercel.app"


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/login`, { email, password });
      const { token } = response.data;

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userName = decodedToken.name;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
      navigate('/apontamento');
      setisLoggedIn(true)
      changeLocalStorage({ login: true})
    } catch (error: any) {
        if (error.response.status === 404 || error.response.status === 401) {
          setEmailExists('Usuario ou senha incorreto');
          alert("Usuario ou senha incorreto");
        }
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" backgroundColor={"#6da8e3"}>
      <Center>
        <form onSubmit={handleSubmit}>
          <FormControl  borderColor="black" borderWidth={1} width="300px" padding="20px" borderRadius="5px" color={'black'} backgroundColor={'#3d638a'}> 
            <VStack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color={'black'}>Login</Text>
              <Text fontSize="lg">Digite seu email</Text>
              <Input border={'2px'} borderColor={'#6da8e3'} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
              <Text  fontSize="lg">Digite sua senha</Text>
              <Input border={'2px'} borderColor={'#6da8e3'} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
              <Button colorScheme="blue" type="submit">Entrar</Button>
              <Text>Ainda não tem uma conta? <Link color="blue.500" href="/register">Registrar</Link></Text>
              {emailExists &&  <Text color="red">{emailExists}s</Text>}
            </VStack>
          </FormControl>
        </form>
      </Center>
    </Box>
  );
};

export default Login;
