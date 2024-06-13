import { Route, Routes } from 'react-router-dom';
import Apontamento from './Pages/Apontamento';


const MainRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Apontamento />} />
        </Routes>
    )
}

export default MainRoutes