"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FileClock, HomeIcon, Settings, WalletCards } from 'lucide-react'
import { usePathname } from 'next/navigation'

const SideNav = () => {

    const MenuList = [
        {
            name: 'Home',
            icon: HomeIcon,
            path: '/dashboard',
        },
        {
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history',
        },
        {
            name: 'Billing',
            icon: WalletCards,
            path: '/dashboard/billing',
        },
        {
            name: 'Setting',
            icon: Settings,
            path: '/dashboard/setting',
        },
    ]

    const path = usePathname();
    useEffect(() => {
        console.log()
    },[])

  return (
    <div className='bg-white h-screen p-5 shadow-sm border'>
        <div className='flex justify-center'>
            <Image src = {'/logo.svg'} alt='logo' width={60} height={20} />
        </div>
        <hr className='my-5 border' />

        <div className='mt-3'>
            {MenuList.map((menu , index) => (
                <div className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer
                ${path == menu.path && `bg-primary text-white`}
                `}>
                    <menu.icon/>
                    <h2>{menu.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SideNav