import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './paginas/Login';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        //Podes definir ciertos Layouts para diferentes paginas
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='registrar' element={<Registrar />} />
          <Route path='confirmar-cuenta/:id' element={<ConfirmarCuenta />} />
          <Route path='olvide-password' element={<OlvidePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
