import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Settings = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='mt-5'>
      <UserProfile/>
      </div>
        
    </div>
  )
}

export default Settings