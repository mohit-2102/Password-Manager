import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 '>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-13 mycontainer">

        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
        </div>
        {/* <ul>
          <li className='flex gap-4 text-white'>
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href="/">Contact us</a>
          </li>
        </ul> */}
        <button className='flex text-white gap-3 border border-white rounded-full px-3 py-1'>
          <a className='flex gap-3' target='_blank' href="https://github.com/"><img className='invert w-6' src="/icons/github.svg" alt="Github logo" />
          GitHub
          </a>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
