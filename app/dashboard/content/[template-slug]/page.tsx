'use client'
import React, { use, useContext, useState, useEffect } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModal'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'
import { UpdateCreditContext } from '@/app/(context)/UpdateCredit'

interface PROPS {
  params: Promise<{
    'template-slug': string,
  }>,
}

const CreateNewContent = (props: PROPS) => {
  // Unwrap `params` using `use` to access the `template-slug`
  const params = use(props.params)
  const { user } = useUser()
  const router = useRouter()
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const { UpdateCredit, setUpdateCredit } = useContext(UpdateCreditContext)

  // State variables
  const [loading, setLoading] = useState(false)
  const [aiOutput, setAiOutput] = useState<string>('')
  
  // Find the selected template using the unwrapped `params`
  const selectedTemplate: TEMPLATE | undefined = Templates.find((item) => item.slug === params['template-slug'])

  // Function to generate content from AI
  const generateContent = async (formData: any) => {
    if (totalUsage >= 100000) {
      console.log('Please Upgrade')
      router.push('/dashboard/billing')
      return
    }

    setLoading(true)
    const selectedPrompt = selectedTemplate?.aiPrompt
    const FinalAiPrompt = JSON.stringify(formData) + ", " + selectedPrompt

    const result = await chatSession.sendMessage(FinalAiPrompt)
    const responseText = await result.response.text()

    setAiOutput(responseText)
    await SaveInDb(formData, selectedTemplate?.slug, responseText)
    setLoading(false)
    setUpdateCredit(Date.now())
  }

  // Function to save in the database
  const SaveInDb = async (formData: any, slug: any, aiOutput: string) => {
    await db.insert(AIOutput).values({
      formData: formData ?? '',
      templateSlug: slug ?? '',
      aiResponse: aiOutput ?? '',
      createdBy: user?.primaryEmailAddress?.emailAddress ?? '',
      createdAt: moment().format('DD/MM/yyyy'),
    })
  }

  return (
    <div className='p-10'>
      <Link href={'/dashboard'}>
        <Button><ArrowLeft />Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 py-5'>
        {/* Form section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => generateContent(v)}
          loading={loading}
        />

        {/* Output section */}
        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent
