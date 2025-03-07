"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"

export default function PrepareSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { theme } = useTheme()

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 transition-colors duration-300
                  ${theme === "warm" ? "bg-[#f8f5f1]" : "bg-white"}`}
    >
      <div className="absolute inset-0 opacity-30 z-0 overflow-hidden">
        <div className="absolute inset-0 w-[200%]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/38725a18-fb60-4b97-bfd7-72c257d5baa2-MbtlZunOBKD7CcdJCF2OCMveEkJkZf.png"
            alt="Background gradient"
            fill
            className="object-cover animate-slide"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-16"
        >
          <h2
            className={`text-3xl md:text-6xl font-serif italic mb-2 md:mb-4 ${
              theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
            }`}
          >
            Después de
          </h2>
          <p
            className={`text-4xl md:text-7xl font-serif italic mb-2 md:mb-4 ${
              theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
            }`}
          >
            3 años juntos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 md:mb-12"
        >
          <p
            className={`text-xl md:text-3xl italic ${theme === "warm" ? "text-[#8a6d46]/80" : "text-wedding-turquoise"}`}
            style={{ transform: "rotate(-2deg)" }}
          >
            comenzaremos un nuevo viaje
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 md:mt-16"
        >
          <p
            className={`text-2xl md:text-4xl font-serif italic leading-relaxed ${
              theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
            }`}
          >
            prepara tus maletas
            <br />y acompáñanos
            <br />
            en este viaje
          </p>
        </motion.div>
      </div>
    </section>
  )
}

