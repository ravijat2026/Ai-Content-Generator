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
    const [UpdateCredit , setUpdateCredit] = useState<any>();
    const [userSubscription , setUserSubscription] = useState<any>(null);
  return (
    <TotalUsageContext.Provider value={{totalUsage , setTotalUsage}}>
      
        <UpdateCreditContext.Provider value={{UpdateCredit , setUpdateCredit}}>
    <div className='bg-slate-100 min-h-screen relative'>
    <div className='block h-[65px] w-full fixed z-50'> <Header/> </div>
      <div className='md:w-64 hidden md:block fixed mt-[65px]'>
        <SideNav />
      </div>

      <div className='md:ml-64 absolute z-0'>
      
        {children}
      </div>
    </div>
    </UpdateCreditContext.Provider>
   
    </TotalUsageContext.Provider>
  )
}

export default layout