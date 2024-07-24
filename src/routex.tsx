import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Apontamento from './Pages/Apontamento';
import { useContext } from "react";
import { AppContext } from "./Components/AppContext";
import { Layout } from './Components/Layout';

const MainRoutes = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      {isLoggedIn ? (
        <Route path="*" element={<LayoutRoutes />} />
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </Routes>
  );
};

const LayoutRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/apontamento" element={<Apontamento />} />
        {/* Adicione aqui outras rotas que precisam do Layout */}
      </Routes>
    </Layout>
  );
};

export default MainRoutes;
