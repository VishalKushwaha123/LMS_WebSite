import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10 '>
      <div className='flex flex-col px-8 md:px-0 border-b border-white/30 items-start justify-center gap-10 md:gap-32 py-10 text-white md:flex-row'>
        <div className='flex flex-col items-center md:items-start w-full'>
          <img src={assets.logo_dark} alt="logo" />
          <p className='mt-6 text-center md:text-left text-sm text-white/80'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum atque excepturi quos temporibus consectetur deleniti dicta nam et earum autem?</p>
        </div> 
        <div className='flex flex-col items-center md:items-start w-full'>
          <h2 className='text-white mb-5 font-semibold'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
            <li><a href='#'>Home</a></li>
            <li><a href='#'>About</a></li>
            <li><a href='#'>Contact</a></li>
            <li><a href='#'>Privacy Policy</a></li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full '>
          <h2 className='text-white mb-5 font-semibold'>Subscribe to our newsletter</h2> 
          <p className='text-sm text-white/80'>The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div className='flex items-center gap-2 pt-4'>
            <input type='email' placeholder='Enter your email' className='px-2 rounded border border-gray-500/30  text-gray-500 placeholder-gray-500 outline-none w-64 h-9' />
            <button className='bg-blue-500 text-white p-2 rounded-md'>Subscribe</button>
          </div>
        </div>
      </div>
      <p className='py-4 text-center md:text-sm text-xs text-white/60'>Copyright © 2025 Tech series. All rights reserved.</p>
    </footer>
  )
}

export default Footer