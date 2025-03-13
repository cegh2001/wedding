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
    { time: "4:00 pm", icon: <Car className="w-6 h-6" />, event: "Translado" },
    { time: "5:30 pm", icon: <Church className="w-6 h-6" />, event: "Ceremonia" },
    { time: "7:00 pm", icon: <Wine className="w-6 h-6" />, event: "Brindis" },
    { time: "7:30 pm", icon: <Utensils className="w-6 h-6" />, event: "Cena" },
    { time: "8:30 pm", icon: <Music className="w-6 h-6" />, event: "Baile" },
    { time: "10:45 pm", icon: <Car className="w-6 h-6" />, event: "Fin de la fiesta" },
  ]

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

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl md:text-5xl font-serif mb-6 ${
              theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
            }`}
          >
            Itinerario
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${
              theme === "warm" ? "bg-[#8a6d46]/50" : "bg-wedding-turquoise/50"
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
                  <p className={`text-xl font-medium ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
                    {item.time}
                  </p>
                </div>

                <div className="z-10 flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === "warm"
                        ? "bg-[#f8f5f1] border-2 border-[#8a6d46]"
                        : "bg-white border-2 border-wedding-navy"
                    }`}
                  >
                    <div className={theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}>{item.icon}</div>
                  </div>
                </div>

                <div className={`w-1/2 pl-8 ${index % 2 === 0 ? "order-1" : ""}`}>
                  <p
                    className={`text-xl font-medium ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-turquoise"}`}
                  >
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