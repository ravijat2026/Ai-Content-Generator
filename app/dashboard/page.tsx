'use client'
import React from 'react'
import { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'

function Dashboard() {

  const [userSearchInput , setUserSearchInput] = useState<string>()

  return (
    <div>
      {/* Search Section */}

      <SearchSection onSearchInput = {(value: string) => setUserSearchInput(value)} />

      {/* Template Section */}

      <TemplateListSection SearchInput = {userSearchInput} />
    </div>
  )
}

export default Dashboard