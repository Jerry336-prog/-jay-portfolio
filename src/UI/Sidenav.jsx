import React from 'react'
import { Link } from 'react-router-dom'

function Sidenav({mynav}) {
  return (
     <div>
         <section className={mynav ? ' absolute top-[70px] text-[var(--text)] left-0 w-full bg-[var(--bg-secondary)] border-b-2 border-gray-300 p-4 ease-in-out duration-500 md:hidden' : ' absolute top-[-400px] left-0 w-full bg-[var(--bg-secondary)] border-b-2 border-gray-300 text-[var(--text) p-4 ease-in-out duration-500 md:hidden'}>
                <ol className=' flex flex-col gap-4'>
                    <Link to='/' className=' cursor-pointer'>Home</Link>
                    <Link to='/projects' className=' cursor-pointer'>Projects</Link>
                    <Link to='/about' className=' cursor-pointer'>About</Link>
                    <Link to='/contact' className=' cursor-pointer'>Contact</Link>
                </ol>
            </section>
           
    </div>
  )
}

export default Sidenav