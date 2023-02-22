import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className='container px-2 md:mx-auto md:grid md:grid-cols-2 min-h-screen md:place-items-center gap-3'>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
