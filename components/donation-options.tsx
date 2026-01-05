"use client"

import { useState } from "react"
import { Heart, Loader2, CheckCircle, XCircle } from "lucide-react"

type PaymentMethod = "mpesa" | "airtel"
type PaymentStatus = "idle" | "initiating" | "pending" | "success" | "failed"

export function DonationOptions() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // 🔹 Personal details
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const presetAmounts = [500, 1000, 5000, 10000, 100000]

  const personalDetailsValid =
    isAnonymous ||
    (firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "")

  const canSubmit =
    selectedAmount &&
    paymentMethod &&
    phoneNumber.trim().length >= 9 &&
    personalDetailsValid &&
    paymentStatus === "idle"

  async function handlePayment() {
    if (!canSubmit) return

    setPaymentStatus("initiating")
    setErrorMessage(null)

    try {
      const payload = {
        amount: selectedAmount,
        phoneNumber,
        paymentMethod,
        donationType,
        anonymous: isAnonymous,
        ...(isAnonymous
          ? {}
          : {
              firstName,
              lastName,
              email,
            }),
      }

      console.log("Donation payload:", payload)

      // 🔜 Replace with backend call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setPaymentStatus("pending")
    } catch (error) {
      setPaymentStatus("failed")
      setErrorMessage("Failed to initiate payment. Please try again.")
    }
  }

  return (
    <section id="donation-options" className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Support SFUP Today</h2>
          <p className="text-lg text-foreground/70">
            You will receive a payment prompt on your phone
          </p>
        </div>

        <div className="bg-card border rounded-lg p-8">

          {/* Donation Type */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4">Donation Type</label>
            <div className="flex gap-4">
              {(["one-time", "monthly"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setDonationType(type)}
                  className={`flex-1 py-3 rounded-lg ${
                    donationType === type
                      ? "bg-secondary text-white"
                      : "bg-muted hover:bg-secondary/20"
                  }`}
                >
                  {type === "one-time" ? "One-Time Donation" : "Monthly Support"}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4">Amount (KES)</label>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-3 rounded-lg font-bold ${
                    selectedAmount === amount
                      ? "bg-secondary text-white"
                      : "bg-muted hover:bg-secondary/20"
                  }`}
                >
                  {amount.toLocaleString()}
                </button>
              ))}
            </div>

            <input
              type="number"
              min={1}
              value={selectedAmount ?? ""}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value)
                setSelectedAmount(Number.isNaN(value) ? null : value)
              }}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Custom amount"
            />
          </div>

          {/* Personal Details */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="anonymous" className="cursor-pointer">
                Make this donation anonymous
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-4">
              Payment Method
            </label>

            <div className="flex gap-6">
              {(["mpesa", "airtel"] as PaymentMethod[]).map((method) => {
                const isSelected = paymentMethod === method

                return (
                  <label
                    key={method}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition
                      ${
                        isSelected
                          ? "border-secondary bg-secondary/10"
                          : "border-border hover:bg-muted"
                      }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={isSelected}
                      onChange={() => setPaymentMethod(method)}
                    />

                    <img
                      src={
                        method === "mpesa"
                          ? "/mpesa_logo.webp"
                          : "/airtel_logo.svg"
                      }
                      className="h-7 w-auto"
                    />

                    <span className="font-medium">
                      {method === "mpesa" ? "M-Pesa" : "Airtel Money"}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Phone */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="07XXXXXXXX"
            />
          </div>

          {/* Status UI */}
          {paymentStatus === "pending" && (
            <div className="flex items-center gap-3 p-4 mb-6 bg-muted rounded-lg">
              <Loader2 className="animate-spin" />
              <span>Waiting for payment confirmation on your phone…</span>
            </div>
          )}

          {paymentStatus === "success" && (
            <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 text-green-700 rounded-lg">
              <CheckCircle />
              <span>Payment successful. Thank you for your support!</span>
            </div>
          )}

          {paymentStatus === "failed" && (
            <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 text-red-700 rounded-lg">
              <XCircle />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            disabled={!canSubmit || paymentStatus !== "idle"}
            onClick={handlePayment}
            className="w-full bg-secondary text-white py-4 rounded-lg font-bold text-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {paymentStatus === "initiating" ? (
              <>
                <Loader2 className="animate-spin" />
                Initiating Payment…
              </>
            ) : (
              <>
                <Heart size={20} />
                Proceed to Payment
              </>
            )}
          </button>

        </div>
      </div>
    </section>
  )
}
