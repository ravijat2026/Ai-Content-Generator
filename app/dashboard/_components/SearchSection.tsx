import { Search } from 'lucide-react'
import React from 'react'



const SearchSection = ({onSearchInput} : any) => {
  return (
    <div className='p-10 bg-gradient-to-br from-red-300 via-red-500 to-red-400 flex flex-col items-center justify-center'>
        <h2 className='text-3xl font-bold'>Browse All Templates</h2>
        <p>What would you like to create today ?</p>
        <div className='w-full flex items-center justify-center'>
            <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
                <Search />
                <input type='text' placeholder='Search...'
                onChange={(event) => onSearchInput(event.target.value)}
                className='bg-transparent outline-none w-full text-slate-600' />
            </div>
        </div>
    </div>
  )
}

export default SearchSection