import { FeatureSection } from '@/components/FeatureSection'
import HeroSection from '@/components/HeroSection'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 w-screen flex flex-col justify-center items-center">
      <HeroSection/>
      <FeatureSection/>
    </main>
  )
}

export default page