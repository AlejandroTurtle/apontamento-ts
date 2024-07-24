import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MainRoutes from './routex';
import Login from './Pages/Login';
import Register from './Pages/Register';
import theme from './Theme';
import { AppContextProvider } from './Components/AppContext';
import { createLocalStorage, getAllLocalStorage } from "./services/storage";

function App() {
  !getAllLocalStorage && createLocalStorage();

  return (
    <BrowserRouter>
      <AppContextProvider>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<MainRoutes />} />
          </Routes>
        </ChakraProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
