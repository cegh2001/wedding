"use client"

import { Compass, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"

interface DecorativeElementProps {
  type: "compass" | "heart"
  position: string
  delay?: number
}

export default function DecorativeElement({ type, position, delay = 0 }: DecorativeElementProps) {
  const Icon = type === "compass" ? Compass : Heart
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay }}
      className={`absolute ${position} ${theme === "warm" ? "text-wedding-champagne/50" : "text-wedding-navy/50"}`}
    >
      <Icon className="w-8 h-8 md:w-12 md:h-12" />
    </motion.div>
  )
}

