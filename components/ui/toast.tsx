"use client"

import { useState, useEffect } from "react"

interface ToastProps {
  message: string
  isVisible: boolean
  type?: "info" | "success" | "warning" | "error"
  duration?: number
}

export default function Toast({ message, isVisible, type = "info", duration = 3000 }: ToastProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, duration)
      return () => clearTimeout(timer)
    } else {
      setShow(false)
    }
  }, [isVisible, duration])

  if (!show) return null

  const typeStyles = {
    info: "bg-blue-500 border-blue-600",
    success: "bg-green-500 border-green-600", 
    warning: "bg-yellow-500 border-yellow-600",
    error: "bg-red-500 border-red-600"
  }

  return (
    <div className={`
      fixed top-4 right-4 z-[9999] px-4 py-3 rounded-lg text-white shadow-lg border-l-4 
      transition-all duration-300 transform 
      ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${typeStyles[type]}
    `}>
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0">
          {type === "info" && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
          {type === "success" && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}