import { SportsLoader } from '@/components/SportLoader'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <SportsLoader size="lg" text="Loading page..." />
    </div>
  )
}