"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Phone, ArrowUpRight, CheckCircle, Loader2 } from "lucide-react";
import { MagneticButton } from "@/components/buttons/MagneticButton";
import { AnimatedHeading } from "@/components/text/SplitText";
import { useCursorContext } from "@/hooks/useCursorContext";

/**
 * Contact Section
 * 
 * Features:
 * - Animated form with floating labels
 * - Input focus animations
 * - Submit button with loading state
 * - Success/error message animations
 * - Contact info cards with hover effects
 */

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { onMouseEnter, onMouseLeave } = useCursorContext();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="section-container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-neon-purple font-mono text-sm">06.</span>
            <div className="h-[1px] w-12 bg-neon-purple/30" />
            <span className="text-white/40 text-sm uppercase tracking-wider">Contact</span>
            <div className="h-[1px] w-12 bg-neon-purple/30" />
          </motion.div>

          <AnimatedHeading
            level={2}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
          >
            Let&apos;s Work Together
          </AnimatedHeading>

          <motion.p
            className="text-lg text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Have a project in mind? I&apos;d love to hear about it. 
            Send me a message and let&apos;s create something amazing together.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>

            {[
              {
                icon: Mail,
                label: "Email",
                value: "pdchavda0905@gmail.com",
                href: "mailto:hello@developer.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91 9313285144",
              
              },
              {
                icon: MapPin,
                label: "Location",
                value: "V v Nagar,Anand",
                href: "#",
              },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 p-4 glass-card rounded-xl group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 5 }}
                onMouseEnter={() => onMouseEnter("hover")}
                onMouseLeave={onMouseLeave}
              >
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-colors">
                  <item.icon className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <p className="text-sm text-white/50">{item.label}</p>
                  <p className="text-white group-hover:text-neon-cyan transition-colors">
                    {item.value}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/30 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}

            {/* Availability Status */}
            <motion.div
              className="p-6 glass-card rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span
                  className="w-3 h-3 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white font-medium">Available for work</span>
              </div>
              <p className="text-sm text-white/50">
                I&apos;m currently taking on new projects. 
                Response time: within 24 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="relative">
                  <motion.label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === "name" || formData.name
                        ? "top-2 text-xs text-neon-cyan"
                        : "top-1/2 -translate-y-1/2 text-white/50"
                    }`}
                  >
                    Your Name
                  </motion.label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pt-6 pb-3 px-4 bg-white/5 border rounded-xl text-white outline-none transition-all duration-300 ${
                      errors.name
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-neon-cyan/50 focus:bg-white/[0.07]"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.span
                        className="absolute -bottom-6 left-0 text-xs text-red-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <motion.label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === "email" || formData.email
                        ? "top-2 text-xs text-neon-cyan"
                        : "top-1/2 -translate-y-1/2 text-white/50"
                    }`}
                  >
                    Your Email
                  </motion.label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pt-6 pb-3 px-4 bg-white/5 border rounded-xl text-white outline-none transition-all duration-300 ${
                      errors.email
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-neon-cyan/50 focus:bg-white/[0.07]"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.span
                        className="absolute -bottom-6 left-0 text-xs text-red-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Subject Field */}
              <div className="relative">
                <motion.label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === "subject" || formData.subject
                      ? "top-2 text-xs text-neon-cyan"
                      : "top-1/2 -translate-y-1/2 text-white/50"
                  }`}
                >
                  Subject
                </motion.label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pt-6 pb-3 px-4 bg-white/5 border rounded-xl text-white outline-none transition-all duration-300 ${
                    errors.subject
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-white/10 focus:border-neon-cyan/50 focus:bg-white/[0.07]"
                  }`}
                />
                <AnimatePresence>
                  {errors.subject && (
                    <motion.span
                      className="absolute -bottom-6 left-0 text-xs text-red-400"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {errors.subject}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === "message" || formData.message
                      ? "top-2 text-xs text-neon-cyan"
                      : "top-4 text-white/50"
                  }`}
                >
                  Your Message
                </motion.label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className={`w-full pt-6 pb-3 px-4 bg-white/5 border rounded-xl text-white outline-none transition-all duration-300 resize-none ${
                    errors.message
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-white/10 focus:border-neon-cyan/50 focus:bg-white/[0.07]"
                  }`}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.span
                      className="absolute -bottom-6 left-0 text-xs text-red-400"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {errors.message}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      className="flex items-center justify-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <MagneticButton
                        variant="neon"
                        size="lg"
                        className="w-full"
                        magneticStrength={0.1}
                        icon={isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </MagneticButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
