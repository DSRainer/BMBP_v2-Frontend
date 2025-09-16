"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Select date",
  className
}: DatePickerProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      const selectedDate = new Date(value)
      onDateChange?.(selectedDate)
    } else {
      onDateChange?.(undefined)
    }
  }

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return ''
    return format(date, 'yyyy-MM-dd')
  }

  return (
    <div className={cn("relative", className)}>
      <Input 
        type="date" 
        value={formatDateForInput(date)}
        onChange={handleDateChange}
        className="pl-10"
        min={format(new Date(), 'yyyy-MM-dd')} // Prevent past dates
      />
      <CalendarIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}