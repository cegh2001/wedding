"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import { useState, useEffect } from "react"

export default function Loading() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Usa un fondo neutro para la renderización inicial del servidor
  const bgColor = mounted ? (theme === "warm" ? "bg-[#f8f5f1]" : "bg-[#f0f4f8]") : "bg-[#f0f4f8]"

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${bgColor}`}
    >
      <motion.div
        className={`w-12 h-12 border-4 rounded-full ${
          mounted ? (theme === "warm" ? "border-[#8a6d46]/30 border-t-[#8a6d46]" : "border-wedding-navy/30 border-t-wedding-navy") 
          : "border-wedding-navy/30 border-t-wedding-navy"
        }`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}