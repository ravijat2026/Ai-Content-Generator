import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Settings = () => {
  return (
    <div className='md:ml-48 ml-4 flex items-center justify-center h-full mt-[65px]'>
      <div className='mt-5'>
        <UserProfile routing="hash" />
      </div>
    </div>
  )
}

export default Settings
