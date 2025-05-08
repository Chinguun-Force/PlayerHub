import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Connect Players, Teams, and Fans in One Platform
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Whether you're a team owner, player, or fan, PlayerHub brings the sports community together. Track
                stats, follow careers, and support your favorite athletes.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/register">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/players">
                <Button size="lg" variant="outline">
                  Browse Players
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
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
        </div>
      </div>
    </section>
  )
}
