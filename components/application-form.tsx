"use client"

import type React from "react"

import { useState } from "react"
import { Send, ArrowLeft, Upload, FileCheck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import toast from "react-hot-toast"

interface propsData {
  id: any;
}
export function ApplicationForm({ id }: propsData) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB")
        return
      }
      setCvFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!cvFile) {
      toast.error("Please upload your CV")
      return
    }

    try {
      setIsSubmitting(true)
      const data = new FormData()
      data.append("firstname", formData.firstName)
      data.append("lastname", formData.lastName)
      data.append("email", formData.email)
      data.append("phonenumber", formData.phone)
      data.append("cover_letter", formData.coverLetter)
      data.append("cv", cvFile)

      const response = await api.post(`/api/jobs/apply/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true)
        toast.success("Application submitted successfully!")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          coverLetter: "",
        })
        setCvFile(null)
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error: any) {
      console.error("Submission error:", error)
      toast.error(error.response?.data?.message || "Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Careers</span>
        </button>

        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Apply Here</h2>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          {submitted && (
            <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg text-primary-800">
              ✓ Thank you for your application! We'll review it and be in touch soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="First name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="Last name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="0712 345 678"
                />
              </div>
            </div>
            
            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Upload CV/Resume *</label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${cvFile ? 'border-primary-500 bg-green-50/10' : 'border-border hover:border-secondary'}`}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="hidden"
                  id="cv-upload"
                  onChange={handleFileChange}
                />
                <label htmlFor="cv-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  {cvFile ? (
                    <>
                      <FileCheck className="text-primary-500 h-8 w-8" />
                      <p className="text-foreground font-medium">{cvFile.name}</p>
                      <p className="text-xs text-muted-foreground">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="text-muted-foreground h-8 w-8" />
                      <p className="text-foreground font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-foreground/60">PDF, DOC, or DOCX (max 5MB)</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cover Letter / Message</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-secondary"
                placeholder="Tell us why you're interested in joining SFUP..."
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <input type="checkbox" id="consent" required className="w-4 h-4 rounded mt-1 cursor-pointer" />
              <label htmlFor="consent" className="text-sm text-foreground cursor-pointer">
                I agree to the <Link href="/shared-ui/terms" className="text-secondary hover:underline">Terms & Conditions</Link> and <Link href="/shared-ui/privacy" className="text-secondary hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary text-white py-4 rounded-lg font-bold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={20} />
              )}
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
