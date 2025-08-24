import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
     <div className='animate-spin rounded-full w-16 border-t-4 border-t-blue-400 sm:w-20 aspect-square border-4  border-gray-300 '></div>
    </div>
  )
}

export default Loading