"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, StampIcon as Passport } from "lucide-react";
import DecorativeElement from "./decorative-element";
import { useTheme } from "@/contexts/ThemeContext";

export default function AttendanceSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { theme } = useTheme();
  const { register, handleSubmit, formState, reset, setValue } = useForm();
  const { isSubmitting, isSubmitSuccessful } = formState;
  const [open, setOpen] = useState(false);

  const onSubmit = (data: any) => {
   return console.log("Formulario enviado:", data);
    setOpen(true);
    setTimeout(() => reset(), 2000);
  };

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 py-16 transition-colors duration-300
                  ${theme === "warm" ? "bg-background" : "bg-white"}`}
    >
      <div className="absolute inset-0 opacity-[0.15] z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="World map"
          fill
          className="object-cover"
        />
      </div>

      <DecorativeElement type="heart" position="top-8 left-8" delay={0.5} />
      <DecorativeElement
        type="compass"
        position="bottom-8 right-8"
        delay={0.7}
      />

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
            Confirma tu Asistencia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-md mx-auto border ${
            theme === "warm" ? "border-primary/20" : "border-wedding-navy/20"
          }`}
        >
          <div className="text-center mb-6">
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                theme === "warm" ? "bg-primary/10" : "bg-wedding-skyblue/30"
              }`}
            >
              <Passport
                className={`w-10 h-10 ${
                  theme === "warm" ? "text-primary" : "text-wedding-navy"
                }`}
              />
            </div>
            <h3
              className={`text-2xl font-serif mb-2 ${
                theme === "warm" ? "text-primary" : "text-wedding-navy"
              }`}
            >
              ¿Asistirás?
            </h3>
            <p
              className={
                theme === "warm" ? "text-primary/80" : "text-wedding-turquoise"
              }
            >
              Tu presencia hará nuestra celebración aún más especial
            </p>
          </div>

          <Button
            onClick={() => {
              reset();
              setOpen(true);
            }}
            className={`w-full ${
              theme === "warm"
                ? "bg-primary hover:bg-primary/90 text-white"
                : "bg-wedding-navy hover:bg-wedding-navy/90 text-white"
            }`}
          >
            Reservar mi lugar
          </Button>
        </motion.div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`bg-white border-2 max-w-md ${
            theme === "warm" ? "border-primary/30" : "border-wedding-navy/30"
          }`}
        >
          <DialogHeader>
            <DialogTitle
              className={`text-2xl font-serif text-center ${
                theme === "warm" ? "text-primary" : "text-wedding-navy"
              }`}
            >
              Asistirá a la boda
            </DialogTitle>
            <DialogDescription
              className={`text-center ${
                theme === "warm" ? "text-primary/80" : "text-wedding-turquoise"
              }`}
            >
              Completa el siguiente formulario para confirmar tu asistencia
            </DialogDescription>
          </DialogHeader>

          {isSubmitSuccessful ? (
            <div className="py-6 text-center">
              <Check className="h-8 w-8 text-green-600 mx-auto" />
              <h3 className="text-xl font-medium text-green-700">
                ¡Reserva Confirmada!
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="py-4 space-y-4">
              <Label
                className={
                  theme === "warm" ? "text-primary" : "text-wedding-navy"
                }
              >
                ¿Podrás asistir?
              </Label>
              <RadioGroup
                onValueChange={(value) => setValue("attendance", value)} // Actualiza el valor en useForm
                defaultValue=""
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="attendance-yes" />
                  <Label htmlFor="attendance-yes">Sí, asistiré</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="attendance-no" />
                  <Label htmlFor="attendance-no">No podré asistir</Label>
                </div>
              </RadioGroup>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
