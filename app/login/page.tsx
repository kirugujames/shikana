import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className=" min-h-svh flex flex-col items-end justify-center gap-6 p-6 md:p-10
    bg-[url('/Sfu-login-bg.avif')] bg-cover bg-center bg-no-repeat" >
      <div className="hidden md:block absolute left-9 top-1/3 max-w-md text-white space-y-4 md:left-16 animate-fadeIn slide-in-left">
        <h2 className="text-4xl font-bold drop-shadow-lg">
          Welcome Back to 
        </h2>
        <h2 className="text-2xl font-bold drop-shadow-lg">
          Shikana Frontliners for Unity Party
        </h2>
        
        <p className="text-lg drop-shadow-md">
          SFUP is a political movement built on unity, driven by the belief that together we can create meaningful change for Kenya as a whole.
        </p>
      </div>


      <div className="flex w-full max-w-sm flex-col gap-6 md:mr-28">
        <LoginForm />
      </div>
    </div>
  )
}
