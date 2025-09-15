import React from 'react'
import InfoCard from './InfoCard'
import { LoadingLink } from './LoadingLink'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className="container px-4 md:px-6 flex justify-center items-center min-h-screen ">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Тоглогчид, багууд болон хөгжөөн дэмжигчдийг нэгтсэн платформ
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                PlayerHubs нь тоглогчид, багууд болон хөгжөөн дэмжигчдийг нэгтгэн,
                тэдний мэдээллийг хуваалцах, харилцах, хамтран ажиллахад зориулагдсан платформ юм.
                Бидний зорилго бол тоглогчдын мэдээллийг төвлөрсөн байдлаар хадгалах,
                тэдний карьерийг дэмжих, хөгжөөн дэмжигчдийн хамтын ажиллагааг сайжруулах явдал юм.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <LoadingLink href="/auth/register">
                <Button size="lg">
                  Эхлэх <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </LoadingLink>
              <LoadingLink href="/players">
                <Button size="lg" variant="outline">
                  Бүх тоглогчид
                </Button>
              </LoadingLink>
            </div>
          </div>
          <InfoCard/>
        </div>
      </div>
  )
}

export default HeroSection