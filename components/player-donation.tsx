"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Player } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PlayerDonationProps {
  player: Player
}

export function PlayerDonation({ player }: PlayerDonationProps) {
  const [amount, setAmount] = useState("10")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Donation successful!",
        description: `Thank you for supporting ${player.name} with $${amount}.`,
      })

      setAmount("10")
      setMessage("")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Donation failed",
        description: "There was a problem processing your donation.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!player.donationEnabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Support This Player</CardTitle>
          <CardDescription>Show your support by donating to this player</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <Heart className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">Donations not enabled</h3>
          <p className="text-sm text-muted-foreground">This player is not currently accepting donations.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support This Player</CardTitle>
        <CardDescription>Show your support by donating to this player</CardDescription>
      </CardHeader>
      <form onSubmit={handleDonation}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Donation Amount ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setAmount("5")}>
              $5
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setAmount("10")}>
              $10
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setAmount("25")}>
              $25
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setAmount("50")}>
              $50
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a message of support..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Support Now"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
