"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(3,6,4,0.90)] backdrop-blur-lg border-b border-[rgba(40,230,105,0.07)]"
            : "bg-transparent"
        }`}
      >
        <div className="section-padding flex items-center justify-between h-[68px] md:h-[76px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-6 h-6 border border-[rgba(32,229,106,0.45)] flex items-center justify-center group-hover:border-[#20E56A] transition-all duration-300">
              <div className="w-1.5 h-1.5 bg-[#20E56A] group-hover:scale-125 transition-transform duration-300" />
            </div>
            <span className="font-serif text-[14px] tracking-[0.12em] text-[#F1F1EA] uppercase font-light">
              Nayab Aslam<span className="text-[#20E56A]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-label text-[#A7ADA5] hover:text-[#F1F1EA] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#20E56A] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <a href="#contact" className="btn-outline py-2.5 px-5 text-[9px]">
              Let&apos;s Connect
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className="block w-6 h-px bg-[#F1F1EA] transition-all duration-300" />
            <span className="block w-4 h-px bg-[#20E56A] transition-all duration-300" />
            <span className="block w-6 h-px bg-[#F1F1EA] transition-all duration-300" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu onClose={() => setMenuOpen(false)} links={navLinks} />
        )}
      </AnimatePresence>
    </>
  );
}
