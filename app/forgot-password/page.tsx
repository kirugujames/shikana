import { ForgotPasswordForm } from "@/components/forgot-password"

export default function ForgotPasswordPage() {
  return (
    <div
      className="min-h-svh flex flex-col items-end justify-center gap-6 p-6 md:p-10
      bg-[url('/Sfu-login-bg.avif')] bg-cover bg-center bg-no-repeat"
    >
      {/* Left-side welcome message on desktop */}
      <div className="hidden md:block absolute left-9 top-1/3 max-w-md text-white space-y-4 md:left-16 animate-fadeIn slide-in-left">
        <h2 className="text-4xl font-bold drop-shadow-lg">
          Trouble Logging In?
        </h2>
        <p className="text-lg drop-shadow-md">
          Don’t worry! Just enter your registered email below, and we’ll send you a secure link to reset your password and get you back into your account.
        </p>
      </div>

      {/* Form card */}
      <div className="flex w-full max-w-sm flex-col gap-6 md:mr-28">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
