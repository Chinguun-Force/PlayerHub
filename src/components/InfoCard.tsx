import React from 'react'

const InfoCard = () => {
  return (
    <div className="flex items-center justify-center lg:translate-x-20">
    <div className="relative h-[450px] w-[350px] rounded-lg bg-muted p-2 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-muted rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2 text-center">
            <div className="inline-block rounded-full bg-background/90 px-3 py-1 text-sm text-foreground backdrop-blur">
              Live Stats & Updates
            </div>
            <div className="h-40 w-64 rounded-lg bg-background/80 backdrop-blur p-4">
              <div className="h-4 w-32 rounded bg-primary/20 mb-2"></div>
              <div className="h-20 w-full rounded bg-muted/50"></div>
              <div className="mt-2 flex justify-between">
                <div className="h-4 w-16 rounded bg-primary/20"></div>
                <div className="h-4 w-16 rounded bg-primary/20"></div>
              </div>
            </div>
            <div className="h-32 w-64 rounded-lg bg-background/80 backdrop-blur p-4">
              <div className="h-4 w-40 rounded bg-primary/20 mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted/50"></div>
                <div className="h-4 w-full rounded bg-muted/50"></div>
                <div className="h-4 w-3/4 rounded bg-muted/50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default InfoCard
