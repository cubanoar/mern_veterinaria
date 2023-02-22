import React from 'react';
import BannerAuth from '../components/BannerAuth';
import NavForm from '../components/NavForm';

const OlvidePassword = () => {
  return (
    <>
      <BannerAuth
        texto={'Recupera tu acceso, no pierdas tus '}
        contSpan={'Pacientes'}
      />

      <div className='bg-white rounded-md py-6 px-4 w-full shadow-md '>
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
          <input
            className='bg-blue-600 w-full md:w-1/3 rounded-md text-center px-3 text-white cursor-pointer hover:bg-white hover:text-blue-600 border border-blue-600'
            type='submit'
            value='Enviar'
          />
        </form>
        <NavForm
          link1={'Registrarse'}
          path1={'/registrar'}
          link2={'Iniciar sesión'}
          path2={'/'}
        />
      </div>
    </>
  );
};

export default OlvidePassword;
