"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop",
    title: "Strategic Consulting for Growing Organizations",
    subtitle: "Expert financial and compliance guidance tailored to your mission.",
  },
  {
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    title: "NGO Compliance Made Simple",
    subtitle: "Stay audit-ready with FCRA, FEMA and regulatory expertise.",
  },
  {
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop",
    title: "Certified Professional Training Programs",
    subtitle: "Hands-on courses designed by industry-certified trainers.",
  },
  {
    image: "https://images.unsplash.com/photo-1551836022-d5dbb9091624?q=80&w=2070&auto=format&fit=crop",
    title: "Internship Program 2026 — Now Open",
    subtitle: "Kickstart your career with real-world accounting and NGO experience.",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
    title: "Empowering Businesses & NGOs Nationwide",
    subtitle: "500+ clients trust us for accounting, audit, and growth strategy.",
  },
]

const AUTOPLAY_INTERVAL = 5000

export default function HeroBannerSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[85vh] mt-16 lg:mt-20 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[active].image}
            alt={slides[active].title}
            fill
            priority={active === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Slide caption */}
      <div className="absolute inset-x-0 bottom-0 px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-2xl leading-tight">
                {slides[active].title}
              </h2>
              <p className="text-sm sm:text-base text-white/80 mt-2 max-w-xl">
                {slides[active].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(active - 1)}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(active + 1)}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 sm:right-8 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
