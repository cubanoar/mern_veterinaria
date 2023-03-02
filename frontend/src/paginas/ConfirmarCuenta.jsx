import { useEffect, useState } from 'react';
//Seleccionar el paramerto de la URL
import { useParams } from 'react-router-dom';
import axios from 'axios';

import BannerAuth from '../components/BannerAuth';
import Confirm from '../components/Confirm';
import Error from '../components/Error';
import Loading from '../components/Loading';
import NavForm from '../components/NavForm';
import clienteAxios from '../config/axios';


const ConfirmarCuenta = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [dialogText, setDialogText] = useState();

  useEffect(() => {
    const confirmarCuenta = async () => {
      const url = `/veterinarios/confirmar/${token}`;
      try {
        const { data } = await clienteAxios(url);
        //setConfirm(data);
        setDialogText(data);
      } catch (error) {
        //setError(error.response.data);
        setDialogText(error.response.data);
      }

      setLoading(false);
    };

    confirmarCuenta();
  }, []);

  return (
    <>
      <BannerAuth
        texto={'Confirma tu cuenta para comenzar con tus '}
        contSpan={'Pacientes'}
      />
      <div className='bg-white rounded-md p-6 w-full shadow-md '>
        {!loading && dialogText.success ? (
          <>
            <Confirm confirmText={dialogText} />
            <NavForm
              link1={'Iniciar sesión'}
              path1={'/'}
            />
          </>
        ) : !loading && !dialogText.success ? (
          <Error errorText={dialogText} />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
