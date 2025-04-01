"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
}

export function DatePicker({ className, date, onDateChange }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)

  React.useEffect(() => {
    setSelectedDate(date)
  }, [date])

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (onDateChange) {
      onDateChange(date)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={selectedDate} onSelect={handleSelect} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}

