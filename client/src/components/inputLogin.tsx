import React from 'react'
import { Input, InputProps } from "@/components/ui/input"

interface CustomInputProps extends InputProps {
  // Add any additional props here if needed
}

export function CustomInput({ className, ...props }: CustomInputProps) {
  return (
    <Input
      className={`bg-[#fdf3f3] ${className}`}
      {...props}
    />
  )
}

