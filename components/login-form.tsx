"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "./ui/spinner"
import api from "@/lib/axios";
import { Eye, EyeOff } from "lucide-react"
import toast, { Toaster } from 'react-hot-toast';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const username = formData.get("username")
      const password = formData.get("password")

      const result = await api.post(
        "/api/users/login",
        { username, password },
        { validateStatus: () => true }
      )

      if (result.data?.statusCode !== 200) {
        toast.error(result.data?.message || "Login failed")
        return
      }
      const { user, token } = result?.data?.data
      localStorage.setItem("user", JSON.stringify(user))
      sessionStorage.setItem("token", token)
      toast.success(result.data?.message || "Login successful")
      router.push("/otp")
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Toaster position="top-right" />
      <form
        onSubmit={handleLogin}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your username below to login to your account
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="member001"
              required
            />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a href="#" className="text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>

          <Field>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Login"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
