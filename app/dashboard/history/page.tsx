import React from 'react'

export interface HISTORY{
    id:Number,
    formData:string,
    aiResponse:string,
    templateSlug:string,
    createdBy: string,
    createdAt:string
}

const page = () => {
  return (
    <div>History</div>
  )
}

export default page