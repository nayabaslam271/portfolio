"use client";

import { Instagram, Linkedin, Github } from "lucide-react";
import { XIcon } from "./XIcon";
import { SectionParticles } from "./SectionParticles";

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { icon: <Instagram size={13} />, href: "https://www.instagram.com/n_a_y_a_b_aslam", label: "Instagram" },
  { icon: <Linkedin size={13} />, href: "https://www.linkedin.com/in/nayab-aslam-9a64092b5/", label: "LinkedIn" },
  { icon: <Github size={13} />, href: "https://github.com/nayabaslam271", label: "GitHub" },
  { icon: <XIcon size={13} />, href: "https://x.com/Nayab_Aslam_", label: "X (Twitter)" },
];

export function Footer() {
  return (
    <footer className="bg-[#020403] border-t border-[rgba(40,230,105,0.07)] relative overflow-hidden">
      <SectionParticles intensity={0.1} count={18} />
      <div className="section-padding py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-5 h-5 border border-[rgba(32,229,106,0.4)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#20E56A]" />
              </div>
              <span className="font-serif text-[13px] tracking-[0.12em] text-[#F1F1EA] uppercase font-light">
                Nayab<span className="text-[#20E56A]">.</span>
              </span>
            </div>
            <p className="text-[12px] text-[#59635B] leading-relaxed max-w-[200px]">
              Full Stack Developer & Marketing Manager building modern digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-label text-[#20E56A] mb-5 tracking-[0.22em]">Navigation</p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[12px] text-[#59635B] hover:text-[#A7ADA5] transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <p className="text-label text-[#20E56A] mb-5 tracking-[0.22em]">Connect</p>
            <div className="flex flex-col gap-3 mb-7">
              <a
                href="mailto:nayabaslam271@gmail.com"
                className="text-[12px] text-[#59635B] hover:text-[#A7ADA5] transition-colors duration-300"
              >
                nayabaslam271@gmail.com
              </a>
              <span className="text-[12px] text-[#59635B]">Available for freelance & full-time</span>
              <span className="text-[12px] text-[#59635B]">Remote — Worldwide</span>
            </div>
            <div className="flex gap-3">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 border border-[rgba(40,230,105,0.12)] flex items-center justify-center text-[#59635B] hover:text-[#20E56A] hover:border-[rgba(32,229,106,0.35)] transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[rgba(40,230,105,0.05)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-[#3A4040] tracking-[0.12em]">
            © 2026 Nayab Aslam. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-[10px] text-[#3A4040] hover:text-[#59635B] transition-colors tracking-[0.1em]"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
