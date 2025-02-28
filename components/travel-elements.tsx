"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function TravelElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* World map background */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="World map" fill className="object-cover" />
      </div>

      {/* Passport stamps */}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 0.1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 left-20 w-32 h-32"
      >
        <Image
          src="/placeholder.svg?height=150&width=150"
          alt="Passport stamp"
          width={150}
          height={150}
          className="object-contain"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 15 }}
        animate={{ opacity: 0.1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-40 right-20 w-40 h-40"
      >
        <Image
          src="/placeholder.svg?height=180&width=180"
          alt="Passport stamp"
          width={180}
          height={180}
          className="object-contain"
        />
      </motion.div>

      {/* Dotted line path */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
      >
        <path
          d="M100,300 Q400,50 700,300 T900,600"
          fill="none"
          stroke="#2c3e50"
          strokeWidth="6"
          strokeDasharray="15,15"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

