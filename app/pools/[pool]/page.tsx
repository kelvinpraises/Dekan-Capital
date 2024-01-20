"use client"

import PoolHeader from '@/library/components/molecules/PoolHeader'
import PoolNav from '@/library/components/molecules/PoolNav'
import React from 'react'

const page = () => {
  return (
    <div className=' flex-1'>
      <PoolHeader />
      <PoolNav />
    </div>
  )
}

export default page