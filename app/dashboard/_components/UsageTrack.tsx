'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, {useContext, useEffect, useState } from 'react'
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UpdateCreditContext } from '@/app/(context)/UpdateCredit';

const UsageTrack = () => {
    const {user} = useUser();
    let {totalUsage , setTotalUsage} = useContext(TotalUsageContext)

    const {UpdateCredit , setUpdateCredit} = useContext(UpdateCreditContext);
    useEffect(() => {
       user && GetData();
    },[user])

    useEffect(() => {
        user && GetData();
     },[UpdateCredit && user]);
     

    const GetData = async() => {
        {/* @ts-ignore */}
        const result:HISTORY[] = await db.select().from(AIOutput).where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress))

        GetTotalUsage(result)
    }

    const GetTotalUsage = (result:HISTORY[]) => {
        result.forEach(element => {
            totalUsage = totalUsage + Number(element.aiResponse?.length)
        });

        setTotalUsage(totalUsage)
        
    }

  return (
    <div className='m-5'>
        <div className='bg-primary text-white rounded-lg p-3'>
            <h2 className='font-medium'>Credits</h2>
            <div className='h-2 bg-[#e4817c] w-full rounded-full mt-3'>
                <div className='h-2 bg-white rounded-full' 
                style={{
                    width: (totalUsage/100000) * 100 + '%'
                  }}
                >    
                </div>
            </div>
            <h2 className='text-sm my-2'>{totalUsage}/10,0000 Credit used</h2>
        </div>
        <Button className='w-full my-3 text-primary' variant={'secondary'}>Upgrade</Button>
    </div>
  )
}

export default UsageTrack