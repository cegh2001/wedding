"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { theme } = useTheme()

  // Configuración y animación del fondo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const resizeCanvas = () => {
      if (!canvas) return; // Verificación adicional para TypeScript
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Configuración de luciérnagas según el tema
    const particleCount = 70;
    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseOpacity: number;
      opacity: number;
      glowIntensity: number;
      glowSpeed: number;
      glowOffset: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.baseOpacity = Math.random() * 0.6 + 0.2;
        this.opacity = this.baseOpacity;
        this.glowIntensity = Math.random() * 0.3 + 0.2;
        this.glowSpeed = Math.random() * 0.008 + 0.002;
        this.glowOffset = Math.random() * Math.PI * 2;

        // Asignar colores según tema
        if (theme === "warm") {
          // Paleta cálida: tonos dorados, ámbar y naranja suave
          const warmColors = [
            "#f8d56c",
            "#f0b429",
            "#e59913",
            "#d68212",
            "#c77310",
          ];
          this.color =
            warmColors[Math.floor(Math.random() * warmColors.length)];
        } else {
          // Paleta fría: tonos azules, celestes y turquesas
          const coolColors = [
            "#a7e8f3",
            "#70cfe3",
            "#5bbcd5",
            "#4099c2",
            "#2d7fb3",
          ];
          this.color =
            coolColors[Math.floor(Math.random() * coolColors.length)];
        }
      }

      update() {
        if (!canvas) return;

        // Movimiento ondulante suave para simular luciérnagas
        this.x += this.speedX * (Math.sin(Date.now() * 0.001) * 0.2 + 0.8);
        this.y += this.speedY * (Math.cos(Date.now() * 0.0015) * 0.2 + 0.8);

        // Pulsación del brillo
        this.opacity =
          this.baseOpacity +
          Math.sin(Date.now() * this.glowSpeed + this.glowOffset) *
            this.glowIntensity;

        // Mantener las partículas dentro del canvas
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;

        // Crear efecto de brillo con gradientes
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 3
        );

        gradient.addColorStop(0, `${this.color}`);
        gradient.addColorStop(0.4, `${this.color}80`);
        gradient.addColorStop(1, `${this.color}00`);

        // Dibujar el círculo brillante
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Dibujar el halo
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.globalAlpha = 1;
      }
    }

    // Inicializar partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Configurar composición para mejor efecto de brillo
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Restaurar composición normal
      ctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

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
                  ${theme === "warm" ? "bg-[#f8f5f1]" : "bg-white"}`}
    >
      {/* Fondo animado */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

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

