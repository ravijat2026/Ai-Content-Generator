import { UserButton, useUser } from '@clerk/nextjs'
import {  Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import SideNav from './SideNav';
import Link from 'next/link';

const Header =  () => {
  const {user} = useUser();
  const [nav,setNav] = useState(false);


  const handleClick = () => {
    setNav(!nav);
  }
  
  return (
    <>
    <div className={` p-5 shadow-sm border-b-2 flex justify-between items-center bg-white`}>
        
    <div className='flex justify-center'>
      <Link href = {'/'}>
      <h2 className='font-bold text-lg md:text-2xl text-red-800 md:ml-8'>QueryMaster</h2>
      </Link>
            
        </div>
          <div className='flex gap-5 items-center'>
            <UserButton/>
            <h2>{user?.fullName}</h2>
            <button title='Navbar' className='md:hidden' onClick={handleClick}>
            <Menu/>
            </button>
        </div>
    </div>

    <div className={`${nav ? 'block' : 'hidden'} w-64 fixed z-50 h-screen`}>
        <div className='relative'>
            <SideNav closeNav={() => setNav(false)}/>
        </div>
        
    </div>
    </>
  )
}

export default Header