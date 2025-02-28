"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll("section")
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const buttonColor =
    theme === "warm"
      ? scrollPosition > 100 || isOpen
        ? "bg-wedding-champagne text-white"
        : "bg-white text-wedding-champagne"
      : scrollPosition > 100 || isOpen
        ? "bg-wedding-navy text-white"
        : "bg-white text-wedding-navy"

  const menuItemColor =
    theme === "warm"
      ? "text-wedding-champagne hover:bg-wedding-champagne/10"
      : "text-wedding-navy hover:bg-wedding-navy/10"

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMenu}
        className={`fixed top-6 right-6 z-50 p-2 rounded-full shadow-md ${buttonColor}`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <motion.nav
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-lg p-4 md:p-8 max-w-sm md:max-w-md w-full mx-4"
            >
              <ul className="space-y-2 md:space-y-4">
                {[
                  "Bienvenida",
                  "Prepárate",
                  "Pasaporte",
                  "Escala y Destino",
                  "Asistencia",
                  "Itinerario",
                  "Regalo",
                  "Cuenta Regresiva",
                  "Fotos",
                ].map((item, index) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(index)}
                      className={`w-full text-left py-3 px-4 rounded-lg transition-colors text-lg font-medium ${menuItemColor}`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

