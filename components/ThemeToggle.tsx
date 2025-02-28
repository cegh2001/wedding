"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { Thermometer, Snowflake } from "lucide-react"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 z-50 p-2 rounded-full shadow-md bg-white transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none"
      aria-label={`Switch to ${theme === "warm" ? "cool" : "warm"} theme`}
    >
      {theme === "warm" ? (
        <Snowflake size={24} className="text-wedding-turquoise" />
      ) : (
        <Thermometer size={24} className="text-wedding-champagne" />
      )}
    </button>
  )
}

