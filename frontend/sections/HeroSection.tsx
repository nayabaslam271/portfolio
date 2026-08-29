"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Github } from "lucide-react";
import { XIcon } from "@/components/XIcon";
import Image from "next/image";

const stats = [
  { value: "10+", label: "Tech Skills" },
  { value: "6+", label: "Marketing Skills" },
  { value: "Full", label: "Stack Dev" },
  { value: "360°", label: "Digital Growth" },
];

const heroSocials = [
  { icon: <Github size={14} />, href: "https://github.com/nayabaslam271", label: "GitHub" },
  { icon: <Linkedin size={14} />, href: "https://www.linkedin.com/in/nayab-aslam-9a64092b5/", label: "LinkedIn" },
  { icon: <Instagram size={14} />, href: "https://www.instagram.com/n_a_y_a_b_aslam?igsi=ZHZlenR0ZW9kNnJx", label: "Instagram" },
  { icon: <XIcon size={14} />, href: "https://x.com/Nayab_Aslam_", label: "X (Twitter)" },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero section"
    >
      {/* ─── Background ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=85"
          alt="Full stack web development code on dark screen"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Heavy dark overlay — near black */}
        <div className="absolute inset-0 bg-[#000000]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/50 to-[#000000]/95" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        {/* Subtle green atmospheric tint */}
        <div className="absolute inset-0 bg-[rgba(5,14,8,0.20)]" />
      </div>

      {/* ─── Main content ────────────────────────────────── */}
      <div className="relative z-10 section-padding flex flex-col min-h-screen pt-28 md:pt-36 pb-10 items-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45 }}
          className="flex items-center gap-3 mb-7 justify-center"
        >
          <span className="block w-8 h-px bg-[#20E56A]" />
          <span className="text-label text-[#20E56A] tracking-[0.26em]">
            Full Stack Developer & Marketing Manager
          </span>
          <span className="block w-8 h-px bg-[#20E56A]" />
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.0,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-hero font-serif font-light text-[#F1F1EA] max-w-4xl text-center"
          >
            Building Digital{" "}
            <em className="green-accent green-text-glow not-italic">
              Experiences
            </em>
            <br />
            That Make an Impact
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.85 }}
          className="text-[13px] md:text-[14px] text-[#A7ADA5] leading-[1.85] max-w-[480px] mb-10 font-sans font-light text-center"
        >
          I combine full stack development, web technologies and digital
          marketing to create modern digital experiences that help businesses
          grow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 1.05 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <a href="#work" className="btn-primary">
            View My Work
            <ArrowRight size={11} />
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex items-center gap-3 mt-8"
        >
          {heroSocials.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 border border-[rgba(40,230,105,0.15)] flex items-center justify-center text-[#59635B] hover:text-[#20E56A] hover:border-[rgba(32,229,106,0.45)] transition-all duration-300"
            >
              {icon}
            </a>
          ))}
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 1.25 }}
          className="border-t border-[rgba(40,230,105,0.09)] pt-8 w-full"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`text-center ${
                  i < stats.length - 1
                    ? "md:border-r border-[rgba(40,230,105,0.09)]"
                    : ""
                } md:pr-8 md:pl-8`}
              >
                <div className="font-serif text-[30px] md:text-[36px] font-light text-[#20E56A] leading-none">
                  {s.value}
                </div>
                <div className="text-label text-[#59635B] mt-1.5 tracking-[0.2em]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute right-8 bottom-14 z-10 hidden lg:flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-label text-[#3A4040] writing-vertical tracking-[0.28em]">
          Scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-[rgba(32,229,106,0.4)] to-transparent" />
      </motion.div>    </section>
  );
}
