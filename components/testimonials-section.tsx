import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Trusted by Players, Teams, and Fans
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our users have to say about their experience with our platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">Team Owner</div>
                </div>
              </div>
              <div className="mt-4 text-sm">
                "This platform has revolutionized how I manage my team. The analytics tools are powerful yet easy to
                use, and I can track player performance in real-time."
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Michael Johnson</div>
                  <div className="text-sm text-muted-foreground">Professional Player</div>
                </div>
              </div>
              <div className="mt-4 text-sm">
                "I love being able to showcase my career journey and connect with fans. The donation feature has been a
                great way to fund my training and give back to supporters."
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Sarah Rodriguez</div>
                  <div className="text-sm text-muted-foreground">Sports Fan</div>
                </div>
              </div>
              <div className="mt-4 text-sm">
                "As a dedicated fan, I can now follow all my favorite players in one place. The playoff statistics are
                comprehensive, and I love being able to support players directly."
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
