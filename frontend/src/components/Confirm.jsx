import React from 'react'

const Confirm = ({confirmText}) => {
  return (
    <div className='m-1 bg-green-200 border border-green-600 text-green-600 font-bold text-center my-4 rounded-md'>
        <p>{`${confirmText.msg}`}</p>
    </div>
  )
}

export default Confirm