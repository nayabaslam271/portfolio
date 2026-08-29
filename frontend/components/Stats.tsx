"use client";

import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface StatsProps {
  stats: Stat[];
  className?: string;
}

export function Stats({ stats, className = "" }: StatsProps) {
  return (
    <div className={`grid grid-cols-2 gap-x-8 gap-y-6 ${className}`}>
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: i * 0.09 }}
        >
          <div className="font-serif text-[38px] font-light text-[#20E56A] leading-none">
            {stat.value}
          </div>
          <div className="text-label text-[#59635B] tracking-[0.2em] mt-1.5">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
