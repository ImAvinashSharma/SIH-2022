import React from 'react'

function Loading() {
  return (
    <div className='flex h-[37rem] items-center justify-center'>
        <div className='loader'>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
        </div>
    </div>
  )
}

export default Loading