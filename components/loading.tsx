"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"

export default function Loading() {
  const { theme } = useTheme()

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        theme === "warm" ? "bg-[#f8f5f0]" : "bg-white"
      }`}
    >
      <motion.div
        className={`w-12 h-12 border-4 rounded-full ${
          theme === "warm" ? "border-[#8a6d46]/30 border-t-[#8a6d46]" : "border-wedding-navy/30 border-t-wedding-navy"
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

