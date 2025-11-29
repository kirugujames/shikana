'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight, Send } from 'lucide-react'

const AVAILABLE_EVENTS = [
  {
    id: 1,
    name: 'Community Cleanup Drive',
    date: 'Dec 15, 2025',
    location: 'Central Park',
    description: 'Help us keep our city clean',
  },
  {
    id: 2,
    name: 'Food Bank Distribution',
    date: 'Dec 20, 2025',
    location: 'Downtown Center',
    description: 'Package and distribute food to families in need',
  },
  {
    id: 3,
    name: 'Youth Mentorship Program',
    date: 'Jan 10, 2026',
    location: 'Community School',
    description: 'Guide and inspire the next generation',
  },
  {
    id: 4,
    name: 'Environmental Restoration',
    date: 'Jan 25, 2026',
    location: 'Nature Reserve',
    description: 'Plant trees and restore natural habitats',
  },
]

export default function EventsRegistration() {

  const formData = {
    fullName: '',
    email: '',
    phone: '',
    consent: '',
  }

  const [consent, setConsent] = useState(false)

  // const formData = {
  //     fullName,
  //     email,
  //     consent,
  //   }






  return (
    <main className="px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Register for an Event</h1>
          <p className="text-muted-foreground text-lg">Join us and make a difference in your community</p>
        </div>
      </div>
      <Card className="border-2 border-border p-8">
        <h3 className="text-xl font-bold text-foreground mb-6">Your Information</h3>
        <form className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number*
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary"
              placeholder="Your Phone Number"
            />
          </div>

          <div>
            <h1>Select event through lookup</h1>
          </div>

         

          {/* Consent */}
          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <input
              type="checkbox"
              id="consent"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 rounded mt-1"
            />
            <label htmlFor="consent" className="text-sm text-foreground cursor-pointer">
              I consent to having my registration information stored and used for event registration
               purposes, and I agree to the privacy policy.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white py-4 rounded-lg font-bold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2">
            <Send size={20} />
            Submit Application
          </button>
        </form>
      </Card>
    </main>
  )


}