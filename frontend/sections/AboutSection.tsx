"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Stats } from "@/components/Stats";
import { SectionParticles } from "@/components/SectionParticles";

const stats = [
  { value: "10+", label: "Technologies" },
  { value: "6+", label: "Marketing Skills" },
  { value: "Web", label: "Development" },
  { value: "360°", label: "Digital Strategy" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[#050805] section-padding py-24 md:py-36 overflow-hidden"
      aria-label="About section"
    >
      {/* Particles */}
      <SectionParticles intensity={0.22} />
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-[rgba(32,229,106,0.025)] rounded-full blur-[140px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        {/* ─── Left ─── */}
        <div>
          <SectionHeading
            label="About Me"
            title="Where Code Meets Creativity"
            accentWord="Code"
          />

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 space-y-5"
          >
            <p className="text-[14px] text-[#A7ADA5] leading-[1.85] font-light">
              I&apos;m Nayab Aslam, a Full Stack Developer and Marketing
              Manager focused on building modern digital experiences and helping
              businesses grow through technology and marketing.
            </p>
            <p className="text-[14px] text-[#A7ADA5] leading-[1.85] font-light">
              I work across the full development stack — from crafting clean
              front-ends with HTML, CSS, JavaScript and Next.js to building
              robust back-ends with Python, PHP and SQL — while also driving
              growth through digital marketing, content strategy and brand
              promotion.
            </p>
            <p className="text-[14px] text-[#59635B] leading-[1.85] font-light">
              My approach connects technical precision with marketing
              intelligence to deliver solutions that look great and actually
              perform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.48 }}
            className="mt-10"
          >
            <a href="#about" className="btn-ghost group">
              My Background
              <ArrowRight
                size={11}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-12 pt-12 border-t border-[rgba(40,230,105,0.07)]"
          >
            <Stats stats={stats} />
          </motion.div>
        </div>

        {/* ─── Right: Image Composition ─── */}
        <div className="relative h-[460px] md:h-[600px]">
          {/* Main image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2 }}
            data-cursor="view"
            className="absolute top-0 right-0 w-[86%] h-[82%] overflow-hidden"
          >
            <Image
              src="/nayab-p.png"
              alt="Nayab Aslam – Full Stack Developer & Marketing Manager"
              fill
              className="object-cover object-top hover:scale-[1.04] transition-transform duration-700"
              sizes="(max-width: 1024px) 85vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050805]/50 to-transparent" />
          </motion.div>

          {/* Floating info card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.5 }}
            className="absolute bottom-6 left-0 bg-[#0B110C] border border-[rgba(40,230,105,0.12)] p-5 w-[52%] z-10"
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 border border-[rgba(32,229,106,0.35)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[9px] text-[#20E56A] font-sans font-semibold">
                  01
                </span>
              </div>
              <div>
                <p className="text-[11px] text-[#A7ADA5] leading-relaxed font-light">
                  Full stack development combined with data-driven marketing for real business results.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-[#20E56A]" />
                  <span className="text-label text-[#20E56A] tracking-[0.2em]">
                    Dev + Marketing
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative border frame */}
          <div className="absolute top-8 left-8 w-[32%] h-[32%] border border-[rgba(32,229,106,0.06)] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
