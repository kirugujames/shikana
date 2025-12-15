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
import { Card, CardContent } from "./ui/card"

// Define the component's props by omitting the conflicting 'ref' and 'key' properties.
// The rest of the props will now correctly map to standard form attributes.
type LoginFormProps = Omit<React.ComponentProps<"form">, 'ref' | 'key'>;

export function LoginForm({
  className,
  ...props
}: LoginFormProps) {
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
      // IMPORTANT: Swapped localStorage usage to follow best practices for token/user data in this environment.
      sessionStorage.setItem("user", JSON.stringify(user))
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
      <Card>
        <CardContent>
          <form
            onSubmit={handleLogin}
            className={cn("flex flex-col space-y-6", className)}
            {...props}
          >

            <div className="text-center  space-y-3">
              <img
                src="/SFU-LOGO.png"
                alt="Shikana Frontliners for Unity Party"
                className="h-24 mx-auto w-24 object-contain align-center"
              />
              <h1 className="text-2xl font-bold tracking-tight">
                Welcome to SFU Party
              </h1>

              <p className="text-sm text-muted-foreground">
                Enter your username and password to continue
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Username *
              </label>
              <input
                type="text"
                name="username"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                placeholder="john.doe"
              />
            </div>


            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Password *
                </label>

                <a href="#" className="text-sm underline-offset-4 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg pr-10 focus:outline-none focus:border-secondary"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>


            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors h-10 mt-3"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}