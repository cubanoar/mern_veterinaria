import React from 'react';
import { Link } from 'react-router-dom';
import BannerAuth from '../components/BannerAuth';
import NavForm from '../components/NavForm';

const Login = () => {
  return (
    <>
      <BannerAuth
        texto={'Inicia sesión para administrar tus '}
        contSpan={'Pacientes'}
      />
      <div className='bg-white rounded-md p-6 w-full shadow-md '>
        <form action='' className='font-bold space-y-3'>
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
            />
          </div>

          <input
            className='bg-blue-600 w-full md:w-1/3 rounded-md text-center px-3 text-white hover:cursor-pointer hover:bg-white hover:text-blue-600 border border-blue-600 ml-auto'
            type='submit'
            value='Ingresar'
          />
        </form>
        <NavForm
          link1={'Registrarse'}
          path1={'/registrar'}
          link2={'Olvidé mi password'}
          path2={'/olvide-password'}
        />
      </div>
    </>
  );
};

export default Login;
