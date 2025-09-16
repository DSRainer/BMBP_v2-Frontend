"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar on package details pages
  const hideNavbar = pathname?.startsWith('/packages/') && pathname !== '/packages'
  
  if (hideNavbar) {
    return null
  }
  
  return <Navbar />
}