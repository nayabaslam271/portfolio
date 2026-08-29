"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface MobileMenuProps {
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ onClose, links }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-[100] bg-[#030604] flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 h-[68px]">
        <span className="font-serif text-[14px] tracking-[0.12em] text-[#F1F1EA] uppercase font-light">
          Nayab<span className="text-[#20E56A]">.</span>
        </span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 text-[#59635B] hover:text-[#F1F1EA] transition-colors duration-300"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav Links */}
      <nav
        className="flex-1 flex flex-col justify-center px-8 gap-1"
        aria-label="Mobile navigation"
      >
        {links.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
            onClick={onClose}
            className="font-serif text-[46px] md:text-[64px] font-light text-[#A7ADA5] hover:text-[#20E56A] active:text-[#20E56A] focus:text-[#20E56A] transition-colors duration-300 leading-tight py-2 group relative outline-none"
          >
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-px bg-[#20E56A] group-hover:w-6 transition-all duration-300" />
            <span className="group-hover:translate-x-8 transition-transform duration-300 block">
              {link.label}
            </span>
          </motion.a>
        ))}
      </nav>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="px-8 pb-12"
      >
        <a
          href="#contact"
          onClick={onClose}
          className="btn-primary w-full justify-center"
        >
          Let&apos;s Connect
        </a>
      </motion.div>
    </motion.div>
  );
}
