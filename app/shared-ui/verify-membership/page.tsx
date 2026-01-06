"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, UserCheck, UserX } from "lucide-react"
import Link from "next/link"

// Mock Data for verification
const MOCK_MEMBERS = [
    {
        id: "12345678",
        name: "John Doe",
        membershipNo: "SFU-2024-001",
        status: "Active",
        branch: "Nairobi Central",
    },
    {
        id: "87654321",
        name: "Jane Smith",
        membershipNo: "SFU-2024-002",
        status: "Active",
        branch: "Mombasa",
    },
    {
        id: "11223344",
        name: "Alice Johnson",
        membershipNo: "SFU-2024-003",
        status: "Pending",
        branch: "Kisumu",
    },
]

export default function VerifyMembershipPage() {
    const [nationalId, setNationalId] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [searchResult, setSearchResult] = useState<(typeof MOCK_MEMBERS)[0] | null>(null)
    const [hasSearched, setHasSearched] = useState(false)

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault()
        if (!nationalId.trim()) return

        // Simulating API call
        const result = MOCK_MEMBERS.find((m) => m.id === nationalId.trim())
        setSearchResult(result || null)
        setHasSearched(true)
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
        setHasSearched(false)
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-muted/30">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <Search className="w-6 h-6 text-primary" />
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
                            disabled={!nationalId.trim()}
                            className="w-full bg-secondary text-white py-3 rounded-lg font-bold
             hover:bg-secondary/90 transition-colors
             flex items-center justify-center gap-2
             disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Verify Status
                        </button>


                    </form>

                </CardContent>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl flex flex-col items-center gap-2">
                            {searchResult ? (
                                <>
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                                        <UserCheck className="w-6 h-6" />
                                    </div>
                                    Member Verified
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-2">
                                        <UserX className="w-6 h-6" />
                                    </div>
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
                                    <p className="font-semibold">{searchResult.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Membership No</p>
                                    <p className="font-semibold">{searchResult.membershipNo}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Branch</p>
                                    <p className="font-semibold">{searchResult.branch}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-muted-foreground">Status</p>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${searchResult.status === "Active"
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
