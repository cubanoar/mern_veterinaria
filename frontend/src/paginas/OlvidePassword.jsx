import { useState } from 'react';
import BannerAuth from '../components/BannerAuth';
import NavForm from '../components/NavForm';
import clienteAxios from '../config/axios';
import Error from '../components/Error';
import Confirm from '../components/Confirm';

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      setError({ msg: 'El email no puede estar vácio' });
      setConfirm({ msg: '' });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        '/veterinarios/olvide-password',
        { email }
      );
      setConfirm(data)
      setError({ msg: '' });
      console.log(data);
    } catch (error) {
      setError({ msg: error.response.data.msg });
    }

    /*  if (email) {
      setConfirm({ msg: 'Email enviado' });
      setError({ msg: '' });
      return;
    } */
  };

  return (
    <>
      <BannerAuth
        texto={'Recupera tu acceso, no pierdas tus '}
        contSpan={'Pacientes'}
      />

      <div className='bg-white rounded-md py-6 px-4 w-full shadow-md '>
        {confirm.msg && <Confirm confirmText={confirm} />}
        {error.msg && <Error errorText={error} />}
        <form onSubmit={handleSubmit} className='font-bold space-y-3'>
          <div>
            <label className='text-blue-600' htmlFor='email'>
              Email{' '}
            </label>
            <input
              className='border border-slate-200 w-full block font-normal px-2 rounded-md outline-none bg-slate-50 '
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
