"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "warm" | "cool"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Intentar obtener el tema del localStorage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme
      return savedTheme || "warm" // "warm" es el tema por defecto si no hay nada guardado
    }
    return "warm"
  })

  useEffect(() => {
    // Guardar el tema en localStorage cada vez que cambie
    localStorage.setItem("theme", theme)
    // Aplicar la clase del tema al body
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "warm" ? "cool" : "warm"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

