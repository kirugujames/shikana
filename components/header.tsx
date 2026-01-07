"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Facebook, Twitter, Instagram, Youtube, Icon, Phone, Mail, Search, User as UserIcon } from "lucide-react"
import { Button } from "./ui/button"
import { InfiniteSlider } from "./motion-primitives/infinite-slider"
import { useAuth } from "@/context/auth-context"
import { UserProfileDialog } from "./user-profile-dialog"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()


  const handleSearch = (query: string) => {
    // Remove previous highlights
    const existingHighlights = document.querySelectorAll('.search-highlight')
    existingHighlights.forEach(highlight => {
      const parent = highlight.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(highlight.textContent || ''), highlight)
        parent.normalize() // Merge adjacent text nodes
      }
    })

    if (!query || query.trim().length === 0) {
      return
    }

    // Find and highlight matching text
    const searchText = query.toLowerCase()
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip script, style, and already highlighted elements
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT

          const tagName = parent.tagName.toLowerCase()
          if (tagName === 'script' || tagName === 'style' || parent.classList.contains('search-highlight')) {
            return NodeFilter.FILTER_REJECT
          }

          // Only accept nodes that contain the search text
          if (node.textContent && node.textContent.toLowerCase().includes(searchText)) {
            return NodeFilter.FILTER_ACCEPT
          }

          return NodeFilter.FILTER_REJECT
        }
      }
    )

    const nodesToHighlight: { node: Text; matches: { start: number; end: number }[] }[] = []

    let currentNode: Node | null
    while ((currentNode = walker.nextNode())) {
      const textNode = currentNode as Text
      const text = textNode.textContent || ''
      const lowerText = text.toLowerCase()

      const matches: { start: number; end: number }[] = []
      let startIndex = 0

      while (startIndex < lowerText.length) {
        const index = lowerText.indexOf(searchText, startIndex)
        if (index === -1) break

        matches.push({
          start: index,
          end: index + searchText.length
        })

        startIndex = index + searchText.length
      }

      if (matches.length > 0) {
        nodesToHighlight.push({ node: textNode, matches })
      }
    }

    // Apply highlights
    nodesToHighlight.forEach(({ node, matches }) => {
      const text = node.textContent || ''
      const parent = node.parentNode
      if (!parent) return

      const fragment = document.createDocumentFragment()
      let lastIndex = 0

      matches.forEach(({ start, end }) => {
        // Add text before match
        if (start > lastIndex) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex, start)))
        }

        // Add highlighted match
        const mark = document.createElement('mark')
        mark.className = 'search-highlight'
        mark.style.backgroundColor = '#ffd700'
        mark.style.color = '#000'
        mark.style.padding = '2px 0'
        mark.style.borderRadius = '2px'
        mark.textContent = text.substring(start, end)
        fragment.appendChild(mark)

        lastIndex = end
      })

      // Add remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex)))
      }

      parent.replaceChild(fragment, node)
    })

    // Scroll to first match
    const firstHighlight = document.querySelector('.search-highlight')
    if (firstHighlight) {
      firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/shared-ui/about" },
    // { label: "Events", href: "/shared-ui/events" },
    {
      label: "Events",
      children: [
        { label: "All Events", href: "/shared-ui/events" },
        { label: "Volunteers", href: "/shared-ui/volunteer" },
      ],
    },
    { label: "Blogs", href: "/shared-ui/blog" },
    { label: "Contact Us", href: "/shared-ui/contact" },
    {
      label: "Work With Us", children: [
        { label: "Careers", href: "/shared-ui/careers" },
        { label: "Political Positions", href: "/shared-ui/political-position" },
      ],
    },
    { label: "Donate", href: "/shared-ui/donate" },
    { label: "Join Us", href: "/shared-ui/register" },
    { label: "Shop", href: "/shared-ui/listings" },
    { label: "Login", href: "/shared-ui/login" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ]

  const isActive = (href: string) => pathname === href
  const navigateLogin = (e: any) => {
    e.preventDefault();
    router.push('/login');
  }
  return (
    <header className="w-full">
      <div className="bg-secondary  text-primary-foreground py-2 overflow-hidden">
        <div className="w-full overflow-hidden flex items-center">
          <InfiniteSlider
            gap={100}
            className="w-full whitespace-nowrap"
            reverse
          >
            <p className="text-sm font-medium">
              Shikana Frontliners for Unity Party
            </p>
            <p className="text-sm font-medium">
              Truth, Always, Conquers
            </p>
            <p className="text-sm font-medium flex">
              <Phone className="me-2" size={18} />0706357064
            </p>
            <p className="text-sm font-medium flex">
              <Mail className="me-2" size={18} />info@shikana.co.ke
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
        <div className="max-w-7xl mx-auto px-1 py-1">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/SFU-LOGO.png"
                alt="Shikana Frontliners for Unity Party"
                className="h-18 w-18 object-contain"
              />
              {/* <span className="hidden sm:block font-bold text-primary text-sm">Shikana Frontliners for Unity Party</span> */}
              <span className="hidden sm:flex flex-col justify-center font-bold text-primary text-sm leading-tight max-h-[4.5rem]">
                <span>Shikana Frontliners</span>
                <span className="text-secondary">for Unity Party</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {!item.children ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`font-medium text-md transition-colors ${isActive(item.href)
                        ? "text-secondary border-b-2 border-secondary"
                        : "text-foreground hover:text-secondary"
                        }`}
                    >
                      {item.label === "Login" ? (
                        user ? (
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault()
                              setShowProfileDialog(true)
                            }}
                          >
                            <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                              {user.first_name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase()}
                            </div>
                          </div>
                        ) : (
                          <Button variant="outline" className="bg-secondary hover:bg-secondary/90 text-white" onClick={navigateLogin}>
                            Login
                          </Button>
                        )
                      ) : (
                        item.label
                      )}
                    </Link>
                  ) : (
                    <>

                      <span className="font-medium text-md text-foreground hover:text-secondary cursor-pointer">
                        {item.label}
                      </span>


                      <div
                        className="
                          absolute left-0
                          invisible opacity-0 translate-y-2
                          group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                          transition-all duration-200
                          bg-white border border-border rounded-md shadow-lg w-48 z-50
                          "
                      >
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary/10"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <UserProfileDialog open={showProfileDialog} onOpenChange={setShowProfileDialog} />

            {/* Search Icon */}
            <button
              onClick={() => setShowSearch(true)}
              className="hidden md:block text-foreground hover:text-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>


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
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {!item.children ? (
                    <Link
                      href={item.href!}
                      className={`block py-2 font-medium ${isActive(item.href!) ? "text-secondary" : "text-foreground hover:text-secondary"
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      {/* Parent Label */}
                      <span className="block py-2 font-medium text-foreground">
                        {item.label}
                      </span>

                      {/* Sub-items */}
                      <div className="pl-4 space-y-2">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block py-1 text-sm text-foreground/80 hover:text-secondary"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </nav>

      {/* Search Modal Overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Search className="text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search this page..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 text-lg outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="text-xs text-muted-foreground">
                Type to search and highlight text on this page
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
