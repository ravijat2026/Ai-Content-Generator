"use client"
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import React  from 'react'



const billing = () => {

  return (
    
      <div className='mx-auto max-w-3xl px-4 py-8 sm:py-12 mt-[65px]'>
        <h2 className='text-center font-bold text-3xl my-3'>Upgrade With Monthly Plan</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4 mt-12'>

            <div className='rounded-2xl py-5 bg-white border border-gray-200 min-h-[420px] shadow-xl'>
              <div className='text-center'>
                  <h2 className='font-bold text-[30px] mb-3'>Free</h2>
                  <div className='flex gap-2 items-center justify-center'>
                  <h1 className='font-extrabold text-[30px]'>0$</h1>
                  <p className='text-gray-500 pt-3'>/month</p>
                  </div>

                  <div className='mt-3 py-2 text-gray-500 flex flex-col justify-center items-center gap-4'>
                    <p className='flex gap-1 text-[16px]'>
                      <Check className='p-1' size={23}/>
                      1,00,000 Words/Month
                    </p>
                    <p className='flex gap-1 text-[16px]'>
                      <Check className='p-1' size={23}/>
                      20+ Content Templates
                    </p>
                    <p className='flex gap-1 text-[16px]'>
                      <Check className='p-1' size={23}/>
                      Unlimited Download & Copy
                    </p>
                    <p className='flex gap-1 text-[16px]'>
                      <Check className='p-1' size={23}/>
                      1 Month of History
                    </p>
                  </div>
                  <Button className='mt-6 w-[60%] font-bold bg-secondary text-primary hover:bg-slate-100'>Currently Active Plan</Button>
              </div>
            </div>


            <div className='rounded-2xl py-5 bg-white border border-gray-200'>
              <div className='text-center'>
                  <h2 className='font-bold text-[30px] mb-3'>Monthly</h2>
                  <div className='flex gap-2 items-center justify-center'>
                  <h1 className='font-extrabold text-[30px]'>9.99$</h1>
                  <p className='text-gray-500 pt-3'>/month</p>
                  </div>

                  <div className='mt-3 py-2 text-gray-500 flex flex-col justify-center items-center gap-4'>
                    <p className='flex gap-1 text-[16px]'>
                      <Check className='p-1' size={23}/>
                      10,00,000 Words/Month
                    </p>
                    <p className='flex gap-1 text-[16px]'>
                      <Check className='p-1' size={23}/>
                      50+ Content Templates
                    </p>
                    <p className='flex gap-1 text-[16px]'>
                      <Check className='p-1' size={23}/>
                      Unlimited Download & Copy
                    </p>
                    <p className='flex gap-1 text-[16px]'>
                      <Check className='p-1' size={23}/>
                      1 Year of History
                    </p>
                  </div>
                    <Button className='mt-6 w-[60%] font-bold'>Get Started</Button>
              </div>
            </div>

          </div>

      </div>
  
  )
}

export default billing