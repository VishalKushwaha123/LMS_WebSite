import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

  const navigate = useNavigate()
  const [input , setInput] = useState(data ? data : "")

  const onSearchHandler = (e) => {
    e.preventDefault()
    navigate('/course-list/' + input)
  }
  return (

      <form onSubmit={onSearchHandler} className='flex items-center max-w-xl md:h-14 h-12 bg-white rounded border border-gray-300'>
        <img src={assets.search_icon} alt="search_icon" className='md:w-auto w-10 px-3' />
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Search for courses" className='border border-gray-300 rounded-md py-2 px-4 md:w-auto w-full' />
        <button type="submit" className='bg-blue-600 text-white px-5 py-2 rounded-md ml-2'>Search</button>
      </form>
   
  )
}

export default SearchBar