"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!memberId.trim()) {
            toast.error("Please enter your member ID")
            return
        }

        setLoading(true)
        try {
            const response = await api.patch(`/api/members/deactivate/idno/${memberId.trim()}`)
            if (response.data?.statusCode === 200) {
                toast.success(response.data?.message || "Membership cancelled successfully")
                setMemberId("")
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
                        <DialogTitle className="text-center text-2xl">Cancel Membership</DialogTitle>
                        <DialogDescription className="text-center">
                            Enter your member ID to cancel your membership with SFUP.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div>
                            <label
                                htmlFor="memberId"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Member ID *
                            </label>
                            <input
                                id="memberId"
                                type="text"
                                required
                                placeholder="e.g. SFUP-2024-001"
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                                className="w-full px-4 py-3 border border-border rounded-lg
                                focus:outline-none focus:border-secondary"
                            />
                        </div>

                        <div className="flex gap-3">
                            {/* <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsOpen(false)
                                    setMemberId("")
                                }}
                                className="flex-1"
                            >
                                Cancel
                            </Button> */}
                            <Button
                                type="submit"
                                disabled={loading || !memberId.trim()}
                                className="flex-1 bg-accent hover:bg-accent/90"
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
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
