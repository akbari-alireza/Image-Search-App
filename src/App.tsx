import React from 'react'

const App = () => {
  return (
    <div className='flex items-center justify-center pt-10 font-sans '>
      <div className='w-[80%] flex flex-col items-center '>
        <h1 className='font-bold text-3xl'>Image Search App</h1>
        <div className='mt-10 flex text-xl w-full'>
          <input className='border rounded-l-md px-4 py-1 w-full' type="text" placeholder='Search for images' />
          <button className='rounded-r-md  text-white bg-blue-400 hover:bg-blue-600 duration-200 ease-in-out  px-3 py-1'>Search</button>
        </div>
      </div>
    </div>
  )
}

export default App