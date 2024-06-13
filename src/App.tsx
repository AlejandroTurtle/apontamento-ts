import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Components/Layout'; 
import MainRoutes from './routex';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Layout>
            <MainRoutes />
        </Layout>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
