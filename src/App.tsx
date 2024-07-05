
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from './Components/Layout';
import MainRoutes from './routex';
import Login from './Pages/Login';
import Register from './Pages/Register';
import theme from './Theme';



function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>         
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />    
          <Route
            path="*"
            element={
              <Layout>
                <MainRoutes />
              </Layout>
            }
          />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
