"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  accentWord?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  accentWord,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const parts = accentWord ? title.split(accentWord) : [title];

  return (
    <div className={`${centered ? "flex flex-col items-center" : ""} ${className}`}>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className={`flex items-center gap-3 mb-5 ${centered ? "justify-center" : ""}`}
        >
          <span className="block w-7 h-px bg-[#20E56A]" />
          <span className="text-label text-[#20E56A] tracking-[0.24em]">{label}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.08 }}
        className={`text-section-heading font-serif font-light text-[#F1F1EA] ${centered ? "text-center" : ""}`}
      >
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <span className="green-accent">{accentWord}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </motion.h2>
    </div>
  );
}
