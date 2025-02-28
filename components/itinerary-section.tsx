"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Church, Tent, Wine, Utensils, Music, Car } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export default function ItinerarySection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { theme } = useTheme()

  const timelineItems = [
    { time: "18:00 h", icon: <Church className="w-6 h-6" />, event: "Ceremonia" },
    { time: "19:00 h", icon: <Tent className="w-6 h-6" />, event: "Recepción" },
    { time: "20:00 h", icon: <Wine className="w-6 h-6" />, event: "Cóctel" },
    { time: "22:00 h", icon: <Utensils className="w-6 h-6" />, event: "Cena" },
    { time: "00:00 h", icon: <Music className="w-6 h-6" />, event: "Baile" },
    { time: "06:00 h", icon: <Car className="w-6 h-6" />, event: "Fin de la fiesta" },
  ]

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300
                  ${theme === "warm" ? "bg-background" : "bg-white"}`}
    >
      <div className="absolute inset-0 opacity-[0.15] z-0">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="World map" fill className="object-cover" />
      </div>

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl md:text-5xl font-serif mb-6 ${
              theme === "warm" ? "text-primary" : "text-wedding-navy"
            }`}
          >
            Itinerario
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${
              theme === "warm" ? "bg-primary/50" : "bg-wedding-turquoise/50"
            }`}
          ></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex items-center"
              >
                <div className={`w-1/2 pr-8 text-right ${index % 2 !== 0 ? "order-1" : ""}`}>
                  <p className={`text-xl font-medium ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>
                    {item.time}
                  </p>
                </div>

                <div className="z-10 flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === "warm"
                        ? "bg-background border-2 border-primary"
                        : "bg-white border-2 border-wedding-navy"
                    }`}
                  >
                    <div className={theme === "warm" ? "text-primary" : "text-wedding-navy"}>{item.icon}</div>
                  </div>
                </div>

                <div className={`w-1/2 pl-8 ${index % 2 === 0 ? "order-1" : ""}`}>
                  <p className={`text-xl font-medium ${theme === "warm" ? "text-primary" : "text-wedding-turquoise"}`}>
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

