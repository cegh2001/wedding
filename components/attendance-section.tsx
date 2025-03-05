"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, StampIcon as Passport } from "lucide-react"
import DecorativeElement from "./decorative-element"
import { useTheme } from "@/contexts/ThemeContext"

export default function AttendanceSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { theme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    setTimeout(() => {
      setDialogOpen(false)
      setTimeout(() => {
        setSubmitted(false)
      }, 300)
    }, 2000)
  }

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300
                  ${theme === "warm" ? "bg-[#f8f5f0]" : "bg-white"}`}
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

      <DecorativeElement type="heart" position="top-8 left-8" delay={0.5} />
      <DecorativeElement type="compass" position="bottom-8 right-8" delay={0.7} />

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
            Confirma tu Asistencia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-md mx-auto ${
            theme === "warm" ? "border border-[#8a6d46]/20" : "border border-wedding-navy/20"
          }`}
        >
          <div className="text-center mb-6">
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                theme === "warm" ? "bg-[#8a6d46]/10" : "bg-wedding-skyblue/30"
              }`}
            >
              <Passport className={`w-10 h-10 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`} />
            </div>
            <h3 className={`text-2xl font-serif mb-2 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
              ¿Listo para embarcar?
            </h3>
            <p className={theme === "warm" ? "text-[#8a6d46]/80" : "text-wedding-turquoise"}>
              Tu presencia hará nuestro viaje aún más especial
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center">
              <span className={theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}>
                Confirma tu asistencia y la de tus acompañantes
              </span>
            </div>
          </div>

          <Button
            onClick={() => setDialogOpen(true)}
            className={`w-full ${
              theme === "warm"
                ? "bg-[#8a6d46] hover:bg-[#8a6d46]/90 text-white"
                : "bg-wedding-navy hover:bg-wedding-navy/90 text-wedding-skyblue"
            }`}
          >
            Reservar mi lugar
          </Button>
        </motion.div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className={`bg-white border-2 max-w-md ${theme === "warm" ? "border-[#8a6d46]/30" : "border-wedding-navy/30"}`}
        >
          <DialogHeader>
            <DialogTitle
              className={`text-2xl font-serif text-center ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}
            >
              Reserva tu Asiento
            </DialogTitle>
            <DialogDescription
              className={`text-center ${theme === "warm" ? "text-[#8a6d46]/80" : "text-wedding-turquoise"}`}
            >
              Completa tu tarjeta de embarque para nuestro viaje de amor.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="py-6 text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  theme === "warm" ? "bg-[#8a6d46]/10" : "bg-wedding-skyblue/30"
                }`}
              >
                <Check className={`h-8 w-8 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`} />
              </div>
              <h3 className={`text-xl font-medium mb-2 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
                ¡Reserva Confirmada!
              </h3>
              <p className={theme === "warm" ? "text-[#8a6d46]/80" : "text-wedding-turquoise"}>
                Tu asiento está reservado. ¡Prepárate para despegar hacia nuestra celebración!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className={theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}>
                  Nombre del pasajero
                </Label>
                <Input
                  id="name"
                  placeholder="Tu nombre completo"
                  required
                  className={`border ${
                    theme === "warm"
                      ? "border-[#8a6d46]/30 focus-visible:ring-[#8a6d46]/50"
                      : "border-wedding-navy/30 focus-visible:ring-wedding-turquoise/50"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label className={theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}>
                  Confirmación de vuelo
                </Label>
                <RadioGroup defaultValue="yes" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="yes"
                      id="yes"
                      className={
                        theme === "warm" ? "text-[#8a6d46] border-[#8a6d46]" : "text-wedding-navy border-wedding-navy"
                      }
                    />
                    <Label
                      htmlFor="yes"
                      className={`cursor-pointer ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}
                    >
                      Sí, asistiré
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="no"
                      id="no"
                      className={
                        theme === "warm" ? "text-[#8a6d46] border-[#8a6d46]" : "text-wedding-navy border-wedding-navy"
                      }
                    />
                    <Label
                      htmlFor="no"
                      className={`cursor-pointer ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}
                    >
                      No podré asistir
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className={theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}>
                  Pasajeros adicionales
                </Label>
                <Select defaultValue="0">
                  <SelectTrigger
                    className={`border ${
                      theme === "warm"
                        ? "border-[#8a6d46]/30 text-[#8a6d46] focus-visible:ring-[#8a6d46]/50"
                        : "border-wedding-navy/30 text-wedding-navy focus-visible:ring-wedding-turquoise/50"
                    }`}
                  >
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Solo yo</SelectItem>
                    <SelectItem value="1">1 acompañante</SelectItem>
                    <SelectItem value="2">2 acompañantes</SelectItem>
                    <SelectItem value="3">3 acompañantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary" className={theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}>
                  Menú especial
                </Label>
                <Input
                  id="dietary"
                  placeholder="Alergias o restricciones alimentarias"
                  className={`border ${
                    theme === "warm"
                      ? "border-[#8a6d46]/30 focus-visible:ring-[#8a6d46]/50"
                      : "border-wedding-navy/30 focus-visible:ring-wedding-turquoise/50"
                  }`}
                />
              </div>

              <Button
                type="submit"
                className={`w-full ${
                  theme === "warm"
                    ? "bg-[#8a6d46] hover:bg-[#8a6d46]/90 text-white"
                    : "bg-wedding-navy hover:bg-wedding-navy/90 text-white"
                }`}
              >
                Confirmar Reserva
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

