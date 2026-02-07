"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"
import api from "@/lib/axios"
import toast, { Toaster } from "react-hot-toast"
import Link from "next/link"
import { CancelMembership } from "./cancel-membership"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type PaymentMethod = "mpesa" | "airtel"
type PaymentStatus = "idle" | "initiating" | "pending" | "success" | "failed"

const MEMBERSHIP_TYPES = [
  { value: "Free", label: "Free Membership" },
  { value: "Ordinary", label: "Ordinary Membership", fee: 100 },
  { value: "Life", label: "Life Membership", fee: 5000 },
]

const KENYAN_TRIBES = [
  "Arabs (Kenyan)",
  "Asians (Kenyan)",
  "Aweer (Boni)",
  "Bajuni",
  "Borana",
  "Burji",
  "Chonyi",
  "Dasenach",
  "Digo",
  "Dorobo",
  "Duruma",
  "El Molo",
  "Embu",
  "Gabra",
  "Giriama",
  "Gosha",
  "Ilchamus",
  "Il-Njemps",
  "Jibana",
  "Kalenjin",
  "Kamba",
  "Kambe",
  "Kauma",
  "Kikuyu",
  "Kisii",
  "Konso",
  "Kuria",
  "Luhya",
  "Luo",
  "Maasai",
  "Makonde",
  "Mbeere",
  "Meru",
  "Mijikenda (umbrella for several coastal groups)",
  "Njemps",
  "Nubi",
  "Orma",
  "Pokomo",
  "Rabai",
  "Rendille",
  "Ribe",
  "Sakuye",
  "Samburu",
  "Somali (Kenyan)",
  "Suba",
  "Swahili",
  "Taita",
  "Taveta",
  "Teso",
  "Tharaka",
  "Turkana",
  "Walwana (Malakote / Somali-related group)",
  "Wayyu",
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
  const [phone, setPhone] = useState("254")
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

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const userAge = dob ? calculateAge(dob) : 0

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
  const isFormValid = isMandatoryFieldsFilled && isPaymentComplete && userAge >= 18

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
        membershipNumber,
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
    setPhone("254")
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
          <div className="bg-card border border-border rounded-lg p-8 md:w-2/3 shadow-none">
            <div className="mb-8 p-6 border border-secondary/20 rounded-xl space-y-4">
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
            <p className="text-sm text-foreground/60 mb-6">
              Register by filling out the membership registration form below. All fields with
              <span className="text-secondary">*</span> require mandatory response.
            </p>
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
                    <Input
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <Input
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Religion and Ethnicity fields */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Religion *</label>
                    <Select value={religion} onValueChange={setReligion} required>
                      <SelectTrigger className="w-full !h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary">
                        <SelectValue placeholder="Select Religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Christianity">Christianity</SelectItem>
                        <SelectItem value="Islam">Islam</SelectItem>
                        <SelectItem value="Hinduism">Hinduism</SelectItem>
                        <SelectItem value="Buddhism">Buddhism</SelectItem>
                        <SelectItem value="Judaism">Judaism</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Ethnicity / Tribe *</label>
                    <div className="space-y-3">
                      <Select
                        value={KENYAN_TRIBES.includes(ethnicity) ? ethnicity : ethnicity === "" ? undefined : "Other"}
                        onValueChange={(val) => {
                          if (val === "Other") {
                            setEthnicity("")
                          } else {
                            setEthnicity(val)
                          }
                        }}
                        required
                      >
                        <SelectTrigger className="w-full !h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary">
                          <SelectValue placeholder="Select Tribe" />
                        </SelectTrigger>
                        <SelectContent className="max-h-80">
                          {KENYAN_TRIBES.map((tribe) => (
                            <SelectItem key={tribe} value={tribe}>
                              {tribe}
                            </SelectItem>
                          ))}
                          <SelectItem value="Other">Other (Specify)</SelectItem>
                        </SelectContent>
                      </Select>

                      {(ethnicity === "Other" || (!KENYAN_TRIBES.includes(ethnicity) && ethnicity !== "")) && (
                        <Input
                          type="text"
                          value={ethnicity === "Other" ? "" : ethnicity}
                          onChange={(e) => setEthnicity(e.target.value)}
                          placeholder="Please specify your tribe"
                          required
                          className="h-10 border-border rounded-lg focus:border-secondary bg-background px-4 animate-in fade-in slide-in-from-top-1 transition-colors"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* DOB + Gender */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date of Birth *</label>
                    <Input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => {
                        const val = e.target.value
                        setDob(val)
                        const age = calculateAge(val)
                        if (age > 35 && specialInterest === "Youths") {
                          setSpecialInterest("")
                        }
                      }}
                      className={`h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary ${dob && userAge < 18 ? "border-red-500 focus:border-red-500" : ""}`}
                    />
                    {dob && userAge < 18 && (
                      <p className="text-xs text-red-500 mt-1">
                        You should be 18 and above to join a political party.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sex *</label>
                    <Select value={gender} onValueChange={setGender} required>
                      <SelectTrigger className="w-full !h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Document Type + Number */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Document Type *</label>
                    <Select value={docType} onValueChange={setDocType} required>
                      <SelectTrigger className="w-full !h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary">
                        <SelectValue placeholder="Select Document Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Passport">Passport</SelectItem>
                        <SelectItem value="National ID">National ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Document Number *</label>
                    <Input
                      required
                      value={idNo}
                      onChange={(e) => setIdNo(e.target.value.replace(/\D/g, ""))}
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
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
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
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
                  </div>
                </div>

                {/* Postal Address and Postal Code */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Postal Address *</label>
                    <Input
                      value={postalAddress}
                      onChange={(e) => setPostalAddress(e.target.value)}
                      required
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                      placeholder="P.O. Box xx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Postal Code *</label>
                    <Input
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ""))}
                      required
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
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

                {/* PWD and Special Interest Group fields */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
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

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Special Interest Group *</label>
                    <Select value={specialInterest} onValueChange={setSpecialInterest} required>
                      <SelectTrigger className="w-full !h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary">
                        <SelectValue placeholder="Select Interest Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {userAge <= 35 && <SelectItem value="Youths">Youths</SelectItem>}
                        <SelectItem value="Women">Women</SelectItem>
                        <SelectItem value="Marginalized">Marginalized Communities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isPWD === "yes" && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-foreground mb-2">NCPWD Number *</label>
                    <Input
                      value={ncpwdNumber}
                      onChange={(e) => setNCPWDNumber(e.target.value)}
                      required={isPWD === "yes"}
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
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
                    <Select value={county} onValueChange={handleCountyChange} required>
                      <SelectTrigger className="w-full !h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary">
                        <SelectValue placeholder="Select County" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(counties) &&
                          counties.map((c: any) => (
                            <SelectItem key={c.id} value={c.name}>
                              {c.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Constituency *</label>
                    <Select value={constituency} onValueChange={handleSubcountyChange} required disabled={!county}>
                      <SelectTrigger className="w-full !h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary">
                        <SelectValue placeholder="Select Constituency" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(subCountys) &&
                          subCountys.map((sc: any) => (
                            <SelectItem key={sc.id} value={sc.name}>
                              {sc.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Ward, Polling Station, and Street/Village fields */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Ward *</label>
                    <Select value={ward} onValueChange={setWard} required disabled={!constituency}>
                      <SelectTrigger className="w-full !h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary">
                        <SelectValue placeholder="Select Ward" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(wards) &&
                          wards.map((w: any) => (
                            <SelectItem key={w.id} value={w.name}>
                              {w.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Polling Station (Optional)</label>
                    <Input
                      value={pollingStation}
                      onChange={(e) => setPollingStation(e.target.value)}
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                      placeholder="e.g., Nairobi Primary School"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Street / Village (Optional)</label>
                    <Input
                      value={streetVillage}
                      onChange={(e) => setStreetVillage(e.target.value)}
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                      placeholder="e.g., Westlands, Lavington"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Local Leader (Optional)</label>
                    <Input
                      value={localLeader}
                      onChange={(e) => setLocalLeader(e.target.value)}
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                      placeholder="Referred by (Name of Local Leader)"
                    />
                  </div>
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
                    <Input
                      value={membershipNumber}
                      onChange={(e) => setMembershipNumber(e.target.value)}
                      required={membershipStatus === "returning"}
                      className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                      placeholder="Enter your membership number"
                    />
                  </div>
                )}

                {/* Membership Type Selection */}
                <div className="mb-6 mt-6">
                  <label className="block text-sm font-medium text-foreground mb-2">Membership Type *</label>
                  <Select
                    required
                    value={membershipType}
                    onValueChange={(val) => {
                      setMembershipType(val)
                      const isPaid = val === "Ordinary" || val === "Life"
                      setIsPaidMembership(isPaid)
                      if (!isPaid) {
                        setPaymentProcessed(false)
                        setPaymentMethod(null)
                        setPaymentPhoneNumber("")
                      }
                    }}
                  >
                    <SelectTrigger className="w-full !h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary">
                      <SelectValue placeholder="Select Membership Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {MEMBERSHIP_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label} {type.fee !== undefined ? `- KES ${type.fee.toLocaleString()}` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Registration Fee Display */}
                {isPaidMembership && membershipType && (
                  <div className="border border-border rounded-lg p-4 mb-6">
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
                      <Input
                        type="tel"
                        value={paymentPhoneNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "")
                          if (val.startsWith("0")) {
                            setPaymentPhoneNumber("254" + val.substring(1))
                          } else {
                            setPaymentPhoneNumber(val)
                          }
                        }}
                        className="h-10 border-border rounded-lg bg-background px-4 transition-colors focus:border-secondary"
                        placeholder="2547XXXXXXXX"
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
                        className="w-full bg-secondary text-white h-10 rounded-lg font-bold hover:bg-secondary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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




              {/* SECTION 6: MEMBER DECLARATION */}
              <div className="border-t border-border pt-8 mt-8 mb-8">
                <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Member Declaration
                </h4>

                {/* Verification Code and declaration checkboxes */}
                <div className="mt-6 space-y-4">
                  {/* <div className="hidden">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Verification Code (Sent via SMS) *
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                      className="w-full px-4 h-11 border border-border rounded-lg shadow-none focus:outline-none focus:border-secondary bg-background"
                      placeholder="e.g., Kikuyu, Maasai, Luo"
                    />
                  </div> */}

                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={politicalDeclaration}
                      onChange={(e) => setPoliticalDeclaration(e.target.checked)}
                      required
                      className="w-4 h-4 accent-secondary mt-1 flex-shrink-0 cursor-pointer"
                    />
                    <span className="text-sm text-foreground cursor-pointer">
                      I hereby affirm that I am not a member of any other registered political party in Kenya. *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={termsConsent}
                      onChange={(e) => setTermsConsent(e.target.checked)}
                      required
                      className="w-4 h-4 accent-secondary mt-1 flex-shrink-0 cursor-pointer"
                    />
                    <span className="text-sm text-foreground cursor-pointer">
                      I agree to the <Link href="/shared-ui/terms" className="text-secondary hover:underline font-semibold">Terms & Conditions</Link> and <Link href="/shared-ui/privacy" className="text-secondary hover:underline font-semibold">Privacy Policy</Link>. *
                    </span>
                  </label>
                </div>
              </div>

              {/* SECTION 7: VERIFICATION METHOD */}
              <div className="border-t border-border pt-8">
                <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Verification Link Delivery
                </h4>

                {/* Verification method selection */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    How would you like to receive Membership Number? *
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
                      <span className="text-foreground">Send Membership Number by SMS</span>
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
                      <span className="text-foreground">Send Membership Number by Email</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  submitted || !isFormValid
                }
                className="w-full bg-secondary text-white h-10 rounded-lg font-bold hover:bg-secondary/90 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
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
