"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"
import api from "@/lib/axios"
import toast, { Toaster } from "react-hot-toast"
import Link from "next/link"
import { CancelMembership } from "./cancel-membership"

type PaymentMethod = "mpesa" | "airtel"
type PaymentStatus = "idle" | "initiating" | "pending" | "success" | "failed"

const MEMBERSHIP_TYPES = [
  { value: "Free", label: "Free Membership" },
  { value: "Ordinary", label: "Ordinary Membership", fee: 100 },
  { value: "Life", label: "Life Membership", fee: 5000 },
]

export function RegisterForm() {
  const [counties, setCountiesData] = useState<any[]>([])
  const [subCountys, setSubCountiesData] = useState<any[]>([])
  const [wards, setWardsData] = useState<any[]>([])
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Existing form fields
  const [submitted, setSubmitted] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const [idNo, setIdNo] = useState("")
  const [docType, setDocType] = useState("")
  const [county, setCounty] = useState("")
  const [constituency, setConstituency] = useState("")
  const [ward, setWard] = useState("")
  const [areaOfInterest, setAreaOfInterest] = useState("")
  const [religion, setReligion] = useState("")
  const [ethnicity, setEthnicity] = useState("")
  const [postalAddress, setPostalAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [isPWD, setIsPWD] = useState("")
  const [ncpwdNumber, setNCPWDNumber] = useState("")
  const [pollingStation, setPollingStation] = useState("")
  const [streetVillage, setStreetVillage] = useState("")
  const [membershipStatus, setMembershipStatus] = useState("")
  const [specialInterest, setSpecialInterest] = useState("")
  const [localLeader, setLocalLeader] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [politicalDeclaration, setPoliticalDeclaration] = useState(false)
  const [termsConsent, setTermsConsent] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState("")
  const [membershipType, setMembershipType] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [paymentPhoneNumber, setPaymentPhoneNumber] = useState("")
  const [membershipNumber, setMembershipNumber] = useState("")
  const [isPaidMembership, setIsPaidMembership] = useState(false)
  const [paymentProcessed, setPaymentProcessed] = useState(false)

  const registrationFee = MEMBERSHIP_TYPES.find((type) => type.value === membershipType)?.fee || 0

  useEffect(() => {
    async function fetchCounties() {
      try {
        const response = await api.get("/api/locations/counties")
        setCountiesData(response.data.data)
      } catch (e) {
        console.error("Failed to fetch counties:", e)
      }
    }
    fetchCounties()
  }, [])

  const handleCountyChange = (countyName: string) => {
    const selectedCounty = counties.find((c) => c.name === countyName)
    if (selectedCounty) {
      setCounty(selectedCounty.name)
      fetchSubCounties(selectedCounty.id)
      setConstituency("")
      setWard("")
    }
  }

  const fetchSubCounties = async (countyId: number) => {
    try {
      const response = await api.get(`/api/locations/counties/${countyId}/subcounties`)
      setSubCountiesData(response.data.data)
    } catch (e) {
      setSubCountiesData([])
      console.error("Failed to fetch sub-counties:", e)
    }
  }

  const handleSubcountyChange = (subcountyName: string) => {
    const selectedSubcounty = subCountys.find((c) => c.name === subcountyName)
    if (selectedSubcounty) {
      setConstituency(selectedSubcounty.name)
      fetchWards(selectedSubcounty.id)
      setWard("")
    }
  }

  const fetchWards = async (subcountyId: number) => {
    try {
      const response = await api.get(`/api/locations/subcounties/${subcountyId}/wards`)
      setWardsData(response.data.data)
    } catch (e) {
      setWardsData([])
      console.error("Failed to fetch wards:", e)
    }
  }

  // Check if all mandatory fields are filled
  const isMandatoryFieldsFilled =
    firstName &&
    lastName &&
    email &&
    phone &&
    dob &&
    gender &&
    docType &&
    idNo &&
    county &&
    constituency &&
    ward &&
    areaOfInterest &&
    membershipType &&
    politicalDeclaration &&
    termsConsent

  const isPaymentRequired = membershipType === "Ordinary" || membershipType === "Life"
  const isPaymentComplete = !isPaymentRequired || (paymentMethod && paymentPhoneNumber.trim().length >= 9)
  const isFormValid = isMandatoryFieldsFilled && isPaymentComplete

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isPaymentRequired && !paymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    if (isPaymentRequired && paymentPhoneNumber.trim().length < 9) {
      toast.error("Please enter a valid phone number for payment")
      return
    }

    setSubmitted(true)
    setPaymentStatus("initiating")
    setErrorMessage(null)

    try {
      const response = await api.post("/api/members/register/member", {
        first_name: firstName,
        last_name: lastName,
        email,
        dob,
        gender,
        phone,
        idNo,
        doc_type: docType,
        Constituency: constituency,
        ward,
        county,
        area_of_interest: areaOfInterest,
        religion,
        ethnicity,
        postalAddress,
        postalCode,
        isPWD,
        ncpwdNumber,
        pollingStation,
        streetVillage,
        membershipStatus,
        specialInterest,
        localLeader,
        verificationCode,
        politicalDeclaration,
        termsConsent,
        verificationMethod,
        membershipType,
        paymentMethod: isPaymentRequired ? paymentMethod : null,
        paymentPhoneNumber: isPaymentRequired ? paymentPhoneNumber : null,
        amount: registrationFee,
      })

      if (response.data?.statusCode === 201) {
        setPaymentStatus("success")
        toast.success(response.data?.message || "Registration successful!")
        // Reset form after success
        resetForm()
      } else {
        setPaymentStatus("failed")
        setErrorMessage(response.data?.message || "Registration failed")
        toast.error(response.data?.message || "Registration failed")
      }
    } catch (error) {
      setPaymentStatus("failed")
      setErrorMessage("Something went wrong. Please try again.")
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitted(false)
    }
  }

  const handlePayment = async () => {
    setPaymentStatus("initiating")

    // Simulate payment delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setPaymentProcessed(true)
    setPaymentStatus("pending") // Set to pending or similar after initiation
    toast.success("Payment prompt sent to your phone!")
  }

  const resetForm = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setDob("")
    setGender("")
    setPhone("")
    setIdNo("")
    setDocType("")
    setCounty("")
    setConstituency("")
    setWard("")
    setAreaOfInterest("")
    setReligion("")
    setEthnicity("")
    setPostalAddress("")
    setPostalCode("")
    setIsPWD("")
    setNCPWDNumber("")
    setPollingStation("")
    setStreetVillage("")
    setMembershipStatus("")
    setSpecialInterest("")
    setLocalLeader("")
    setVerificationCode("")
    setPoliticalDeclaration(false)
    setTermsConsent(false)
    setVerificationMethod("")
    setMembershipType("")
    setPaymentMethod(null)
    setPaymentPhoneNumber("")
    setPaymentStatus("idle")
    setErrorMessage(null)
    setMembershipNumber("")
    setPaymentProcessed(false)
    setIsPaidMembership(false)
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
                As a member, you become part of a growing movement committed to unity, progress, and inclusive
                governance, with the power to actively shape the party's leadership, policies, and national direction.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Full Participation & Decision-Making</h3>
                  <p className="text-foreground/70 text-sm">
                    Engage in party structures at all levels, attend meetings, contribute to policy discussions, submit
                    proposals, petitions, and offer constructive criticism.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Voting & Leadership Opportunities</h3>
                  <p className="text-foreground/70 text-sm">
                    Vote and be voted for in party elections and nominations, and seek elective positions at ward,
                    constituency, county, national, and parliamentary levels.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Access to Information & Policy Influence</h3>
                  <p className="text-foreground/70 text-sm">
                    Receive key party documents such as the constitution, manifesto, and nomination rules, and influence
                    party laws, policies, and leadership priorities.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Events, Training & Member Protection</h3>
                  <p className="text-foreground/70 text-sm">
                    Attend member-only forums and national conventions, access civic education and capacity-building
                    programs, and enjoy protection of participation rights within a transparent accountability
                    framework.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="bg-card border border-border rounded-lg p-8 md:w-2/3 shadow-sm">
            <div className="mb-8 p-6 bg-secondary/5 border border-secondary/20 rounded-xl space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-secondary/10 p-1.5 rounded-full">
                  <CheckCircle className="text-secondary w-4 h-4" />
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Before registering as SFUP member, please ensure you're not registered to another political party
                  using <span className="font-bold text-secondary">*509#</span> or by visiting the{" "}
                  <a
                    href="https://ippms.orpp.or.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:underline font-medium"
                  >
                    IPPMS portal
                  </a>.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="text-sm">
                  <span className="text-foreground/60">Need to leave the party? </span>
                  <CancelMembership />
                </div>
                <div className="text-sm">
                  <span className="text-foreground/60">Already a member? </span>
                  <Link href="/shared-ui/verify-membership" className="text-secondary hover:underline font-medium">
                    Verify here
                  </Link>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">Registration Form</h3>
            <p className="text-sm text-foreground/60 mb-6">Register by filling out the membership registration form below.</p>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                ✓ Thank you for registering! We'll be in touch soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION 1: PERSONAL IDENTIFICATION */}
              <div>
                <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Personal Identification
                </h4>

                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Religion and Ethnicity fields */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Religion *</label>
                    <select
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    >
                      <option value="">Select Religion</option>
                      <option value="Christianity">Christianity</option>
                      <option value="Islam">Islam</option>
                      <option value="Hinduism">Hinduism</option>
                      <option value="Buddhism">Buddhism</option>
                      <option value="Judaism">Judaism</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Ethnicity / Tribe *</label>
                    <input
                      type="text"
                      value={ethnicity}
                      onChange={(e) => setEthnicity(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="e.g., Kikuyu, Maasai, Luo"
                    />
                  </div>
                </div>

                {/* DOB + Gender */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sex *</label>
                    <select
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
                </div>

                {/* Document Type + Number */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Document Type *</label>
                    <select
                      required
                      value={docType}
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
                      type="text" // Changed to text to avoid issues with leading zeros
                      required
                      value={idNo}
                      onChange={(e) => setIdNo(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="01234567"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: CONTACT INFORMATION */}
              <div className="border-t border-border pt-8">
                <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Contact Information
                </h4>

                {/* Email + Phone */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="+254 712 345 678"
                    />
                  </div>
                </div>

                {/* Postal Address and Postal Code */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Postal Address *</label>
                    <input
                      type="text"
                      value={postalAddress}
                      onChange={(e) => setPostalAddress(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Postal Code *</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="00100"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: DISABILITY & SPECIAL NEEDS */}
              <div className="border-t border-border pt-8">
                <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Disability & Special Needs
                </h4>

                {/* PWD and NCPWD Number fields */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Are you a PWD (Person with Disability)? *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pwd"
                        value="yes"
                        checked={isPWD === "yes"}
                        onChange={(e) => setIsPWD(e.target.value)}
                        className="w-4 h-4 text-secondary"
                      />
                      <span className="text-foreground">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pwd"
                        value="no"
                        checked={isPWD === "no"}
                        onChange={(e) => setIsPWD(e.target.value)}
                        className="w-4 h-4 text-secondary"
                      />
                      <span className="text-foreground">No</span>
                    </label>
                  </div>
                </div>

                {isPWD === "yes" && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-foreground mb-2">NCPWD Number *</label>
                    <input
                      type="text"
                      value={ncpwdNumber}
                      onChange={(e) => setNCPWDNumber(e.target.value)}
                      required={isPWD === "yes"}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="Enter your NCPWD registration number"
                    />
                  </div>
                )}
              </div>

              {/* SECTION 4: GEOGRAPHIC & VOTING LOCATION */}
              <div className="border-t border-border pt-8">
                <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Geographic & Voting Location
                </h4>

                {/* County + Constituency */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">County *</label>
                    <select
                      required
                      value={county}
                      onChange={(e) => handleCountyChange(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    >
                      <option value="">Select County</option>
                      {Array.isArray(counties) &&
                        counties.map((c: any) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Constituency *</label>
                    <select
                      required
                      value={constituency}
                      onChange={(e) => handleSubcountyChange(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      disabled={!county}
                    >
                      <option value="">Select Constituency</option>
                      {Array.isArray(subCountys) &&
                        subCountys.map((sc: any) => (
                          <option key={sc.id} value={sc.name}>
                            {sc.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Ward, Polling Station, and Street/Village fields */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Ward *</label>
                    <select
                      required
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      disabled={!constituency}
                    >
                      <option value="">Select Ward</option>
                      {Array.isArray(wards) &&
                        wards.map((w: any) => (
                          <option key={w.id} value={w.name}>
                            {w.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Polling Station *</label>
                    <input
                      type="text"
                      value={pollingStation}
                      onChange={(e) => setPollingStation(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="e.g., Nairobi Primary School"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-foreground mb-2">Street / Village</label>
                  <input
                    type="text"
                    value={streetVillage}
                    onChange={(e) => setStreetVillage(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="e.g., Westlands, Lavington"
                  />
                </div>
              </div>

              {/* SECTION 5: MEMBERSHIP DETAILS */}
              <div className="border-t border-border pt-8">
                <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Membership Details
                </h4>

                {/* Membership Status */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-foreground mb-3">Membership Status *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="memberStatus"
                        value="new"
                        checked={membershipStatus === "new"}
                        onChange={(e) => setMembershipStatus(e.target.value)}
                        className="w-4 h-4 text-secondary"
                      />
                      <span className="text-foreground">New Member</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="memberStatus"
                        value="returning"
                        checked={membershipStatus === "returning"}
                        onChange={(e) => setMembershipStatus(e.target.value)}
                        className="w-4 h-4 text-secondary"
                      />
                      <span className="text-foreground">Returning Member</span>
                    </label>
                  </div>
                </div>

                {membershipStatus === "returning" && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-foreground mb-2">Membership Number *</label>
                    <input
                      type="text"
                      value={membershipNumber}
                      onChange={(e) => setMembershipNumber(e.target.value)}
                      required={membershipStatus === "returning"}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="Enter your membership number"
                    />
                  </div>
                )}

                {/* Membership Type Selection */}
                <div className="mb-6 mt-6">
                  <label className="block text-sm font-medium text-foreground mb-2">Membership Type *</label>
                  <select
                    required
                    value={membershipType}
                    onChange={(e) => {
                      const val = e.target.value
                      setMembershipType(val)
                      const isPaid = val === "Ordinary" || val === "Life"
                      setIsPaidMembership(isPaid)
                      if (!isPaid) {
                        setPaymentProcessed(false)
                        setPaymentMethod(null)
                        setPaymentPhoneNumber("")
                      }
                    }}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Membership Type</option>
                    {MEMBERSHIP_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label} {type.fee !== undefined ? `- KES ${type.fee.toLocaleString()}` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Registration Fee Display */}
                {isPaidMembership && membershipType && (
                  <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Registration Fee</p>
                        <p className="text-sm font-medium text-foreground mt-1">
                          {MEMBERSHIP_TYPES.find((t) => t.value === membershipType)?.label}
                        </p>
                      </div>
                      <span className="text-2xl font-bold text-secondary">KES {registrationFee.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Payment sections for paid memberships */}
                {isPaidMembership && (
                  <div className="space-y-6">
                    {/* Payment Method Selection */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Payment Method *</label>

                      <div className="grid md:grid-cols-2 gap-4">
                        {(["mpesa", "airtel"] as PaymentMethod[]).map((method) => {
                          const isSelected = paymentMethod === method

                          return (
                            <label
                              key={method}
                              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all
                                ${isSelected
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
                        required={isPaidMembership}
                      />
                      <p className="text-xs text-muted-foreground mt-1.5">
                        Enter the phone number to receive payment prompt
                      </p>
                    </div>

                    {/* Process Payment Button */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handlePayment}
                        disabled={!paymentMethod || paymentPhoneNumber.trim().length < 9 || paymentProcessed}
                        className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {paymentStatus === "initiating" ? (
                          <>Processing...</>
                        ) : paymentProcessed ? (
                          <>✓ Payment Processed</>
                        ) : (
                          <>Process Payment</>
                        )}
                      </button>
                      {paymentProcessed && (
                        <p className="text-xs text-green-600 mt-2 text-center">
                          Payment initiated successfully. Please check your phone for the PIN prompt.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>



              {/* Special Interest and Local Leader fields */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Special Interest Group *</label>
                  <select
                    value={specialInterest}
                    onChange={(e) => setSpecialInterest(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Interest Group</option>
                    <option value="Elders">Elders</option>
                    <option value="Youths">Youths</option>
                    <option value="Women League">Women League</option>
                    <option value="Diaspora">Diaspora</option>
                    <option value="Marginalized">Marginalized Communities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Local Leader (Optional)</label>
                  <input
                    type="text"
                    value={localLeader}
                    onChange={(e) => setLocalLeader(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="Referred by (Name of Local Leader)"
                  />
                </div>
              </div>

              {/* SECTION 6: MEMBER DECLARATION */}
              <div className="border-t border-border pt-8">
                <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Member Declaration
                </h4>

                {/* Verification Code and declaration checkboxes */}
                {/* <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Verification Code (Sent via SMS) *
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                      placeholder="Enter 6-digit code"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors">
                    <input
                      type="checkbox"
                      checked={politicalDeclaration}
                      onChange={(e) => setPoliticalDeclaration(e.target.checked)}
                      required
                      className="w-4 h-4 text-secondary mt-1 flex-shrink-0"
                    />
                    <span className="text-sm text-foreground">
                      I hereby affirm/declare/confirm/verify that I am not a registered member of any other registered
                      political party in Kenya. *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-4 bg-muted/50 rounded-lg border border-border hover:bg-muted transition-colors">
                    <input
                      type="checkbox"
                      checked={termsConsent}
                      onChange={(e) => setTermsConsent(e.target.checked)}
                      required
                      className="w-4 h-4 text-secondary mt-1 flex-shrink-0"
                    />
                    <span className="text-sm text-foreground">
                      I have read and understand the terms and conditions, the privacy policy, and the applicable other
                      policies. I consent to having my application information stored and used for member recruitment
                      purposes as per the data protection policy and commit to abide by the Rules and Regulations of
                      Shikana Frontliners for Unity Party. *
                    </span>
                  </label>
                </div> */}
              </div>

              {/* SECTION 7: VERIFICATION METHOD */}
              <div className="border-t border-border pt-8">
                <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Verification Link Delivery
                </h4>

                {/* Verification method selection */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    How would you like to receive verification link? *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="verificationMethod"
                        value="sms"
                        checked={verificationMethod === "sms"}
                        onChange={(e) => setVerificationMethod(e.target.value)}
                        className="w-4 h-4 text-secondary"
                      />
                      <span className="text-foreground">Send Link by SMS</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="verificationMethod"
                        value="email"
                        checked={verificationMethod === "email"}
                        onChange={(e) => setVerificationMethod(e.target.value)}
                        className="w-4 h-4 text-secondary"
                      />
                      <span className="text-foreground">Send Link by Email</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  submitted || !politicalDeclaration || !termsConsent || (isPaidMembership && !paymentProcessed)
                }
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Registration
              </button>

              <p className="text-xs text-foreground/60 text-center mt-4">
                By registering, you agree to our Privacy Policy and consent to receive updates and communications from
                SFUP.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}




































// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { CheckCircle, Loader2, CheckCircleIcon, XCircle } from "lucide-react"
// import api from "@/lib/axios"
// import toast, { Toaster } from "react-hot-toast"
// import { Spinner } from "./ui/spinner"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
// import { Label } from "recharts"
// import { CancelMembership } from "./cancel-membership"

// type PaymentMethod = "mpesa" | "airtel"
// type PaymentStatus = "idle" | "initiating" | "pending" | "success" | "failed"

// const MEMBERSHIP_TYPES = [
//   { value: "Ordinary", label: "Ordinary Membership", fee: 100 },
//   { value: "Life", label: "Life Membership", fee: 5000 },
// ]

// export function RegisterForm() {
//   const [submitted, setSubmitted] = useState(false)
//   const [first_name, setFirstName] = useState("")
//   const [last_name, setLastName] = useState("")
//   const [email, setEmail] = useState("")
//   const [dob, setDob] = useState("")
//   const [gender, setGender] = useState("")
//   const [phone, setPhone] = useState("")
//   const [idNo, setIdNo] = useState("")
//   const [doc_type, setDocType] = useState("")
//   const [Constituency, setConstituency] = useState("")
//   const [ward, setWard] = useState("")
//   const [county, setCounty] = useState("")
//   const [area_of_interest, setAreaOfInterest] = useState("")
//   const [username, setUsername] = useState("")
//   const [role_id, setRoleId] = useState(2)

//   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
//   const [paymentPhoneNumber, setPaymentPhoneNumber] = useState("")
//   const [counties, setCountiesData] = useState<any[]>([]);
//   const [subCountys, setSubCountiesData] = useState<any[]>([]);
//   const [wards, setWardsData] = useState<any[]>([]);
//   const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle")
//   const [errorMessage, setErrorMessage] = useState<string | null>(null)
//   const [membershipType, setMembershipType] = useState("")

//   const registrationFee = MEMBERSHIP_TYPES.find(type => type.value === membershipType)?.fee || 0

//   const resetForm = () => {
//     setFirstName("")
//     setLastName("")
//     setEmail("")
//     setDob("")
//     setGender("")
//     setPhone("")
//     setIdNo("")
//     setDocType("")
//     setConstituency("")
//     setWard("")
//     setCounty("")
//     setAreaOfInterest("")
//     setPaymentMethod(null)
//     setPaymentPhoneNumber("")
//     setPaymentStatus("idle")
//     setErrorMessage(null)
//   }

//   useEffect(() => {
//     async function fetchCounties() {
//       try {
//         const response = await api.get("/api/locations/counties");
//         console.log("Counties response:", response.data.data);
//         setCountiesData(response.data.data);
//       } catch (e) {
//       }
//     }

//     fetchCounties();
//   }, []);

//   const handleCountyChange = (data: any) => {
//     console.log("Selected county data:", data);
//     const county = counties.find(c => c.name === data);
//     console.log("Matched county:", county);
//     if (county) {
//       setCounty(county.name);
//       getchSubCounties(county.id);
//     }

//   }

//   const subcountyChange = (data: any) => {
//     console.log("Selected subcounty data:", data);
//     const subCounty = subCountys.find(c => c.name === data);
//     if (subCounty) {
//       setConstituency(subCounty.name);
//       fetchWards(subCounty.id);
//     }
//   }

//   const getchSubCounties = async (data: any) => {
//     try {
//       const response = await api.get(`/api/locations/counties/${data}/subcounties`);
//       setSubCountiesData(response.data.data);
//     } catch (e) {
//       setSubCountiesData([]);
//     }
//   }

//   const fetchWards = async (data: any) => {
//     try {
//       const response = await api.get(`/api/locations/subcounties/${data}/wards`);
//       setWardsData(response.data.data);
//     } catch (e) {
//       setWardsData([]);
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!paymentMethod) {
//       toast.error("Please select a payment method")
//       return
//     }

//     if (paymentPhoneNumber.trim().length < 9) {
//       toast.error("Please enter a valid phone number for payment")
//       return
//     }

//     setSubmitted(true)
//     setPaymentStatus("initiating")
//     setErrorMessage(null)

//     try {
//       const response = await api.post("/api/members/register/member", {
//         first_name,
//         last_name,
//         email,
//         dob,
//         gender,
//         phone,
//         idNo,
//         doc_type,
//         Constituency,
//         ward,
//         county,
//         area_of_interest,
//         role_id,
//         username,
//         // Payment information
//         paymentMethod,
//         paymentPhoneNumber,
//         amount: registrationFee,
//       })

//       if (response.data?.statusCode == 201) {
//         setPaymentStatus("success")
//         resetForm()
//         toast.success(response.data?.message)
//       } else {
//         setPaymentStatus("failed")
//         setErrorMessage(response.data?.message || "Registration failed")
//         toast.error(response.data?.message)
//       }
//     } catch (error) {
//       setPaymentStatus("failed")
//       setErrorMessage("Something went wrong. Please try again.")
//       toast.error("Something went wrong. Please try again.")
//     } finally {
//       setSubmitted(false)
//     }
//   }

//   return (
//     <section className="w-full py-16 md:py-24 bg-background">
//       <Toaster position="top-right" />
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex md:flex-row flex-col gap-12 items-start">
//           {/* LEFT STATIC INFO COLUMN */}
//           <div className="space-y-8 lg:ms-20 md:w-1/3 sm:w-full">
//             <div>
//               <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
//                 Why Join SFUP?
//               </h2>
//               <p className="text-lg text-foreground/70 text-pretty">
//                 As a member, you become part of a growing movement committed to unity,
//                 progress, and inclusive governance, with the power to actively shape the
//                 party’s leadership, policies, and national direction.
//               </p>
//             </div>

//             <div className="space-y-6">
//               <div className="flex gap-4">
//                 <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
//                 <div>
//                   <h3 className="font-bold text-foreground mb-1">
//                     Full Participation & Decision-Making
//                   </h3>
//                   <p className="text-foreground/70 text-sm">
//                     Engage in party structures at all levels, attend meetings, contribute
//                     to policy discussions, submit proposals, petitions, and offer
//                     constructive criticism.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
//                 <div>
//                   <h3 className="font-bold text-foreground mb-1">
//                     Voting & Leadership Opportunities
//                   </h3>
//                   <p className="text-foreground/70 text-sm">
//                     Vote and be voted for in party elections and nominations, and seek
//                     elective positions at ward, constituency, county, national, and
//                     parliamentary levels.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
//                 <div>
//                   <h3 className="font-bold text-foreground mb-1">
//                     Access to Information & Policy Influence
//                   </h3>
//                   <p className="text-foreground/70 text-sm">
//                     Receive key party documents such as the constitution, manifesto, and
//                     nomination rules, and influence party laws, policies, and leadership
//                     priorities.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <CheckCircle className="text-secondary mt-1 flex-shrink-0" size={24} />
//                 <div>
//                   <h3 className="font-bold text-foreground mb-1">
//                     Events, Training & Member Protection
//                   </h3>
//                   <p className="text-foreground/70 text-sm">
//                     Attend member-only forums and national conventions, access civic
//                     education and capacity-building programs, and enjoy protection of
//                     participation rights within a transparent accountability framework.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>


//           {/* RIGHT — FORM */}
//           <div className="bg-card border border-border rounded-lg p-8 md:w-2/3 shadow-sm">
//             <h3 className="text-2xl font-bold text-foreground mb-6">Registration Form</h3>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Name Fields */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     required
//                     value={first_name}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                     placeholder="John"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     required
//                     value={last_name}
//                     onChange={(e) => setLastName(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                     placeholder="Doe"
//                   />
//                 </div>
//               </div>

//               {/* Email + Phone */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                     placeholder="john@example.com"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                     placeholder="+254 712 345 678"
//                   />
//                 </div>
//               </div>

//               {/* DOB + Gender */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Date of Birth *</label>
//                   <input
//                     type="date"
//                     name="birthDate"
//                     required
//                     value={dob}
//                     onChange={(e) => setDob(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Sex *</label>
//                   <select
//                     name="sex"
//                     required
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Doc Type + Number */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Document Type *</label>
//                   <select
//                     name="docType"
//                     required
//                     value={doc_type}
//                     onChange={(e) => setDocType(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                   >
//                     <option value="">Select Document Type</option>
//                     <option value="Passport">Passport</option>
//                     <option value="National ID">National ID</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Document Number *</label>
//                   <input
//                     type="number"
//                     name="docNumber"
//                     required
//                     value={idNo}
//                     onChange={(e) => setIdNo(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                     placeholder="01234567"
//                   />
//                 </div>
//               </div>

//               {/* County + Constituency */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">County *</label>
//                   <select
//                     name="county"
//                     required
//                     value={county}
//                     onChange={(e) => handleCountyChange(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                   >
//                     {
//                       Array.isArray(counties) && counties.map((county: any) => (
//                         <option key={county.id} value={county.name}>
//                           {county.name}
//                         </option>
//                       ))
//                     }
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Constituency *</label>
//                   <select
//                     name="constituency"
//                     required
//                     value={Constituency}
//                     onChange={(e) => subcountyChange(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                   >
//                     {
//                       Array.isArray(subCountys) && subCountys.map((subcounty: any) => (
//                         <option key={subcounty.id} value={subcounty.name}>
//                           {subcounty.name}
//                         </option>
//                       ))
//                     }
//                   </select>
//                 </div>
//               </div>

//               {/* Ward + Area of Interest */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Ward *</label>
//                   <select
//                     required
//                     value={ward}
//                     onChange={(e) => setWard(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                   >
//                     {
//                       Array.isArray(wards) && wards.map((ward: any) => (
//                         <option key={ward.id} value={ward.name}>
//                           {ward.name}
//                         </option>
//                       ))
//                     }

//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Area of Interest *</label>
//                   <select
//                     required
//                     value={area_of_interest}
//                     onChange={(e) => setAreaOfInterest(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                   >
//                     <option value="">Select Area of Interest</option>
//                     <option value="politics">Politics</option>
//                     <option value="community work">Community Work</option>
//                     <option value="youth engagement">Youth Engagement</option>
//                     <option value="policy development">Policy Development</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="border-t border-border pt-6 mt-8">
//                 <h4 className="text-lg font-bold text-foreground mb-4">Membership & Payment Information</h4>

//                 {/* Membership Type Selection */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-foreground mb-2">Membership Type *</label>
//                   <select
//                     required
//                     value={membershipType}
//                     onChange={(e) => setMembershipType(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                   >
//                     <option value="">Select Membership Type</option>
//                     {MEMBERSHIP_TYPES.map((type) => (
//                       <option key={type.value} value={type.value}>
//                         {type.label} - KES {type.fee.toLocaleString()}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Registration Fee Display */}
//                 {membershipType && (
//                   <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-xs text-muted-foreground">Registration Fee</p>
//                         <p className="text-sm font-medium text-foreground mt-1">
//                           {MEMBERSHIP_TYPES.find(t => t.value === membershipType)?.label}
//                         </p>
//                       </div>
//                       <span className="text-2xl font-bold text-secondary">KES {registrationFee.toLocaleString()}</span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Payment Method Selection */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-foreground mb-3">Payment Method *</label>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     {(["mpesa", "airtel"] as PaymentMethod[]).map((method) => {
//                       const isSelected = paymentMethod === method

//                       return (
//                         <label
//                           key={method}
//                           className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all
//                             ${isSelected
//                               ? "border-secondary bg-secondary/10 ring-2 ring-secondary/20"
//                               : "border-border hover:bg-muted hover:border-secondary/50"
//                             }`}
//                         >
//                           <input
//                             type="radio"
//                             name="paymentMethod"
//                             checked={isSelected}
//                             onChange={() => setPaymentMethod(method)}
//                             className="w-4 h-4 text-secondary"
//                           />

//                           <img
//                             src={method === "mpesa" ? "/mpesa_logo.webp" : "/airtel_logo.svg"}
//                             alt={method === "mpesa" ? "M-Pesa" : "Airtel Money"}
//                             className="h-7 w-auto"
//                           />

//                           <span className="font-medium text-foreground">
//                             {method === "mpesa" ? "M-Pesa" : "Airtel Money"}
//                           </span>
//                         </label>
//                       )
//                     })}
//                   </div>
//                 </div>

//                 {/* Payment Phone Number */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">Payment Phone Number *</label>
//                   <input
//                     type="tel"
//                     value={paymentPhoneNumber}
//                     onChange={(e) => setPaymentPhoneNumber(e.target.value)}
//                     className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
//                     placeholder="07XXXXXXXX"
//                     required
//                   />
//                   <p className="text-xs text-muted-foreground mt-1.5">
//                     Enter the phone number to receive payment prompt
//                   </p>
//                 </div>
//               </div>

//               {paymentStatus === "pending" && (
//                 <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
//                   <Loader2 className="animate-spin text-secondary flex-shrink-0" size={20} />
//                   <span className="text-sm text-foreground">Waiting for payment confirmation on your phone…</span>
//                 </div>
//               )}

//               {paymentStatus === "success" && (
//                 <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-900">
//                   <CheckCircleIcon className="flex-shrink-0" size={20} />
//                   <span className="text-sm font-medium">Payment successful. Thank you for registering!</span>
//                 </div>
//               )}

//               {paymentStatus === "failed" && errorMessage && (
//                 <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900">
//                   <XCircle className="flex-shrink-0" size={20} />
//                   <span className="text-sm font-medium">{errorMessage}</span>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={submitted || paymentStatus === "initiating"}
//                 className="w-full bg-secondary text-secondary-foreground py-3.5 rounded-lg font-bold text-base hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {submitted || paymentStatus === "initiating" ? (
//                   <>
//                     <Spinner />
//                     <span>Processing...</span>
//                   </>
//                 ) : (
//                   "Complete Registration & Pay"
//                 )}
//               </button>

//               <p className="text-xs text-muted-foreground text-center mt-4 text-pretty">
//                 By registering, you agree to our Privacy Policy and consent to receive updates and communications from SFUP. To complete your registration, you will receive a payment prompt on your phone.
//               </p>
//               <p className="text-center mt-2">
//                 <span className="text-xs text-muted-foreground">Need to leave the party? </span>
//                 <CancelMembership />
//                 <span className="text-xs text-muted-foreground"> to unregister at any time.</span>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
