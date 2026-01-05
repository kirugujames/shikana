"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle, Loader2, CheckCircleIcon, XCircle } from "lucide-react"
import api from "@/lib/axios"
import toast, { Toaster } from "react-hot-toast"
import { Spinner } from "./ui/spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "recharts"

type PaymentMethod = "mpesa" | "airtel"
type PaymentStatus = "idle" | "initiating" | "pending" | "success" | "failed"

export function RegisterForm() {
  const [submitted, setSubmitted] = useState(false)
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const [idNo, setIdNo] = useState("")
  const [doc_type, setDocType] = useState("")
  const [Constituency, setConstituency] = useState("")
  const [ward, setWard] = useState("")
  const [county, setCounty] = useState("")
  const [area_of_interest, setAreaOfInterest] = useState("")
  const [username, setUsername] = useState("")
  const [role_id, setRoleId] = useState(2)

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [paymentPhoneNumber, setPaymentPhoneNumber] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const registrationFee = 1000 // Fixed amount

  const resetForm = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setDob("")
    setGender("")
    setPhone("")
    setIdNo("")
    setDocType("")
    setConstituency("")
    setWard("")
    setCounty("")
    setAreaOfInterest("")
    setPaymentMethod(null)
    setPaymentPhoneNumber("")
    setPaymentStatus("idle")
    setErrorMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!paymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    if (paymentPhoneNumber.trim().length < 9) {
      toast.error("Please enter a valid phone number for payment")
      return
    }

    setSubmitted(true)
    setPaymentStatus("initiating")
    setErrorMessage(null)

    try {
      const response = await api.post("/api/members/register/member", {
        first_name,
        last_name,
        email,
        dob,
        gender,
        phone,
        idNo,
        doc_type,
        Constituency,
        ward,
        county,
        area_of_interest,
        role_id,
        username,
        // Payment information
        paymentMethod,
        paymentPhoneNumber,
        amount: registrationFee,
      })

      if (response.data?.statusCode == 201) {
        setPaymentStatus("success")
        resetForm()
        toast.success(response.data?.message)
      } else {
        setPaymentStatus("failed")
        setErrorMessage(response.data?.message || "Registration failed")
        toast.error(response.data?.message)
      }
    } catch (error) {
      setPaymentStatus("failed")
      setErrorMessage("Something went wrong. Please try again.")
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitted(false)
    }
  }

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex md:flex-row flex-col gap-12 items-start">
          {/* LEFT STATIC INFO COLUMN */}
          <div className="space-y-8 lg:ms-20 md:w-1/3 sm:w-full">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Why Join SFUP?</h2>
              <p className="text-lg text-foreground/70 text-pretty">
                As a member, you'll be part of a growing movement dedicated to unity, progress, and inclusive
                governance.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Influence Party Decisions</h3>
                  <p className="text-foreground/70 text-sm">Vote on policy priorities and party leadership</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Access Exclusive Events</h3>
                  <p className="text-foreground/70 text-sm">Attend member-only forums and networking events</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Volunteer Opportunities</h3>
                  <p className="text-foreground/70 text-sm">Participate in campaigns and community initiatives</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Direct Communication</h3>
                  <p className="text-foreground/70 text-sm">Receive updates directly from party leadership</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="bg-card border border-border rounded-lg p-8 md:w-2/3 shadow-sm">
            <h3 className="text-2xl font-bold text-foreground mb-6">Registration Form</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>

              {/* DOB + Gender */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="birthDate"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Sex *</label>
                  <select
                    name="sex"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="space-y-2">
                <Label>Sex *</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              </div>

              {/* Doc Type + Number */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Document Type *</label>
                  <select
                    name="docType"
                    required
                    value={doc_type}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Document Type</option>
                    <option value="Passport">Passport</option>
                    <option value="National ID">National ID</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Document Number *</label>
                  <input
                    type="number"
                    name="docNumber"
                    required
                    value={idNo}
                    onChange={(e) => setIdNo(e.target.value)}
                    className="w-full px-4 bg-background py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                    placeholder="01234567"
                  />
                </div>
              </div>

              {/* County + Constituency */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">County *</label>
                  <select
                    name="county"
                    required
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select County</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kitui">Kitui</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Constituency *</label>
                  <select
                    name="constituency"
                    required
                    value={Constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Constituency</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kitui">Kitui</option>
                  </select>
                </div>
              </div>

              {/* Ward + Area of Interest */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ward *</label>
                  <select
                    required
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Ward</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kitui">Kitui</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Area of Interest *</label>
                  <select
                    required
                    value={area_of_interest}
                    onChange={(e) => setAreaOfInterest(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Area of Interest</option>
                    <option value="politics">Politics</option>
                    <option value="community work">Community Work</option>
                    <option value="youth engagement">Youth Engagement</option>
                    <option value="policy development">Policy Development</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-border pt-6 mt-8">
                <h4 className="text-lg font-bold text-foreground mb-4">Payment Information</h4>

                {/* Registration Fee Display */}
                <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Registration Fee</span>
                    <span className="text-2xl font-bold text-secondary">KES {registrationFee.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-3">Payment Method *</label>

                  <div className="grid md:grid-cols-2 gap-4">
                    {(["mpesa", "airtel"] as PaymentMethod[]).map((method) => {
                      const isSelected = paymentMethod === method

                      return (
                        <label
                          key={method}
                          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all
                            ${
                              isSelected
                                ? "border-secondary bg-secondary/10 ring-2 ring-secondary/20"
                                : "border-border hover:bg-muted hover:border-secondary/50"
                            }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={isSelected}
                            onChange={() => setPaymentMethod(method)}
                            className="w-4 h-4 text-secondary"
                          />

                          <img
                            src={method === "mpesa" ? "/mpesa_logo.webp" : "/airtel_logo.svg"}
                            alt={method === "mpesa" ? "M-Pesa" : "Airtel Money"}
                            className="h-7 w-auto"
                          />

                          <span className="font-medium text-foreground">
                            {method === "mpesa" ? "M-Pesa" : "Airtel Money"}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Payment Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Payment Phone Number *</label>
                  <input
                    type="tel"
                    value={paymentPhoneNumber}
                    onChange={(e) => setPaymentPhoneNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="07XXXXXXXX"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Enter the phone number to receive payment prompt
                  </p>
                </div>
              </div>

              {paymentStatus === "pending" && (
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
                  <Loader2 className="animate-spin text-secondary flex-shrink-0" size={20} />
                  <span className="text-sm text-foreground">Waiting for payment confirmation on your phone…</span>
                </div>
              )}

              {paymentStatus === "success" && (
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-900">
                  <CheckCircleIcon className="flex-shrink-0" size={20} />
                  <span className="text-sm font-medium">Payment successful. Thank you for registering!</span>
                </div>
              )}

              {paymentStatus === "failed" && errorMessage && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900">
                  <XCircle className="flex-shrink-0" size={20} />
                  <span className="text-sm font-medium">{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitted || paymentStatus === "initiating"}
                className="w-full bg-secondary text-secondary-foreground py-3.5 rounded-lg font-bold text-base hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitted || paymentStatus === "initiating" ? (
                  <>
                    <Spinner />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Complete Registration & Pay"
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4 text-pretty">
                By registering, you agree to receive updates and communications from SFUP. You will receive a payment
                prompt on your phone to complete the registration.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
