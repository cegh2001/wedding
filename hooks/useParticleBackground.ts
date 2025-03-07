import { useEffect } from "react";

interface ParticleConfig {
  count?: number;
}

// Clase para manejar las partículas del fondo
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
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, theme: string) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
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
      this.color = warmColors[Math.floor(Math.random() * warmColors.length)];
    } else {
      // Paleta fría: tonos azules, celestes y turquesas
      const coolColors = [
        "#a7e8f3",
        "#70cfe3",
        "#5bbcd5",
        "#4099c2",
        "#2d7fb3",
      ];
      this.color = coolColors[Math.floor(Math.random() * coolColors.length)];
    }
  }

  update() {
    // Movimiento ondulante suave para simular luciérnagas
    this.x += this.speedX * (Math.sin(Date.now() * 0.001) * 0.2 + 0.8);
    this.y += this.speedY * (Math.cos(Date.now() * 0.0015) * 0.2 + 0.8);

    // Pulsación del brillo
    this.opacity =
      this.baseOpacity +
      Math.sin(Date.now() * this.glowSpeed + this.glowOffset) *
        this.glowIntensity;

    // Mantener las partículas dentro del canvas
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
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

export function useAnimatedBackground(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  theme: string,
  config: ParticleConfig = {}
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Configuración de partículas
    const particleCount = config.count || 70;
    const particles: Particle[] = [];

    // Inicializar partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas, theme));
    }

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Configurar composición para mejor efecto de brillo
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      // Restaurar composición normal
      ctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Limpieza
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef, theme, config]);
}