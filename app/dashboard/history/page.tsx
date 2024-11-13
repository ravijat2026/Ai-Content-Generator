'use client'
import React, { useEffect, useState } from 'react'
import Templates from '@/app/(data)/Templates'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'
import Image from 'next/image'
import { TEMPLATE } from '../_components/TemplateListSection'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'

export interface HISTORY {
    id: number,
    formData: string,
    aiResponse: string,
    templateSlug: string,
    createdBy: string,
    createdAt: string
}

const History = () => {
    const { user } = useUser();
    const [HistoryList, setHistoryList] = useState<HISTORY[]>([]);

    useEffect(() => {
        const GetData = async () => {
            
            if (user) {
                try {
                  {/* @ts-ignore */}
                    const result: HISTORY[] = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, user.primaryEmailAddress?.emailAddress))
                        .orderBy(desc(AIOutput.id));
                    setHistoryList(result);
                } catch (error) {
                    console.error("Error fetching history data:", error);
                }
            }
        };
        GetData();
    }, [user]);

    const GetTemplateName = (slug: string) => {
        const template: TEMPLATE | undefined = Templates?.find((item) => item.slug === slug);
        return template;
    };

    return (
        <>
            <div className='m-5 p-5 border rounded-lg bg-white'>
                <h2 className='font-bold text-3xl'>History</h2>
                <p className='text-gray-500'>Search Your previously generated AI Content</p>
                <div className='grid grid-cols-5 md:grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3'>
                    <h2 className='col-span-2'>TEMPLATE</h2>
                    <h2 className='col-span-2'>AI RESPONSE</h2>
                    <h2 className='hidden md:block'>DATE</h2>
                    <h2 className='hidden md:block'>WORDS</h2>
                    <h2>COPY</h2>
                </div>
            </div>

            {HistoryList.map((item: HISTORY) => (
                <div key={item.id} className='grid grid-cols-5 md:grid-cols-7 m-5 p-5'>
                    <h2 className='col-span-2 flex gap-2 items-center'>
                        <Image src={GetTemplateName(item?.templateSlug)?.icon || ''} width={25} height={25} alt='icon' />
                        {GetTemplateName(item.templateSlug)?.name}
                    </h2>
                    <h2 className='col-span-2 line-clamp-3'>{item?.aiResponse}</h2>
                    <h2 className='text-sm hidden md:block'>{item.createdAt}</h2>
                    <h2 className='hidden md:block'>{item?.aiResponse?.length}</h2>
                    <h2>
                        <Button variant='ghost' className='text-primary' onClick={() => navigator.clipboard.writeText(item.aiResponse || '')}>
                            Copy
                        </Button>
                    </h2>
                </div>
            ))}
        </>
    );
}

export default History;
