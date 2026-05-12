"use client";

import { motion } from "framer-motion";
import { useState, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import MagneticButton from "./MagneticButton";
import { personalInfo } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Contact section featuring mandatory requirements:
 * - Sequenced cascading inputs triggered strictly at 60% visibility threshold
 * - GSAP hardware accelerated title entries leveraging useScrollAnimation
 * - Direct composing web integration endpoints for Gmail and Outlook
 */
export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // GSAP custom hook triggering title entry
  // Trigger constraint: starts reveal cascade when top crosses 85% depth
  const headerRef = useScrollAnimation<HTMLDivElement>({
    type: "from",
    animationProps: {
      opacity: 0,
      y: 40,
      duration: 0.8,
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );
      setStatus("sent");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const socials = [
    { label: "GitHub", href: personalInfo.github, icon: "GH" },
    { label: "LinkedIn", href: personalInfo.linkedin, icon: "LI" },
    {
      label: "Gmail",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`,
      icon: "✉",
    },
    {
      label: "Outlook",
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${personalInfo.email}`,
      icon: "✉",
    },
  ];

  // Cascading Sequential Animation definitions triggered strictly at 60% section visibility
  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Sequential cascading delay
      },
    },
  };

  const fieldItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="contact" className="section-padding relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef} className="will-change-transform mb-12">
          <p className="text-accent-purple text-sm font-mono tracking-widest uppercase mb-4">
            Contact
          </p>
          <h2 className="text-section font-bold mb-6">
            Let&apos;s build something{" "}
            <span className="gradient-text-cyan">together</span>.
          </h2>
          <p className="text-text-secondary text-lg max-w-xl">
            Open to full-stack developer internship opportunities. I can
            contribute to React UI, backend APIs, AI integrations, and
            cloud-ready deployment workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* ── Sequenced Cascading Input Fields Form triggered at 60% view threshold ── */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
            variants={formContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }} // Mandatory requirement: 60% visibility trigger threshold
          >
            <motion.div variants={fieldItemVariants}>
              <FormField name="user_name" label="Name" type="text" required />
            </motion.div>
            <motion.div variants={fieldItemVariants}>
              <FormField name="user_email" label="Email" type="email" required />
            </motion.div>
            <motion.div variants={fieldItemVariants}>
              <FormField name="message" label="Message" type="textarea" required />
            </motion.div>

            <motion.div variants={fieldItemVariants}>
              <MagneticButton
                type="submit"
                className={`w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all focus-ring ${
                  status === "sending"
                    ? "bg-accent-cyan/30 text-accent-cyan cursor-wait"
                    : status === "sent"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : status === "error"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-accent-cyan text-bg hover:shadow-glow-lg"
                }`}
                onClick={undefined}
              >
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message Sent ✓"}
                {status === "error" && "Failed — Try Again"}
              </MagneticButton>
            </motion.div>
          </motion.form>

          {/* ── Info + Direct Composing web portals ── */}
          <motion.div
            className="flex flex-col justify-between"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                  Email
                </p>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary hover:text-accent-cyan transition-colors text-lg inline-flex items-center gap-2"
                >
                  <span>{personalInfo.email}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">Gmail</span>
                </a>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                  Phone
                </p>
                <p className="text-text-primary text-lg">{personalInfo.phone}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
                  Location
                </p>
                <p className="text-text-primary text-lg">
                  {personalInfo.location}
                </p>
              </div>
            </div>

            {/* Social link layouts */}
            <div className="flex gap-4 mt-10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-card border border-white/5 hover:border-accent-cyan/30 transition-all"
                  aria-label={s.label}
                >
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {s.label}
                  </span>
                  <span className="block w-0 group-hover:w-4 h-px bg-accent-cyan transition-all duration-300 overflow-hidden" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  name,
  label,
  type,
  required,
}: {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const inputClasses = `
    w-full bg-bg-card rounded-xl px-4 pt-6 pb-2 text-text-primary text-sm
    border transition-all duration-300 outline-none focus-ring
    ${
      isFocused
        ? "border-accent-cyan/40 shadow-glow"
        : "border-white/5 hover:border-white/10"
    }
  `;

  const labelClasses = `
    absolute left-4 transition-all duration-200 pointer-events-none
    ${
      isFocused || hasValue
        ? "top-2 text-[10px] tracking-wider uppercase"
        : "top-4 text-sm"
    }
    ${isFocused ? "text-accent-cyan" : "text-text-muted"}
  `;

  const sharedProps = {
    name,
    required,
    className: inputClasses,
    onFocus: () => setIsFocused(true),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
    },
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <label className={labelClasses} htmlFor={name}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea {...sharedProps} id={name} rows={4} className={`${inputClasses} resize-none`} />
      ) : (
        <input {...sharedProps} id={name} type={type} />
      )}
    </motion.div>
  );
}
