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
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import api from "@/lib/axios"
import toast from "react-hot-toast"

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
    const [isOpen, setIsOpen] = useState(false)
    const [searchResult, setSearchResult] = useState<Member | null>(null)
    const [loading, setLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!nationalId.trim()) return

        setLoading(true)
        setSearchResult(null)
        setHasSearched(false)

        try {
            const response = await api.get(`/api/members/get/member/idno/${nationalId.trim()}`)
            if (response.data?.statusCode === 200 || response.data?.data) {
                setSearchResult(response.data.data)
            } else {
                setSearchResult(null)
            }
        } catch (error) {
            console.error("Verification error:", error)
            setSearchResult(null)
            // Optional: toast.error("Could not verify details. Please try again.")
        } finally {
            setLoading(false)
            setHasSearched(true)
            setIsOpen(true)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        setHasSearched(false)
        setNationalId("")
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto flex items-center justify-center mb-2">
                        <img src="/SFU-LOGO.png" alt="SFU Party Logo" className="w-24 h-auto" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Verify Membership</CardTitle>
                    <CardDescription>
                        Enter your National ID or Passport number to check your membership status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleVerify} className="space-y-4">
                        <div>
                            <label
                                htmlFor="nationalId"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                National ID / Passport No. *
                            </label>

                            <input
                                id="nationalId"
                                type="text"
                                required
                                placeholder="e.g. 12345678"
                                value={nationalId}
                                onChange={(e) => setNationalId(e.target.value)}
                                className="w-full px-4 py-3 border border-border rounded-lg text-lg
                                focus:outline-none focus:border-secondary"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!nationalId.trim() || loading}
                            className="w-full bg-secondary text-white py-3 rounded-lg font-bold
             hover:bg-secondary/90 transition-colors
             flex items-center justify-center gap-2
             disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Verifying...
                                </>
                            ) : (
                                "Verify Status"
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <Button variant="link" asChild className="text-muted-foreground">
                                <Link href="/">Back to Home</Link>
                            </Button>
                        </div>
                    </form>

                </CardContent>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl flex flex-col items-center gap-2">
                            {searchResult ? (
                                <>
                                    <img src="/SFU-LOGO.png" alt="SFU Party Logo" className="w-16 h-auto mb-2" />
                                    Member Verified
                                </>
                            ) : (
                                <>
                                    <img src="/SFU-LOGO.png" alt="SFU Party Logo" className="w-16 h-auto mb-2" />
                                    Member Not Found
                                </>
                            )}
                        </DialogTitle>
                    </DialogHeader>

                    {searchResult ? (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Full Name</p>
                                    <p className="font-semibold">{searchResult.first_name} {searchResult.last_name}</p>
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
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${searchResult.status === "ACTIVE"
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
                            <DialogDescription className="text-center text-base">
                                We couldn't find a member with ID <strong>{nationalId}</strong>.
                            </DialogDescription>
                            <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
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

