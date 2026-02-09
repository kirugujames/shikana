"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import api from "@/lib/axios"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

type Member = {
    id: number
    first_name: string
    last_name: string
    member_code: string
    county: string
    constituency: string
    ward: string
    email: string
    phone: string
    status: "ACTIVE" | "INACTIVE"
}

export default function VerifyMembershipPage() {
    const [nationalId, setNationalId] = useState("")
    const [phone, setPhone] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [searchResult, setSearchResult] = useState<Member | null>(null)
    const [requestLoading, setRequestLoading] = useState(false)
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)
    const [hasConsent, setHasConsent] = useState(false)
    const [step, setStep] = useState<"request" | "otp">("request")
    const [otp, setOtp] = useState("")
    const [requestMessage, setRequestMessage] = useState<string | null>(null)
    const [requestError, setRequestError] = useState<string | null>(null)
    const [verifyError, setVerifyError] = useState<string | null>(null)

    const resetFlow = () => {
        setStep("request")
        setOtp("")
        setRequestMessage(null)
        setRequestError(null)
        setVerifyError(null)
    }

    const handleRequestOtp = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!nationalId.trim() || !phone.trim()) return

        setRequestLoading(true)
        setRequestMessage(null)
        setRequestError(null)
        setVerifyError(null)

        try {
            const response = await api.post(
                "/api/members/verify/request-otp",
                {
                    idNo: nationalId.trim(),
                    phone: phone.trim(),
                    hasConsent,
                },
                { validateStatus: () => true }
            )

            if (response.data?.statusCode === 200) {
                setRequestMessage(response.data?.message || "OTP sent successfully.")
                setStep("otp")
            } else {
                setRequestError(response.data?.message || "Failed to send OTP.")
            }
        } catch (error) {
            console.error("Request OTP error:", error)
            setRequestError("Something went wrong. Please try again.")
        } finally {
            setRequestLoading(false)
        }
    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!nationalId.trim() || !phone.trim() || otp.length !== 6) return

        setVerifyLoading(true)
        setVerifyError(null)
        setSearchResult(null)
        setHasSearched(false)

        try {
            const response = await api.post(
                "/api/members/verify/existence",
                {
                    idNo: nationalId.trim(),
                    phone: phone.trim(),
                    otp,
                    hasConsent,
                },
                { validateStatus: () => true }
            )

            if (response.data?.statusCode === 200 || response.data?.data) {
                setSearchResult(response.data.data)
                setIsOpen(true)
            } else if (response.data?.statusCode === 404) {
                setSearchResult(null)
                setIsOpen(true)
            } else {
                setVerifyError(response.data?.message || "Verification failed.")
            }
        } catch (error) {
            console.error("Verification error:", error)
            setVerifyError("Something went wrong. Please try again.")
        } finally {
            setVerifyLoading(false)
            setHasSearched(true)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        setHasSearched(false)
        setNationalId("")
        setPhone("")
        setHasConsent(false)
        resetFlow()
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
            <Card className="w-full max-w-md shadow-none border">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto flex items-center justify-center mb-2">
                        <img src="/SFU-LOGO.png" alt="SFU Party Logo" className="w-24 h-auto" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Verify Membership</CardTitle>
                    <CardDescription>
                        Enter your National ID / Passport number and phone number to check your membership status.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={step === "request" ? handleRequestOtp : handleVerify} className="space-y-4">
                        {/* National ID */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                National ID / Passport No. *
                            </label>
                            <Input
                                required
                                placeholder="e.g. 12345678"
                                value={nationalId}
                                onChange={(e) => {
                                    setNationalId(e.target.value.replace(/\D/g, ""))
                                    resetFlow()
                                }}
                                disabled={step === "otp"}
                                className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                            />
                        </div>

                        {/* Phone Number (UPDATED) */}
                        {/* <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Phone Number *
                            </label>
                            <Input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "")
                                    if (val.startsWith("0")) {
                                        setPhone("254" + val.substring(1))
                                    } else {
                                        setPhone(val)
                                    }
                                }}
                                className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                                placeholder="2547XXXXXXXX"
                            />
                        </div> */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Phone Number *
                            </label>
                            <Input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => {
                                    let val = e.target.value.replace(/\D/g, "")

                                    if (val.startsWith("0")) {
                                        val = "254" + val.substring(1)
                                    }

                                    // 🔒 limit to 12 digits
                                    if (val.length > 12) {
                                        val = val.slice(0, 12)
                                    }

                                    setPhone(val)
                                    resetFlow()
                                }}
                                maxLength={12}
                                disabled={step === "otp"}
                                className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                                placeholder="2547XXXXXXXX"
                            />
                        </div>


                        {/* Consent */}
                        <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/40 transition-colors">
                            <input
                                type="checkbox"
                                checked={hasConsent}
                                onChange={(e) => {
                                    setHasConsent(e.target.checked)
                                    resetFlow()
                                }}
                                required
                                className="w-4 h-4 accent-secondary mt-1 flex-shrink-0 cursor-pointer"
                            />
                            <span className="text-sm text-foreground cursor-pointer">
                                I consent to verify my membership status using my details provided above. *
                            </span>
                        </label>

                        {step === "request" && requestError && (
                            <p className="text-sm text-red-600 text-center">
                                {requestError}
                            </p>
                        )}

                        {step === "otp" && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Enter OTP *
                                </label>
                                <InputOTP
                                    maxLength={6}
                                    value={otp}
                                    onChange={(value) => setOtp(value)}
                                    required
                                    containerClassName="justify-center"
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>

                                {requestMessage && (
                                    <p className="text-sm text-muted-foreground text-center">
                                        {requestMessage}
                                    </p>
                                )}
                                {requestError && (
                                    <p className="text-sm text-red-600 text-center">
                                        {requestError}
                                    </p>
                                )}
                                {verifyError && (
                                    <p className="text-sm text-red-600 text-center">
                                        {verifyError}
                                    </p>
                                )}
                                <div className="flex items-center justify-between text-sm">
                                    <button
                                        type="button"
                                        className="text-secondary hover:underline"
                                        onClick={handleRequestOtp}
                                        disabled={requestLoading}
                                    >
                                        Resend OTP
                                    </button>
                                    <button
                                        type="button"
                                        className="text-muted-foreground hover:underline"
                                        onClick={resetFlow}
                                        disabled={requestLoading || verifyLoading}
                                    >
                                        Edit details
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={
                                !nationalId.trim() ||
                                !phone.trim() ||
                                !hasConsent ||
                                requestLoading ||
                                verifyLoading ||
                                (step === "otp" && otp.length !== 6)
                            }
                            className="w-full bg-secondary text-white h-10 rounded-lg font-bold
                                hover:bg-secondary/90 transition-colors
                                flex items-center justify-center gap-2
                                disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {requestLoading || verifyLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    {step === "request" ? "Sending OTP..." : "Verifying..."}
                                </>
                            ) : (
                                step === "request" ? "Send OTP" : "Verify Status"
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <Button variant="link" asChild className="text-primary hover:text-primary/80">
                                <Link href="/shared-ui/register">Back to Registration</Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Result Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl flex flex-col items-center gap-2">
                            <img src="/SFU-LOGO.png" alt="SFU Party Logo" className="w-16 h-auto mb-2" />
                            {searchResult ? "Member Verified" : "Member Not Found"}
                        </DialogTitle>
                    </DialogHeader>

                    {searchResult ? (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Full Name</p>
                                    <p className="font-semibold">
                                        {searchResult.first_name} {searchResult.last_name}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Membership Code</p>
                                    <p className="font-semibold">{searchResult.member_code}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">County</p>
                                    <p className="font-semibold">{searchResult.county}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Constituency</p>
                                    <p className="font-semibold">{searchResult.constituency}</p>
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <p className="text-muted-foreground">Status</p>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            searchResult.status === "ACTIVE"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {searchResult.status}
                                    </span>
                                </div>
                            </div>

                            <Button className="w-full mt-4" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4 py-2 text-center">
                            <DialogDescription className="text-base">
                                We couldn't find a member with ID <strong>{nationalId}</strong>.
                            </DialogDescription>

                            <div className="border border-border p-4 rounded-lg text-sm text-muted-foreground hover:bg-muted/10 transition-colors">
                                <p>Not yet a member? Join us today to be part of the movement.</p>
                            </div>

                            <div className="flex flex-col gap-2 pt-2">
                                <Button asChild className="w-full" size="lg">
                                    <Link href="/shared-ui/register">Proceed to Registration</Link>
                                </Button>
                                <Button variant="ghost" onClick={handleClose}>
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
