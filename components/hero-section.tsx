"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plane } from "lucide-react"

interface Props {
  invite: string
}

export default function HeroSection({invite}:Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center relative overflow-hidden bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="z-10 text-center px-4"
      >
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <Plane className="h-12 w-12 text-white" />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-5xl md:text-7xl font-serif text-white mb-4 capitalize"
        >
          {invite}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-[1px] w-16 bg-white/70"></div>
          <p className="text-white text-lg uppercase tracking-widest">Nos casamos</p>
          <div className="h-[1px] w-16 bg-white/70"></div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-white text-xl md:text-2xl font-light"
        >
          15 · Junio · 2025
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-12"
        >
          <div className="px-6 py-3 border border-white/50 rounded-full text-white backdrop-blur-sm">
            Desliza para descubrir nuestra historia
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}

