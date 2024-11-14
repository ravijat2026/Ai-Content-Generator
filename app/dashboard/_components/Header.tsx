import { UserButton, useUser } from '@clerk/nextjs'
import {  Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import SideNav from './SideNav';

const Header =  () => {
  const {user} = useUser();
  const [nav,setNav] = useState(false);


  const handleClick = () => {
    setNav(!nav);
  }
  
  return (
    <>
    <div className={` ${nav? 'ml-64' : 'ml-0'} p-5 shadow-sm border-b-2 flex justify-between items-center bg-white`}>
        
        <div className={`${nav? 'hidden' : 'flex'} bg-white gap-2 items-center p-2 border rounded-md max-w-md`}>
            <button title='Navbar' onClick={handleClick}>
            <Menu/>
            </button>
        </div>
          <div className='flex gap-5 items-center'>
            <UserButton/>
            <h2>{user?.fullName}</h2>
        </div>
    </div>

    <div className={`${nav ? 'block' : 'hidden'} ${nav? 'mt-[-88px]' : 'mt-0'} w-64 fixed z-50 h-screen`}>
        <div className='relative'>
        <button title='Navbar' className='absolute top-2 left-[200px] z-50 bg-white gap-2 items-center p-2 border rounded-md max-w-md' onClick={handleClick}>
            <X size={32}/>
            </button>
            <SideNav closeNav={() => setNav(false)} />
        </div>
        
    </div>
    </>
  )
}

export default Header