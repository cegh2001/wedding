"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"

export default function CountdownSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { theme } = useTheme()

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set your wedding date here - format: year, month (0-11), day, hour, minute
    const weddingDate = new Date(2025, 5, 15, 18, 0, 0).getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        clearInterval(timer)
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300
                  ${theme === "warm" ? "bg-background" : "bg-white"}`}
    >
      <div className="absolute inset-0 opacity-[0.15] z-0">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="World map" fill className="object-cover" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Hot air balloon"
              width={80}
              height={80}
              className={theme === "warm" ? "opacity-80" : "opacity-60"}
            />
          </div>

          <h2
            className={`text-3xl md:text-4xl font-serif mb-4 ${
              theme === "warm" ? "text-primary" : "text-wedding-navy"
            }`}
          >
            Cuenta regresiva
          </h2>
          <p className={`text-xl italic ${theme === "warm" ? "text-primary" : "text-wedding-turquoise"}`}>
            para iniciar el embarque a la mejor fiesta
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {["Días", "Horas", "Min", "Seg"].map((label, index) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className={`w-full aspect-square rounded-lg flex items-center justify-center mb-2 ${
                  theme === "warm"
                    ? "bg-white/50 backdrop-blur-sm border border-primary/30"
                    : "bg-wedding-skyblue/50 border border-wedding-navy/30"
                }`}
              >
                <span
                  className={`text-4xl md:text-5xl font-bold ${
                    theme === "warm" ? "text-primary" : "text-wedding-navy"
                  }`}
                >
                  {Object.values(timeLeft)[index]}
                </span>
              </div>
              <span className={`text-sm font-medium ${theme === "warm" ? "text-primary" : "text-wedding-turquoise"}`}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

