import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl font-semibold md:text-4xl text-gray-800'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 sm:text-sm'>Join our platform and start your learning journey today!</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Get Started</button>
        <button className='flex items-center gap-1 text-blue-500'>
          Learn More <img src={assets.arrow_icon} alt='arrow_icon' />
        </button>
      </div>
    </div>
  )
}

export default CallToAction