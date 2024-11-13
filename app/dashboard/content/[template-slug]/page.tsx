'use client'
import React, { useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModal'

interface PROPS{
    params: {
        'template-slug': string,
    },

}

const CreateNewContent = (props: PROPS) => {

    const selectedTemplate: TEMPLATE|undefined = Templates?.find((item) => item.slug == props.params['template-slug'])
    const [loading,setLoading] = useState(false)

    const [aiOutput , setAiOutput] = useState<string>('')

    const generateContent = async (formData:any) => {
      setLoading(true)
        const selectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAiPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

        const result = await chatSession.sendMessage(FinalAiPrompt);

        console.log(result.response.text());
        setAiOutput(result?.response.text());
        setLoading(false);
    }
  return (
    <div className='p-10'>
      <Link href = {'/dashboard'} >
      <Button><ArrowLeft/>Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 py-5'>
          {/* formsection */}

          <FormSection selectedTemplate = {selectedTemplate}
            userFormInput={(v:any) => generateContent(v)}
            loading = {loading}
          />

          {/* Output section */}
          <div className='col-span-2'>
          <OutputSection aiOutput = {aiOutput} />
          </div>
          
      </div>
    </div>
  )
}

export default CreateNewContent