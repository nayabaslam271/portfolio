"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionParticles } from "@/components/SectionParticles";

interface Testimonial {
  id: number;
  client_name: string;
  role: string;
  company: string;
  testimonial: string;
  rating: number;
}

const fallback: Testimonial[] = [
  {
    id: 1,
    client_name: "Ahmed Raza",
    role: "Founder",
    company: "TechStart PK",
    testimonial:
      "Nayab built our entire web platform from scratch. The combination of solid development skills and marketing thinking meant we launched with a product that actually converts.",
    rating: 5,
  },
  {
    id: 2,
    client_name: "Sara Khan",
    role: "Marketing Director",
    company: "GrowthLab",
    testimonial:
      "What sets Nayab apart is the ability to think like a developer and a marketer at the same time. Our campaign results improved significantly after working together.",
    rating: 5,
  },
  {
    id: 3,
    client_name: "James Whitfield",
    role: "CEO",
    company: "Ecom Ventures",
    testimonial:
      "The e-commerce site Nayab delivered was clean, fast and well-structured. The handoff was smooth and the code quality was excellent throughout.",
    rating: 5,
  },
  {
    id: 4,
    client_name: "Mia Hoffmann",
    role: "Brand Manager",
    company: "Studio Nord",
    testimonial:
      "From WordPress build to social media strategy — Nayab handled everything professionally. One point of contact for both tech and marketing is genuinely rare.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[#20E56A] text-[13px]" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallback);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) return;
    fetch(`${url}/api/testimonials`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (Array.isArray(data) && data.length >= 4) setTestimonials(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      className="bg-[#050805] section-padding py-24 md:py-36 overflow-hidden"
      aria-label="Client testimonials"
    >
      <SectionParticles intensity={0.17} />
      <div className="mb-14 md:mb-18">
        <SectionHeading
          label="Kind Words"
          title="What People Say"
          accentWord="People"
          align="center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(40,230,105,0.05)]">
        {testimonials.slice(0, 4).map((t, i) => (
          <motion.article
            key={t.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.1 }}
            className="group bg-[#050805] hover:bg-[#080D09] p-8 md:p-10 transition-colors duration-400 relative overflow-hidden"
          >
            {/* Big quote mark */}
            <div
              className="absolute top-2 right-5 font-serif text-[120px] leading-none text-[rgba(32,229,106,0.03)] group-hover:text-[rgba(32,229,106,0.06)] transition-colors duration-400 select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Green accent line */}
            <div className="w-7 h-px bg-[#20E56A] mb-5" />

            <Stars count={t.rating} />

            <blockquote className="mt-5 text-[14px] text-[#A7ADA5] leading-[1.85] font-serif font-light italic">
              &ldquo;{t.testimonial}&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center gap-3">
              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-full bg-[#111812] border border-[rgba(40,230,105,0.12)] flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <span className="text-[11px] text-[#20E56A] font-sans font-semibold">
                  {t.client_name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-[13px] text-[#F1F1EA] font-medium">
                  {t.client_name}
                </p>
                <p className="text-[11px] text-[#59635B] mt-0.5">
                  {t.role} — {t.company}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
