"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionParticles } from "@/components/SectionParticles";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Next.js & Python",
    year: "2026",
    image: "/e-p.png",
  },

  {
    title: "WordPress Business Site",
    category: "WordPress CMS",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Marketing Dashboard",
    category: "Digital Marketing",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

export function ProductionsSection() {
  return (
    <section
      id="work"
      className="relative bg-[#050805] section-padding py-24 md:py-36 overflow-hidden"
      aria-label="Latest productions"
    >
      <SectionParticles intensity={0.15} count={28} />
      {/* Header row */}
      <div className="flex items-end justify-between mb-12 md:mb-16 relative z-10">
        <SectionHeading
          label="Selected Work"
          title="Selected Work"
          accentWord="Selected"
        />

        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="hidden md:flex items-center gap-2 btn-ghost group shrink-0 ml-8 mb-1"
        >
          View All Work
          <ArrowRight
            size={11}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </motion.a>
      </div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2.5">
        {/* Large image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1 }}
          data-cursor="view"
          className="lg:col-span-3 relative h-[360px] md:h-[540px] overflow-hidden group cursor-none"
        >
          <Image
            src={projects[0].image}
            alt={`${projects[0].title} – project screenshot`}
            fill
            className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030604]/85 via-[#030604]/15 to-transparent" />
          <div className="absolute inset-0 bg-[#030604]/15 group-hover:bg-[#030604]/05 transition-colors duration-500" />

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-label text-[#20E56A] tracking-[0.24em] mb-2 block">
              {projects[0].category}
            </span>
            <h3 className="font-serif text-[30px] md:text-[40px] font-light text-[#F1F1EA] leading-tight">
              {projects[0].title}
            </h3>
            <span className="text-label text-[#59635B] mt-1 block tracking-[0.18em]">
              {projects[0].year}
            </span>
          </div>
        </motion.div>

        {/* Two stacked images */}
        <div className="lg:col-span-2 flex flex-col gap-2.5">
          {projects.slice(1).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.2 + i * 0.14 }}
              data-cursor="view"
              className="relative h-[175px] md:h-[262px] overflow-hidden group cursor-none"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030604]/85 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[#030604]/15 group-hover:bg-[#030604]/05 transition-colors duration-500" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-label text-[#20E56A] tracking-[0.24em] mb-1 block">
                  {project.category}
                </span>
                <h3 className="font-serif text-[20px] md:text-[24px] font-light text-[#F1F1EA]">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 flex md:hidden"
      >
        <a href="#work" className="btn-ghost group flex items-center gap-2">
          View All Work
          <ArrowRight size={11} />
        </a>
      </motion.div>
    </section>
  );
}
