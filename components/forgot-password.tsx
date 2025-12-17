"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import { Card, CardContent } from "./ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "./ui/spinner"
import api from "@/lib/axios"

export function ForgotPasswordForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post("/api/users/forgot-password", { email })

      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data?.message || "Password reset email sent")
        setEmail("")
      } else {
        toast.error(response.data?.message || "Failed to send reset email")
      }
    } catch (err) {
      console.error("Forgot password error:", err)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Logo + Heading */}
            <div className="text-center space-y-3">
              <img
                src="/SFU-LOGO.png"
                alt="Shikana Frontliners for Unity Party"
                className="h-24 mx-auto w-24 object-contain align-center"
              />
              <h1 className="text-2xl font-bold tracking-tight">
                Forgot Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your registered email to receive password reset instructions.
              </p>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                placeholder="you@example.com"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors h-10 mt-3"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Send Reset Link"}
            </Button>

            {/* Back to Login */}
            <div className="mt-4 text-center text-sm">
              <a
                href="/login"
                className="text-secondary hover:underline"
              >
                Back to Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
