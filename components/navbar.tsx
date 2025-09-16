"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setMenuOpen(false)
  }

  return (
    <header className={`${isScrolled ? "bg-white/90 shadow-sm" : "bg-white"} sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70`}> 
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-start gap-1 lg:mr-30" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo.png"
              alt="BookMyBirthdayParty"
              width={180}
              height={40}
              className="h-8 w-auto sm:h-10 object-contain"
              priority
            />
            <span className="text-xs text-gray-500 mt-0.5">Celebrate Life!</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 ml-30">
            <Link href="/about" className="text-gray-700 hover:text-purple-700 transition-colors">About Us</Link>
            <button onClick={() => scrollToSection('packages')} className="text-gray-700 hover:text-purple-700 transition-colors cursor-pointer">Our Packages</button>
            <Link href="/gallery" className="text-gray-700 hover:text-purple-700 transition-colors">Gallery</Link>
            <Link href="/#contact" className="text-gray-700 hover:text-purple-700 transition-colors">Contact</Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Auth removed - keeping empty for future CTAs */}
          </div>

          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-3">
            <nav className="flex flex-col gap-4">
              <Link href="/about" className="text-gray-700 hover:text-purple-700" onClick={() => setMenuOpen(false)}>About Us</Link>
              <button onClick={() => scrollToSection('packages')} className="text-gray-700 hover:text-purple-700 text-left cursor-pointer">Our Packages</button>
              <Link href="/gallery" className="text-gray-700 hover:text-purple-700" onClick={() => setMenuOpen(false)}>Gallery</Link>
              <Link href="/#contact" className="text-gray-700 hover:text-purple-700" onClick={() => setMenuOpen(false)}>Contact</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}


