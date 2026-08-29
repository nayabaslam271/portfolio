import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { CapabilitiesSection } from "@/sections/CapabilitiesSection";
import { ProductionsSection } from "@/sections/ProductionsSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { ClientLogos } from "@/sections/ClientLogos";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { CTASection } from "@/sections/CTASection";
import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CapabilitiesSection />
      <ProductionsSection />
      <ProcessSection />
      <ClientLogos />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </>
  );
}
