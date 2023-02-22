import React from 'react';

const BannerAuth = ({ texto, contSpan }) => {
  return (
    <div className='text-blue-600 font-black text-4xl my-5 text-center space-y-4'>
      <h1 className='h-1/3'>
        {`${texto}`}
        <span className='text-red-600 font-black'>{`${contSpan}`}</span>
      </h1>
      <div className='h-1/3 w-2/3 m-auto'>
        <img src='src\assets\login_svg.svg' alt='login_doctor' />
      </div>
    </div>
  );
};

export default BannerAuth;
