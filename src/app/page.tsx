import { FeatureSection } from '@/components/FeatureSection'
import HeroSection from '@/components/HeroSection'
import { LoadingLink } from '@/components/LoadingLink'
import { SkeletonExample } from '@/components/skeletons/SkeletonExample'
import React from 'react'

export const dynamic = "force-dynamic"

const page = () => {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 w-screen flex flex-col justify-center items-center">
      <HeroSection/>
      <FeatureSection/>
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="mt-6 text-center space-y-4">
          <LoadingLink 
            href="/test-loader" 
            className="inline-block px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Test Global Loader Page
          </LoadingLink>
          <div className="mt-8">
            <SkeletonExample />
          </div>
        </div>
      </div>
    </main>
  )
}

export default page