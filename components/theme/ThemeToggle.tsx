"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { cn } from "@/lib/utils"

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative w-9 h-9 rounded-lg flex items-center justify-center text-(--text-muted) hover:text-(--text) hover:bg-(--surface) transition-all",
        className
      )}
    >
      <Sun className={cn("w-[18px] h-[18px] transition-all", theme === "dark" ? "scale-0 -rotate-90 absolute" : "scale-100 rotate-0")} />
      <Moon className={cn("w-[18px] h-[18px] transition-all", theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90 absolute")} />
    </button>
  )
}
