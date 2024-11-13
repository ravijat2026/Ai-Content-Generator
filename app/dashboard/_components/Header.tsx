import { Search } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center bg-white'>
        <div className='flex bg-white gap-2 items-center p-2 border rounded-md max-w-md'>
            <Search/>
            <input className='outline-none' type='text' placeholder='Search...'/>
        </div>

        <div className='bg-primary p-2 rounded-full text-sm text-white px-3'>
            <h2>Join Menbership just fro $9.99/Month</h2>
        </div>
    </div>
  )
}

export default Header