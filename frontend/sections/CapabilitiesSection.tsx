"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Database, TrendingUp, Share2, Layout } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ElementType } from "react";
import { SectionParticles } from "@/components/SectionParticles";

interface Capability {
  number: string;
  Icon: ElementType;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    number: "01",
    Icon: Code2,
    title: "Frontend Development",
    description:
      "Building responsive, accessible interfaces with HTML, CSS, JavaScript and Next.js. Clean code and pixel-perfect execution.",
  },
  {
    number: "02",
    Icon: Database,
    title: "Backend & Databases",
    description:
      "Server-side development with Python and PHP, backed by SQL databases. Reliable, scalable architecture from the ground up.",
  },
  {
    number: "03",
    Icon: Globe,
    title: "WordPress & CMS",
    description:
      "Custom WordPress themes, plugins and CMS solutions tailored to business needs — fast, maintainable and easy to manage.",
  },
  {
    number: "04",
    Icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "SEO, lead generation and data-driven campaigns that bring the right audience to your product and convert them.",
  },
  {
    number: "05",
    Icon: Share2,
    title: "Social Media & Content",
    description:
      "Social media management, content strategy and brand promotion crafted to grow audiences and drive engagement.",
  },
  {
    number: "06",
    Icon: Layout,
    title: "Full Stack Projects",
    description:
      "End-to-end delivery — from database schema to deployed UI — using Next.js, Python, PHP and modern tooling.",
  },
];

export function CapabilitiesSection() {
  return (
    <section
      className="relative bg-[#070B08] section-padding py-24 md:py-36 overflow-hidden"
      aria-label="Capabilities section"
    >
      {/* Particles */}
      <SectionParticles intensity={0.18} lines />
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[rgba(32,229,106,0.02)] rounded-full blur-[140px] pointer-events-none" />

      <div className="mb-14 md:mb-18 relative z-10">
        <SectionHeading
          label="Skills & Expertise"
          title="My Skills & Expertise"
          accentWord="Skills"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(40,230,105,0.05)] relative z-10">
        {capabilities.map((cap, i) => (
          <motion.article
            key={cap.number}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.09 }}
            className="group bg-[#070B08] hover:bg-[#0B110C] p-8 md:p-10 transition-all duration-400 relative overflow-hidden"
          >
            {/* Top green reveal line */}
            <div className="absolute top-0 left-0 w-full h-px bg-[#20E56A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            {/* Icon + Number row */}
            <div className="flex items-start justify-between mb-7">
              <div className="w-10 h-10 border border-[rgba(40,230,105,0.13)] flex items-center justify-center group-hover:border-[rgba(32,229,106,0.4)] transition-colors duration-300">
                <cap.Icon
                  size={15}
                  className="text-[#59635B] group-hover:text-[#20E56A] transition-colors duration-300"
                />
              </div>
              <span className="font-serif text-[30px] font-light text-[rgba(32,229,106,0.1)] group-hover:text-[rgba(32,229,106,0.22)] transition-colors duration-300 leading-none">
                {cap.number}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-[22px] font-light text-[#F1F1EA] mb-3 group-hover:-translate-y-0.5 transition-transform duration-300">
              {cap.title}
            </h3>

            {/* Description */}
            <p className="text-[13px] text-[#59635B] leading-relaxed group-hover:text-[#A7ADA5] transition-colors duration-400 font-light">
              {cap.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
