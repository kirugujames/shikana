"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import api from "@/lib/axios"
import toast from "react-hot-toast"

export function CancelMembership() {
    const [isOpen, setIsOpen] = useState(false)
    const [memberId, setMemberId] = useState("")
    const [nationalId, setNationalId] = useState("")
    const [loading, setLoading] = useState(false)
    const [hasConsent, setHasConsent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!memberId.trim()) {
            toast.error("Please enter your member ID")
            return
        }

        if (!nationalId.trim()) {
            toast.error("Please enter your National ID")
            return
        }

        setLoading(true)
        try {
            const response = await api.patch(
                `/api/members/deactivate/idno/${memberId.trim()}`,
                {
                    memberId: memberId.trim(),
                    nationalId: nationalId.trim(),
                    hasConsent,
                } // adjust if backend expects differently
            )

            if (response.data?.statusCode === 200) {
                toast.success(response.data?.message || "Membership cancelled successfully")
                setMemberId("")
                setNationalId("")
                setHasConsent(false)
                setIsOpen(false)
            } else {
                toast.error(response.data?.message || "Failed to cancel membership")
            }
        } catch (error) {
            console.error("Cancel membership error:", error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-sm text-secondary hover:underline cursor-pointer font-medium"
            >
                Click here
            </button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto flex items-center justify-center mb-4">
                            <img src="/SFU-LOGO.png" alt="SFU Party Logo" className="w-20 h-auto" />
                        </div>
                        <DialogTitle className="text-center text-2xl">
                            Cancel Membership
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Enter your details below to cancel your membership with SFUP.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        {/* Member ID */}
                        <div>
                            <label
                                htmlFor="memberId"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Member ID *
                            </label>
                            <Input
                                id="memberId"
                                required
                                placeholder="e.g. SFUP-2024-001"
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                                className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                            />
                        </div>

                        {/* National ID */}
                        <div>
                            <label
                                htmlFor="nationalId"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                National ID *
                            </label>
                            <Input
                                id="nationalId"
                                required
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="e.g. 12345678"
                                value={nationalId}
                                onChange={(e) =>
                                    setNationalId(e.target.value.replace(/\D/g, ""))
                                }
                                className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                            />
                        </div>

                        {/* Consent */}
                        <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors">
                            <input
                                type="checkbox"
                                checked={hasConsent}
                                onChange={(e) => setHasConsent(e.target.checked)}
                                required
                                className="w-4 h-4 accent-secondary mt-1 flex-shrink-0 cursor-pointer"
                            />
                            <span className="text-sm text-foreground text-left">
                                I confirm that I wish to cancel my membership with SFUP and I understand this action is permanent. *
                            </span>
                        </label>

                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                !memberId.trim() ||
                                !nationalId.trim() ||
                                !hasConsent
                            }
                            className="w-full bg-accent hover:bg-accent/90 h-10"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={16} />
                                    Processing...
                                </>
                            ) : (
                                "Cancel Membership"
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
