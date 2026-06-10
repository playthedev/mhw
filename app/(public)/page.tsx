import HeroSection from "@/components/sections/HeroSection"
import StatsSection from "@/components/sections/StatsSection"
import ServicesPreview from "@/components/sections/ServicesPreview"
import CoursesPreview from "@/components/sections/CoursesPreview"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import CTASection from "@/components/sections/CTASection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <CoursesPreview />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
