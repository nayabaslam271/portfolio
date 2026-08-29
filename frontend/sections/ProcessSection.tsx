"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionParticles } from "@/components/SectionParticles";

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "I start by understanding your goals, audience and technical requirements. Clear scope means clean execution.",
  },
  {
    number: "02",
    title: "Plan & Design",
    description:
      "Architecture, tech stack and UI direction are mapped out before a single line of code is written.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Full stack development — frontend, backend, database — built with clean, maintainable code and best practices.",
  },
  {
    number: "04",
    title: "Launch & Grow",
    description:
      "Deployment, performance optimisation and ongoing digital marketing to ensure the product reaches the right people.",
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative bg-[#070B08] section-padding py-24 md:py-36 overflow-hidden"
      aria-label="Creative process"
    >
      <SectionParticles intensity={0.2} lines />
      <div className="mb-14 max-w-xl relative z-10">
        <SectionHeading
          label="How I Work"
          title="My Development Process"
          accentWord="Development"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(40,230,105,0.05)] relative z-10">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.11 }}
            className="group bg-[#070B08] hover:bg-[#0A0F0B] p-8 md:p-10 relative transition-colors duration-400"
          >
            {/* Large background number */}
            <div className="font-serif text-[72px] md:text-[88px] font-light text-[rgba(32,229,106,0.05)] leading-none mb-5 group-hover:text-[rgba(32,229,106,0.09)] transition-colors duration-300 select-none">
              {step.number}
            </div>

            {/* Green dot + line indicator */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1.5 h-1.5 bg-[#20E56A] rounded-full flex-shrink-0" />
              <div className="flex-1 h-px bg-[rgba(32,229,106,0.12)]" />
            </div>

            <h3 className="font-serif text-[24px] font-light text-[#F1F1EA] mb-3">
              {step.title}
            </h3>
            <p className="text-[13px] text-[#59635B] leading-relaxed group-hover:text-[#A7ADA5] transition-colors duration-400 font-light">
              {step.description}
            </p>

            {/* Bottom reveal line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-[#20E56A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
