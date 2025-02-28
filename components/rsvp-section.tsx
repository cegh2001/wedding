"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Check, Send } from "lucide-react"

export default function RsvpSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full snap-start flex flex-col items-center justify-center relative bg-[#f8f5f0] px-4 md:px-8 py-16"
    >
      <div className="absolute top-0 left-0 w-40 h-40 opacity-10">
        <img
          src="/placeholder.svg?height=200&width=200"
          alt="Passport stamp"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-10">
        <img
          src="/placeholder.svg?height=200&width=200"
          alt="Passport stamp"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-[#2c3e50] mb-4">Confirma tu Asistencia</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-12 bg-[#2c3e50]/30"></div>
            <div className="w-6 h-6 rounded-full border border-[#2c3e50]/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#2c3e50]/60"></div>
            </div>
            <div className="h-[1px] w-12 bg-[#2c3e50]/30"></div>
          </div>
          <p className="text-[#2c3e50]/80">Por favor, confirma tu asistencia antes del 15 de mayo de 2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {submitted ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-[#2c3e50] mb-2">¡Gracias por confirmar!</h3>
              <p className="text-[#2c3e50]/80">
                Hemos recibido tu respuesta. Estamos deseando verte en nuestro gran día.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" placeholder="Tu nombre y apellidos" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>
              </div>

              <div className="mb-6">
                <Label>¿Asistirás a nuestra boda?</Label>
                <RadioGroup defaultValue="yes" className="mt-2 flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="cursor-pointer">
                      Sí, asistiré
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="cursor-pointer">
                      No podré asistir
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-6">
                <div className="space-y-2">
                  <Label htmlFor="guests">Número de invitados (incluyéndote)</Label>
                  <Input id="guests" type="number" min="1" max="5" defaultValue="1" />
                </div>
              </div>

              <div className="mb-6">
                <div className="space-y-2">
                  <Label htmlFor="dietary">Restricciones alimentarias o alergias</Label>
                  <Textarea id="dietary" placeholder="Indícanos si tienes alguna restricción alimentaria o alergia" />
                </div>
              </div>

              <div className="mb-6">
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje para los novios (opcional)</Label>
                  <Textarea id="message" placeholder="Escribe un mensaje para los novios" />
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Enviar confirmación
              </Button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-[#2c3e50]/80">
            Para cualquier consulta, contacta con nosotros en{" "}
            <a href="mailto:boda@mariajuan.com" className="underline">
              boda@mariajuan.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

