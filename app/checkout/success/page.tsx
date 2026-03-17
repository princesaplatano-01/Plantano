import React, { Suspense } from 'react'
import SuccessClient from './SuccessClient'

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center py-24 px-4">Loading...</div>}>
      <SuccessClient />
    </Suspense>
  )
}
