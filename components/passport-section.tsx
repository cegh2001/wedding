"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import DecorativeElement from "./decorative-element";
import { useTheme } from "@/contexts/ThemeContext";

export default function PassportSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { theme } = useTheme();

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
        // Asegurando que canvas no es nulo con el operador non-null assertion
        // porque ya verificamos anteriormente
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.3 - 0.15; // Reducida velocidad horizontal
        this.speedY = Math.random() * 0.3 - 0.15; // Reducida velocidad vertical
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
        if (!canvas) return; // Verificación adicional para TypeScript

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
        gradient.addColorStop(0.4, `${this.color}80`); // 50% opacidad
        gradient.addColorStop(1, `${this.color}00`); // 0% opacidad

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

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full snap-start flex flex-col items-center justify-center relative px-4 md:px-8 transition-colors duration-300
                  ${theme === "warm" ? "bg-[#f8f5f1]" : "bg-white"}`}
    >
      {/* Fondo animado */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <DecorativeElement type="compass" position="top-8 right-8" delay={0.5} />
      <DecorativeElement type="heart" position="bottom-8 left-8" delay={0.7} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-sm md:max-w-lg w-full mx-auto bg-white rounded-lg shadow-2xl overflow-hidden"
        style={{
          backgroundImage:
            theme === "warm"
              ? "repeating-linear-gradient(45deg, #ffedd5 0, #f8f5f0 10px, transparent 10px, transparent 20px)"
              : "repeating-linear-gradient(45deg, #E6F4F6 0, #E6F4F6 10px, transparent 100px, transparent 20px)",
        }}
      >
        {/* Header Image */}
        <div className="relative w-full h-36 md:h-48 overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20241124-WA0177%5B1%5D.jpg-yr7zEW5IOE9EuFSaEbtSghG9vTeu7w.jpeg"
            alt="Pareja en la montaña"
            fill
            className="object-cover"
          />
        </div>

        {/* Passport Content */}
        <div
          className={`p-4 md:p-8 border-t-2 ${
            theme === "warm" ? "border-[#8a6d46]/20" : "border-wedding-navy/20"
          }`}
        >
          <div className="text-center mb-6 md:mb-8">
            <h2
              className={`text-xl md:text-2xl font-serif tracking-wide mb-2 ${
                theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
              }`}
            >
              PASAPORTE A NUESTRA BODA
            </h2>
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4">
              <div
                className={`w-full h-full rounded-full border-2 flex items-center justify-center ${
                  theme === "warm" ? "border-[#8a6d46]" : "border-wedding-navy"
                }`}
              >
                <span
                  className={`font-serif text-base md:text-lg ${
                    theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                  }`}
                >
                  C&P
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:space-y-4 text-sm md:text-base">
            {[
              { label: "Fecha", value: "24 de Mayo, 2025" },
              { label: "Hora", value: "18:00 H" },
              { label: "Destino", value: "Barcelona" },
              { label: "Ceremonia", value: "Santa María Reina de Pedralbes" },
              { label: "Banquete", value: "Can Bonastre Wine Resort" },
            ].map((item, index) => (
              <div key={index} className="flex">
                <span
                  className={`w-24 ${
                    theme === "warm"
                      ? "text-[#8a6d46]/60"
                      : "text-wedding-navy/60"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={
                    theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                  }
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 md:mt-8">
            <h3
              className={`text-xl md:text-2xl font-serif tracking-wide ${
                theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
              }`}
            >
              MARÍA & JHON
            </h3>
          </div>

          {/* Decorative Stamp */}
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-16 h-16 md:w-20 md:h-20 opacity-30">
            <div
              className={`w-full h-full rounded-full border-2 flex items-center justify-center rotate-[-15deg] ${
                theme === "warm" ? "border-[#8a6d46]" : "border-wedding-navy"
              }`}
            >
              <span
                className={`font-serif text-xs md:text-sm ${
                  theme === "warm" ? "text-[#8a6d46]" : "text-wedding-navy"
                }`}
              >
                VISA
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
