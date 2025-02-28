"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Camera } from "lucide-react"
import Image from "next/image"
import DecorativeElement from "./decorative-element"
import { useTheme } from "@/contexts/ThemeContext"

export default function PhotosSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { theme } = useTheme()

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300
                  ${theme === "warm" ? "bg-background" : "bg-white"}`}
    >
      <div className="absolute inset-0 opacity-[0.15] z-0">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="World map" fill className="object-cover" />
      </div>

      <DecorativeElement type="compass" position="top-8 left-8" delay={0.5} />
      <DecorativeElement type="heart" position="bottom-8 right-8" delay={0.7} />

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
            Fotos
          </h2>

          <div className="flex justify-center mb-8">
            <div className={`w-32 h-[2px] ${theme === "warm" ? "bg-primary/30" : "bg-wedding-turquoise/30"}`}></div>
          </div>

          <p className={`text-xl mb-2 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>
            El día de la boda toma muchas fotos
          </p>
          <p className={`text-xl mb-2 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>
            y déjanos un bonito
          </p>
          <p className={`text-xl mb-2 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>
            y divertido recuerdo
          </p>
          <p className={`text-xl mb-2 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>
            haciendo clic en el icono
          </p>
          <p className={`text-xl mb-6 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>
            de la cámara de fotos
          </p>

          <div className="flex justify-center mb-4">
            <div className={`w-32 h-[2px] ${theme === "warm" ? "bg-primary/30" : "bg-wedding-turquoise/30"}`}></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform hover:scale-105 focus:scale-105"
          >
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center ${
                theme === "warm"
                  ? "bg-white/50 backdrop-blur-sm border border-primary/30"
                  : "bg-wedding-skyblue/50 border border-wedding-navy/30"
              }`}
            >
              <Camera className={`w-12 h-12 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`} />
            </div>
            <p className={`text-center mt-2 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>(clic)</p>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

