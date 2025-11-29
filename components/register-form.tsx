"use client"

import React, { useState } from "react"
import { CheckCircle } from "lucide-react"
import api from "@/lib/axios"
import toast, { Toaster } from "react-hot-toast"
import { Spinner } from "./ui/spinner"

export function RegisterForm() {
  const [submitted, setSubmitted] = useState(false)
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [idNo, setIdNo] = useState("");
  const [doc_type, setDocType] = useState("");
  const [Constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");
  const [county, setCounty] = useState("");
  const [area_of_interest, setAreaOfInterest] = useState("");
  const [username, setUsername] = useState("");
  const [role_id, setRoleId] = useState(2);
const resetForm = () => {
  setFirstName("");
  setLastName("");
  setEmail("");
  setDob("");
  setGender("");
  setPhone("");
  setIdNo("");
  setDocType("");
  setConstituency("");
  setWard("");
  setCounty("");
  setAreaOfInterest("");
};


  const handleSubmit = async (e: React.FormEvent) => {
    setSubmitted(true);
    e.preventDefault()
    try {
      setSubmitted(false);
      const response = await api.post("/api/members/register/member", {
        first_name, last_name, email, dob, gender, phone, idNo, doc_type, Constituency, ward, county, area_of_interest, role_id, username
      })
      if (response.data?.statusCode == 201) {
        resetForm();
        toast.success(response.data?.message);
      } else {
        toast.error(response.data?.message);

      }
    } catch (error) {
      setSubmitted(false);
      toast.success("something wrong happened");
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
              <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
                Why Join SFUP?
              </h2>
              <p className="text-lg text-foreground/70">
                As a member, you'll be part of a growing movement dedicated to unity,
                progress, and inclusive governance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    Influence Party Decisions
                  </h3>
                  <p className="text-foreground/70">
                    Vote on policy priorities and party leadership
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    Access Exclusive Events
                  </h3>
                  <p className="text-foreground/70">
                    Attend member-only forums and networking events
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    Volunteer Opportunities
                  </h3>
                  <p className="text-foreground/70">
                    Participate in campaigns and community initiatives
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-secondary mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    Direct Communication
                  </h3>
                  <p className="text-foreground/70">
                    Receive updates directly from party leadership
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="bg-muted border border-border rounded-lg p-8 md:w-2/3">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Registration Form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">

              {/* Name Fields */}
              <div className="md:flex">
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="John"
                  />
                </div>

                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="md:flex">
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>

              {/* DOB + Gender */}
              <div className="md:flex">
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="+254 712 345 678"
                  />
                </div>

                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Sex *
                  </label>
                  <select
                    name="sex"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="No Preference">I prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Doc Type + Number */}
              <div className="md:flex">
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Document Type *
                  </label>
                  <select
                    name="docType"
                    required
                    value={doc_type}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select Document Type</option>
                    <option value="Passport">Passport</option>
                    <option value="National ID">National ID</option>
                  </select>
                </div>

                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Document Number *
                  </label>
                  <input
                    type="number"
                    name="docNumber"
                    required
                    value={idNo}
                    onChange={(e) => setIdNo(e.target.value)}
                    className="w-full px-4 bg-white py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="01234567"
                  />
                </div>
              </div>

              {/* County + Constituency */}
              <div className="md:flex">
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    County *
                  </label>
                  <select
                    name="county"
                    required
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option value="">Select County</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kitui">Kitui</option>
                  </select>
                </div>

                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Constituency *
                  </label>
                  <select
                    name="constituency"
                    required
                    value={Constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option className="text-gray-400" value="">Select Consituency</option>
                    <option className="text-gray-400" value="dar-es-salaam">Dar es Salaam</option>
                    <option className="text-gray-400" value="arusha">Arusha</option>
                    <option className="text-gray-400" value="mbeya">Mbeya</option>
                    <option className="text-gray-400" value="dodoma">Dodoma</option>
                    <option className="text-gray-400" value="mwanza">Mwanza</option>
                    <option className="text-gray-400" value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="md:flex">
                {/* County */}
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Ward *</label>
                  <select
                    required
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option className="text-gray-400" value="">Select Ward</option>
                    <option className="text-gray-400" value="dar-es-salaam">Dar es Salaam</option>
                    <option className="text-gray-400" value="arusha">Arusha</option>
                    <option className="text-gray-400" value="mbeya">Mbeya</option>
                    <option className="text-gray-400" value="dodoma">Dodoma</option>
                    <option className="text-gray-400" value="mwanza">Mwanza</option>
                    <option className="text-gray-400" value="other">Other</option>
                  </select>
                </div>
                <div className="md:w-1/2 md:ms-8">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Area of Interest *</label>
                  <select
                    required
                    value={area_of_interest}
                    onChange={(e) => setAreaOfInterest(e.target.value)}
                    className="w-full bg-white px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  >
                    <option className="text-gray-400" value="">Select Consituency</option>
                    <option className="text-gray-400" value="politics">Politics</option>
                    <option className="text-gray-400" value="community work">Community Work</option>
                    <option className="text-gray-400" value="youth engagement">Youth Engagement</option>
                    <option className="text-gray-400" value="policy development">Policy Development</option>
                  </select>
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled ={submitted}
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary/90 transition-colors mt-6"
              >
                {submitted ? <Spinner /> : "Complete Registration"}
              </button>

              <p className="text-xs text-foreground/60 text-center mt-4">
                By registering, you agree to receive updates and communications from SFUP.
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
