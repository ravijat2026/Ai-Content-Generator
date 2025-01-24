import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Settings = () => {
  return (
    <div className='flex items-center justify-center h-full -z-50 mt-[65px]'>
      <div className='mt-5'>
        <UserProfile routing="hash" />
      </div>
    </div>
  )
}

export default Settings
