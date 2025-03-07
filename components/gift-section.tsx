"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Copy, Check, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import DecorativeElement from "./decorative-element"
import { useTheme } from "@/contexts/ThemeContext"

export default function GiftSection() {
  const sectionRef = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [copied, setCopied] = useState(false)
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
                  ${theme === "warm" ? "bg-[#f8f5f1]" : "bg-white"}`}
    >
      {/* Fondo animado */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

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
                theme === "warm" ? "bg-[#8a6d46]/10" : "bg-wedding-skyblue/30"
              }`}
            >
              <Gift className={`w-10 h-10 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`} />
            </div>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-serif mb-6 ${
              theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
            }`}
          >
            Regalo
          </h2>

          <p className={`text-xl mb-2 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
            Lo más importante es vuestra presencia,
          </p>
          <p className={`text-xl mb-2 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
            pero si deseáis hacernos un regalo,
          </p>
          <p className={`text-xl mb-6 ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
            aquí dejamos nuestro número de cuenta
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`rounded-lg border p-4 mb-8 ${
            theme === "warm"
              ? "bg-white/50 backdrop-blur-sm border-[#8a6d46]/30"
              : "bg-wedding-skyblue/30 border-wedding-navy/30"
          }`}
        >
          <p className={`text-center text-xl font-medium ${theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"}`}>
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
                ? "border-[#8a6d46]/50 text-[#8a6d46] hover:bg-[#8a6d46]/10 hover:text-[#8a6d46]"
                : "border-wedding-navy/50 text-wedding-navy hover:bg-wedding-skyblue/30 hover:text-wedding-navy"
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

