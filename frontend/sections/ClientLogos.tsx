"use client";

import { motion } from "framer-motion";
import { SectionParticles } from "@/components/SectionParticles";

const clients = [
  "NEXT.JS",
  "PYTHON",
  "PHP",
  "SQL",
  "WORDPRESS",
  "JAVASCRIPT",
  "HTML & CSS",
  "DIGITAL MARKETING",
];

export function ClientLogos() {
  return (
    <section
      className="bg-[#080D09] border-y border-[rgba(40,230,105,0.05)] section-padding py-14 overflow-hidden"
      aria-label="Client logos"
    >
      <SectionParticles intensity={0.12} count={20} />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-center mb-9"
      >
        <div className="flex items-center gap-4">
          <span className="block w-8 h-px bg-[rgba(40,230,105,0.2)]" />
          <span className="text-label text-[#3A4040] tracking-[0.28em]">
            Technologies & Tools I Work With
          </span>
          <span className="block w-8 h-px bg-[rgba(40,230,105,0.2)]" />
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-x-10 gap-y-5 items-center justify-center">
        {clients.map((client, i) => (
          <motion.div
            key={client}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group"
          >
            <span className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#2A3030] group-hover:text-[#59635B] transition-colors duration-400 uppercase">
              {client}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
