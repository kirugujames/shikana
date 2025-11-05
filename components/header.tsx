"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Facebook, Twitter, Instagram, Youtube, Icon ,Phone,Mail} from "lucide-react"
import { Button } from "./ui/button"
import { InfiniteSlider } from "./motion-primitives/infinite-slider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Blogs", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Donate", href: "/donate" },
    { label: "Join Us", href: "/register" },
    { label: "Login", href: "/login" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="w-full">
      {/* Top Navbar */}
      <div className="bg-secondary  text-primary-foreground py-2 overflow-hidden">
        {/* Remove max-w-7xl and make it full width */}
        <div className="w-full overflow-hidden flex items-center">
          <InfiniteSlider
            gap={100}
            className="w-full whitespace-nowrap"
            reverse
          >
            <p className="text-sm font-medium">
              Shikana Frontliners for Unity Party
            </p>
            <p className="text-sm font-medium flex">
              < Phone className="me-2"  size={18}/>+254700000000
            </p>
            <p className="text-sm font-medium flex">
              <Mail className="me-2" size={18} /> sfuparty@net.com
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:opacity-80 transition-opacity"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </InfiniteSlider>
        </div>
      </div>



      {/* Main Navbar */}
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%281%29-hiMrQm31Qlu54raVjgqGkovwgmoMWo.png"
                alt="Shikana Frontliners for Unity Party"
                className="h-12 w-12 object-contain"
              />
              <span className="hidden sm:block font-bold text-primary text-sm">SFUP</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium text-sm transition-colors ${isActive(item.href)
                      ? "text-secondary border-b-2 border-secondary"
                      : "text-foreground hover:text-secondary"
                    }`}
                >
                  {item.label == "Login" ? <Button variant="outline" className="bg-secondary hover:bg-secondary/90 text-white">Login</Button> : item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-foreground"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 font-medium transition-colors ${isActive(item.href) ? "text-secondary" : "text-foreground hover:text-secondary"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
