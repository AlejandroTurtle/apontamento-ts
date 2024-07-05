import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Apontamento from './Pages/Apontamento';


const MainRoutes = () => {


    
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path='/' element={<Login />} />
            <Route path="/apontamento" element={<Apontamento />} />
        </Routes>
    )
}

export default MainRoutes