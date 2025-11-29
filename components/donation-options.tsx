"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

export function DonationOptions() {
  const [selectedAmount, setSelectedAmount] = useState(50000)
  const [donationType, setDonationType] = useState("one-time")

  const presetAmounts = [25000, 50000, 100000, 250000, 500000]

  return (
    <section id="donation-options" className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Support SFUP Today</h2>
          <p className="text-lg text-foreground/70">
            Choose how you want to contribute to our movement for unity and progress
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          {/* Donation Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-4">Donation Type</label>
            <div className="flex gap-4">
              <button
                onClick={() => setDonationType("one-time")}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  donationType === "one-time"
                    ? "bg-secondary text-white"
                    : "bg-muted text-foreground hover:bg-secondary/20"
                }`}
              >
                One-Time Donation
              </button>
              <button
                onClick={() => setDonationType("monthly")}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  donationType === "monthly"
                    ? "bg-secondary text-white"
                    : "bg-muted text-foreground hover:bg-secondary/20"
                }`}
              >
                Monthly Support
              </button>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-4">Select Amount (KES)</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-3 rounded-lg font-bold transition-colors ${
                    selectedAmount === amount
                      ? "bg-secondary text-white"
                      : "bg-muted text-foreground hover:bg-secondary/20"
                  }`}
                >
                  {amount.toLocaleString()}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Custom Amount (KES)</label>
              <input
                type="number"
                value={selectedAmount}
                onChange={(e) => setSelectedAmount(Number.parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Enter custom amount"
              />
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <input type="checkbox" id="anonymous" className="w-4 h-4 rounded" />
              <label htmlFor="anonymous" className="text-foreground cursor-pointer">
                Make this donation anonymous
              </label>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-foreground font-medium">Donation Amount:</span>
              <span className="text-2xl font-bold text-secondary">KES {selectedAmount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground font-medium">Type:</span>
              <span className="text-foreground">{donationType === "one-time" ? "One-Time" : "Monthly Recurring"}</span>
            </div>
          </div>

          {/* Donate Button */}
          <button className="w-full bg-secondary text-white py-4 rounded-lg font-bold text-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2">
            <Heart size={20} />
            Proceed to Payment
          </button>

          <p className="text-xs text-foreground/60 text-center mt-4">
            All donations are secure and confidential. SFUP is a registered political party.
          </p>
        </div>
      </div>
    </section>
  )
}
