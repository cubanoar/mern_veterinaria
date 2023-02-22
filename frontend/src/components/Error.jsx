import React from 'react'

const Error = ({errorText}) => {
  return (
    <div className='m-1 bg-red-200 border border-red-600 text-red-600 font-bold text-center rounded-md'>
        <p>{`${errorText.msg}`}</p>
    </div>
  )
}

export default Error