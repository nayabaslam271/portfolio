"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionParticles } from "@/components/SectionParticles";

export function CTASection() {
  return (
    <section
      className="relative bg-[#070B08] section-padding py-28 md:py-44 overflow-hidden text-center"
      aria-label="Call to action"
    >
      <SectionParticles intensity={0.25} lines count={40} />
      {/* Ambient green glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[500px] bg-[rgba(32,229,106,0.035)] rounded-full blur-[150px]" />
      </div>

      {/* Top + bottom lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(32,229,106,0.14)] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(32,229,106,0.14)] to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-center gap-4 mb-9"
        >
          <span className="block w-8 h-px bg-[rgba(32,229,106,0.45)]" />
          <span className="text-label text-[#20E56A] tracking-[0.28em]">
            Hire Me
          </span>
          <span className="block w-8 h-px bg-[rgba(32,229,106,0.45)]" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="font-serif font-light text-[#F1F1EA] mb-7"
          style={{
            fontSize: "clamp(38px, 5vw, 72px)",
            lineHeight: 1.04,
          }}
        >
          Ready to Build Something{" "}
          <em className="green-accent green-text-glow not-italic">Great</em>?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-[14px] text-[#A7ADA5] leading-relaxed mb-12 max-w-md mx-auto font-light"
        >
          Let&apos;s work together on your next web project or marketing
          campaign. I&apos;m always open to interesting challenges.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.33 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="btn-primary">
            Hire Me
            <ArrowRight size={11} />
          </a>
          <a href="#work" className="btn-outline">
            View My Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
