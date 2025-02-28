"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Copy, Check, Gift } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import DecorativeElement from "./decorative-element"
import { useTheme } from "@/contexts/ThemeContext"

export default function GiftSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const accountNumber = "ES 1111 2222 3333 4444 5555 6666"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300
                  ${theme === "warm" ? "bg-background" : "bg-white"}`}
    >
      <div className="absolute inset-0 opacity-[0.15] z-0">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="World map" fill className="object-cover" />
      </div>

      <DecorativeElement type="compass" position="top-8 right-8" delay={0.5} />
      <DecorativeElement type="heart" position="bottom-8 left-8" delay={0.7} />

      <div className="max-w-3xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                theme === "warm" ? "bg-primary/10" : "bg-wedding-skyblue/30"
              }`}
            >
              <Gift className={`w-10 h-10 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`} />
            </div>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-serif mb-6 ${
              theme === "warm" ? "text-primary" : "text-wedding-navy"
            }`}
          >
            Regalo
          </h2>

          <p className={`text-xl mb-2 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>
            Lo más importante es vuestra presencia,
          </p>
          <p className={`text-xl mb-2 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>
            pero si deseáis hacernos un regalo,
          </p>
          <p className={`text-xl mb-6 ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>
            aquí dejamos nuestro número de cuenta
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`rounded-lg border p-4 mb-8 ${
            theme === "warm"
              ? "bg-white/50 backdrop-blur-sm border-primary/30"
              : "bg-wedding-skyblue/30 border-wedding-navy/30"
          }`}
        >
          <p className={`text-center text-xl font-medium ${theme === "warm" ? "text-primary" : "text-wedding-navy"}`}>
            {accountNumber}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className={`${
              theme === "warm"
                ? "border-primary/50 text-primary hover:bg-primary/10"
                : "border-wedding-navy/50 text-wedding-navy hover:bg-wedding-skyblue/30"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar número de cuenta
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

