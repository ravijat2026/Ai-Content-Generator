'use client'
import React, { useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { UpdateCreditContext } from '../(context)/UpdateCredit';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const [totalUsage , setTotalUsage] = useState<Number>(0);
    const [UpdateCredit , setUpdateCredit] = useState<any>()
  return (
    <TotalUsageContext.Provider value={{totalUsage , setTotalUsage}}>
      <UpdateCreditContext.Provider value={{UpdateCredit , setUpdateCredit}}>
    <div className='bg-slate-100 min-h-screen'>
      <div className='md:w-64 hidden md:block fixed'>
        <SideNav />
        
      </div>
      <div className='md:ml-64'>
      <div className='block md:hidden'> <Header/> </div>
        {children}
      </div>
    </div>
    </UpdateCreditContext.Provider>
    </TotalUsageContext.Provider>
  )
}

export default layout