import { useState } from 'react';
import axios from 'axios';

import BannerAuth from '../components/BannerAuth';
import Error from '../components/Error';
import NavForm from '../components/NavForm';
import Confirm from '../components/Confirm';

const Registrar = () => {
  /* const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('') */

  const [registro, setRegistro] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
  });
  const [errorAlert, setErrorAlert] = useState();
  const [confirm, setConfirm] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Comprobar que los campos no esten vacios
    if (
      [
        registro.nombre,
        registro.email,
        registro.password,
        registro.confirmarPassword,
      ].includes('')
    ) {
      setErrorAlert({
        msg: 'Todos los campos son obligatorios',
      });
      setTimeout(() => {
        setErrorAlert();
      }, 5000);
      return;
    }

    //comropbar que los passwords sean iguales
    if (registro.password !== registro.confirmarPassword) {
      setErrorAlert({ msg: 'Los passwords no coinciden' });

      setTimeout(() => {
        setErrorAlert();
      }, 5000);
      return;
    }

    //comprobar que el password tenga entre 8 y 16 caracteres
    if (registro.password.length < 8 || registro.password.length > 16) {
      setErrorAlert({ msg: 'Password entre 8 y 16 caracteres' });
      setTimeout(() => {
        setErrorAlert();
      }, 5000);
      return;
    }

    //Si llegamos hasta aca es xq paso las validaciones
    //Crear el Veterinario haciendo el POST a la API
    try {
      const url = 'http://localhost:4000/api/veterinarios';
      const respuesta = await axios.post(url, { ...registro });

      if(!respuesta.data.success){
        setErrorAlert({ msg: respuesta.data.error });
        setTimeout(() => {
          setErrorAlert();
        }, 5000);
        return
      };

      setConfirm({
        msg: 'Usuario creado correctamente, te enviamos un email de confirmación',
      });
      setTimeout(() => {
        setConfirm();
      }, 5000);

      setRegistro({
        nombre: '',
        email: '',
        password: '',
        confirmarPassword: '',
      });
    } catch (error) {
      setErrorAlert({ msg: error.response.data.msg });
      setTimeout(() => {
        setErrorAlert();
      }, 5000);
      console.log(error.response);
    }
  };

  return (
    <>
      <BannerAuth
        texto={'Registra tus datos para administrar tus '}
        contSpan={'Pacientes'}
      />

      <div className='bg-white rounded-md w-full shadow-md mb-4'>
        {errorAlert && <Error errorText={errorAlert} />}
        {confirm && <Confirm confirmText={confirm} />}
        <form
          action=''
          className='font-bold space-y-3  py-4 px-4 mt-4'
          onSubmit={handleSubmit}>
          <div>
            <label className='text-blue-600' htmlFor='nombre'>
              Nombre{' '}
            </label>
            <input
              className='border border-slate-200 w-full block font-normal px-2 rounded-md outline-none bg-slate-50 '
              type='text'
              name='nombre'
              id='nombre'
              placeholder='Nombre'
              value={registro.nombre}
              onChange={(e) => {
                const nombre = e.target.value;
                setRegistro({ ...registro, nombre });
              }}
            />
          </div>
          <div>
            <label className='text-blue-600' htmlFor='email'>
              Email{' '}
            </label>
            <input
              className='border border-slate-200 w-full block font-normal px-2 rounded-md outline-none bg-slate-50 '
              type='email'
              name='email'
              id='email'
              placeholder='email@email.com'
              value={registro.email}
              onChange={(e) => {
                const email = e.target.value;
                setRegistro({ ...registro, email });
              }}
            />
          </div>
          <div>
            <label className='text-blue-600' htmlFor='password'>
              Password{' '}
            </label>
            <input
              className='border border-slate-200 w-full block font-normal px-2 rounded-md outline-none bg-slate-50'
              type='password'
              name='password'
              id='password'
              placeholder='**********'
              value={registro.password}
              onChange={(e) => {
                const password = e.target.value;
                setRegistro({ ...registro, password });
              }}
            />
          </div>
          <div>
            <label className='text-blue-600' htmlFor='confirmarPassword'>
              Confirmar Password{' '}
            </label>
            <input
              className='border border-slate-200 w-full block font-normal px-2 rounded-md outline-none bg-slate-50'
              type='password'
              name='password'
              id='confirmarPassword'
              placeholder='**********'
              value={registro.confirmarPassword}
              onChange={(e) => {
                const confirmarPassword = e.target.value;
                setRegistro({ ...registro, confirmarPassword });
              }}
            />
          </div>
          <input
            className='bg-blue-600 w-full md:w-1/3 rounded-md text-center px-3 text-white hover:cursor-pointer hover:bg-white hover:text-blue-600 border border-blue-600 ml-auto'
            type='submit'
            value='Enviar'
          />
        </form>
        <NavForm
          link1={'Iniciar sesión'}
          path1={'/'}
          link2={'Olvidé mi password'}
          path2={'/olvide-password'}
        />
      </div>
    </>
  );
};

export default Registrar;
