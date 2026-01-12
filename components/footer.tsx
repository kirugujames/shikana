"use client"

import Link from "next/link"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Mailbox,
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">

          {/* Quick Links */}
          <div className="md:flex-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-white/80 hover:text-white">Home</Link></li>
              <li><Link href="/shared-ui/about" className="text-white/80 hover:text-white">About Us</Link></li>
              <li><Link href="/shared-ui/events" className="text-white/80 hover:text-white">Events</Link></li>
              <li><Link href="/shared-ui/blog" className="text-white/80 hover:text-white">News & Media</Link></li>
              <li><Link href="/shared-ui/contact" className="text-white/80 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Downloads */}
          <div className="md:flex-1">
            <h3 className="text-lg font-semibold mb-4">Downloads</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/constitution" className="text-white/80 hover:text-white">Party Constitution</Link></li>
              <li><Link href="/manifesto" className="text-white/80 hover:text-white">Party Manifesto</Link></li>
              {/* <li><Link href="/ideology" className="text-white/80 hover:text-white">Party Ideology</Link></li> */}
              <li><Link href="/privacy-policy" className="text-white/80 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="md:flex-1">
            <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shared-ui/register" className="text-white/80 hover:text-white">Become a Member</Link></li>
              <li><Link href="/shared-ui/volunteer" className="text-white/80 hover:text-white">Volunteer</Link></li>
              <li><Link href="/shared-ui/careers" className="text-white/80 hover:text-white">Careers</Link></li>
              <li><Link href="/shared-ui/political-position" className="text-white/80 hover:text-white">Political Aspirants</Link></li>
              <li><Link href="/shared-ui/listings" className="text-white/80 hover:text-white">Shop Merchandise</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:flex-1">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1" />
                <div>
                  <a href="mailto:info@shikana.co.ke" className="hover:text-white block">
                    info@shikana.co.ke
                  </a>
                  <a href="mailto:shikana@gmail.co.ke" className="hover:text-white block">
                    shikana@gmail.co.ke
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+254706357064" className="hover:text-white">
                  0706 357 064
                </a>
              </li>

              <li className="flex items-start gap-2">
                <Mailbox size={16} className="mt-1" />
                <div>
                  <p>P.O BOX 18234 – 00100</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="md:flex-1">
            <h3 className="text-lg font-semibold mb-4">Our Office</h3>
            <div className="rounded-lg overflow-hidden border border-white/20 h-[180px]">
              <iframe
                title="Shikana Office Location"
                src="https://www.google.com/maps?q=Kikinga%20House%20Kiambu%20Road&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">

          <p>&copy; {currentYear} Shikana Frontliners for Unity Party. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white"><Facebook size={16} /></a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white"><Twitter size={16} /></a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white"><Instagram size={16} /></a>
            <a href="https://youtube.com" aria-label="YouTube" className="hover:text-white"><Youtube size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
