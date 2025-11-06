import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Define the social links data for cleaner rendering
  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/sfup" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/sfup" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/sfup" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/sfup" },
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/*
          Main Grid: Set to 5 columns on medium screens (md:grid-cols-5).
          On mobile (grid-cols-1), content will stack vertically.
        */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          
          {/* 1. About Us (1/5 column width) */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Shikana Frontliners for Unity Party - Building a stronger nation through unity, transparency, and
              progress.
            </p>
          </div>

          {/* 2. Downloads (1/5 column width) */}
          <div>
            <h3 className="text-xl font-bold mb-4">Downloads</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/constitution" className="text-white/80 hover:text-white transition-colors">
                  Party Constitution
                </Link>
              </li>
              <li>
                <Link href="/manifesto" className="text-white/80 hover:text-white transition-colors">
                  Party Manifesto
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Get Involved (1/5 column width) */}
          <div>
            <h3 className="text-xl font-bold mb-4">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register" className="text-white/80 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-white/80 hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-white/80 hover:text-white transition-colors">
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Socials (1/5 column width) - Now a list with icons and names */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon size={16} className="flex-shrink-0" />
                    <span>{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Contact Info (1/5 column width) - Back in the main row */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:info@sfup.org" className="text-white/80 hover:text-white transition-colors">
                  info@sfup.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <a href="tel:+1234567890" className="text-white/80 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="flex-shrink-0" />
                <span className="text-white/80">National Headquarters</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
          <p>&copy; {currentYear} Shikana Frontliners for Unity Party. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}