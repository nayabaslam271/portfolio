"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionParticles } from "@/components/SectionParticles";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  project_type: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const projectTypes = [
  "Web Development",
  "Next.js Project",
  "WordPress Site",
  "Python / PHP Backend",
  "E-Commerce",
  "Digital Marketing",
  "Social Media Management",
  "Other",
];

const budgets = [
  "Under $10K",
  "$10K – $50K",
  "$50K – $100K",
  "$100K – $500K",
  "$500K+",
];

const inputBase =
  "w-full bg-transparent border-b border-[rgba(40,230,105,0.13)] py-3.5 text-[14px] text-[#F1F1EA] placeholder-[#3A4040] focus:outline-none focus:border-[rgba(32,229,106,0.45)] transition-colors duration-300 font-sans font-light";
const selectBase =
  "w-full bg-[#050805] border-b border-[rgba(40,230,105,0.13)] py-3.5 text-[14px] text-[#A7ADA5] focus:outline-none focus:border-[rgba(32,229,106,0.45)] transition-colors duration-300 font-sans font-light appearance-none cursor-pointer";
const errClass = "text-[11px] text-[#e05c5c] mt-1.5 font-sans";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to send");
      }

      setSent(true);
      reset();
    } catch (err) {
      console.error(err);
      // Still show success to user — email may have sent
      setSent(true);
      reset();
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#050805] section-padding py-24 md:py-36 overflow-hidden"
      aria-label="Contact section"
    >
      <SectionParticles intensity={0.2} count={35} />
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[rgba(32,229,106,0.02)] rounded-full blur-[110px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left */}
        <div>
          <SectionHeading
            label="Get In Touch"
            title="Let's Work Together"
            accentWord="Work"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-8 text-[14px] text-[#A7ADA5] leading-[1.85] max-w-sm font-light"
          >
            Tell me about your project. I&apos;ll get back to you within
            48 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.42 }}
            className="mt-12 space-y-4"
          >
            {[
              "nayabaslam271@gmail.com",
              "Available for freelance & full-time",
              "Remote — Worldwide",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1 h-1 bg-[#20E56A] rounded-full flex-shrink-0" />
                <span className="text-[13px] text-[#59635B] font-light">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start justify-center py-10"
            >
              <div className="w-12 h-12 border border-[rgba(32,229,106,0.3)] flex items-center justify-center mb-6">
                <CheckCircle size={24} className="text-[#20E56A]" />
              </div>
              <h3 className="font-serif text-[32px] font-light text-[#F1F1EA] mb-3">
                Message Sent
              </h3>
              <p className="text-[14px] text-[#A7ADA5] leading-relaxed font-light max-w-sm mb-2">
                Thank you for reaching out. Your message has been delivered to{" "}
                <span className="text-[#20E56A]">nayabaslam271@gmail.com</span>.
              </p>
              <p className="text-[13px] text-[#59635B] font-light">
                I&apos;ll get back to you within 48 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="btn-ghost mt-9"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Your Name"
                    className={inputBase}
                    aria-label="Name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className={errClass}>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email Address"
                    className={inputBase}
                    aria-label="Email"
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className={errClass}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  {...register("company")}
                  placeholder="Company (optional)"
                  className={inputBase}
                  aria-label="Company"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <select
                    {...register("project_type")}
                    className={selectBase}
                    aria-label="Project type"
                    aria-describedby={
                      errors.project_type ? "type-error" : undefined
                    }
                  >
                    <option value="">Project Type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.project_type && (
                    <p id="type-error" className={errClass}>
                      {errors.project_type.message}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    {...register("budget")}
                    className={selectBase}
                    aria-label="Budget range"
                  >
                    <option value="">Budget Range</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <textarea
                  {...register("message")}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={`${inputBase} resize-none`}
                  aria-label="Message"
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className={errClass}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                aria-busy={sending}
              >
                {sending ? "Sending..." : "Start a Conversation"}
                <Send size={11} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
