"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuthStore } from "@/store/authStore"
import { useProfileStore } from "@/store/useProfileStore"
import {jwtDecode} from "jwt-decode"
import { SportsLoader } from "@/components/SportLoader"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
     try {
    const response = await fetch('/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    console.log(data)
    localStorage.setItem("token", data.token)

    toast.success("Login successful")
    console.log(data.token)
    useAuthStore.getState().login({token : data.token})
    interface DecodedToken {
      user: {
        role: string
      }
    }
    const decodedToken = jwtDecode<DecodedToken>(data.token)

    if (decodedToken.user.role === "FAN") {
      router.push("/")
    } else if (decodedToken.user.role === "PLAYER") {
      const profileResponse = await fetch('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      if (!profileResponse.ok) {
        const profileError = await profileResponse.json()
        if (profileError.message === "Player not found") {
          toast.info("Profile setup required")
          router.push("/players/createPlayer")
          return
        }
        throw new Error("Failed to fetch profile")
      }
      const myProfile = await profileResponse.json()
      console.log(myProfile)
      useProfileStore.getState().setProfile(myProfile.player)
      if (myProfile.player) {
        router.push("/players")
      }
    } else if (decodedToken.user.role === "OWNER") {
      router.push("/dashboard/team-owner")
    } else if (decodedToken.user.role === "ADMIN") {
      router.push("/dashboard")
    } else {

      router.push("/dashboard")
    }
  } catch (error) {
    toast.error("login failed")
  } finally {
    setIsLoading(false)
  }
}

  const checkAuth = useAuthStore(state => state.checkAuth)

  useEffect(() => {

    checkAuth();
  }, [checkAuth]);

  return (
    <>
      {isLoading && <SportsLoader />}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}
