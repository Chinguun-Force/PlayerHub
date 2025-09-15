import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function FooterSection() {
  return (
    <div className="w-screen flex justify-center border-t bg-muted/40">
        <footer className="w-fit py-12 ">

            <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-4">
                <div className="space-y-4">
                <h3 className="text-lg font-medium">PlayerHub</h3>
                <p className="text-sm text-muted-foreground">
                    Connecting players, teams, and fans in one comprehensive platform.
                </p>
                <div className="flex space-x-4">
                    <Button variant="ghost" size="icon">
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Facebook</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                    </Button>
                </div>
                </div>
                <div className="space-y-4">
                <h3 className="text-lg font-medium">Resources</h3>
                <ul className="space-y-2 text-sm">
                    <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Blog
                    </Link>
                    </li>
                    <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Documentation
                    </Link>
                    </li>
                    <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Help Center
                    </Link>
                    </li>
                    <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Community
                    </Link>
                    </li>
                </ul>
                </div>
                <div className="space-y-4">
                <h3 className="text-lg font-medium">Company</h3>
                <ul className="space-y-2 text-sm">
                    <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        About Us
                    </Link>
                    </li>
                    <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Careers
                    </Link>
                    </li>
                    <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Privacy Policy
                    </Link>
                    </li>
                    <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        Terms of Service
                    </Link>
                    </li>
                </ul>
                </div>
                <div className="space-y-4">
                <h3 className="text-lg font-medium">Newsletter</h3>
                <p className="text-sm text-muted-foreground">Subscribe to our newsletter for the latest updates.</p>
                <div className="flex space-x-2">
                    <Input placeholder="Enter your email" type="email" className="max-w-[220px]" />
                    <Button>Subscribe</Button>
                </div>
                </div>
            </div>
        </footer>
    </div>
  )
}
