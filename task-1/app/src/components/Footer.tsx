"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from "lucide-react";
import { useCursorContext } from "@/hooks/useCursorContext";

/**
 * Footer Component
 * 
 * Features:
 * - Social links with hover effects
 * - Back to top button
 * - Animated copyright
 * - Glassmorphism styling
 */

export function Footer() {
  const { onMouseEnter, onMouseLeave } = useCursorContext();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-12 overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="section-container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-display font-bold text-white inline-block mb-2"
              onMouseEnter={() => onMouseEnter("hover")}
              onMouseLeave={onMouseLeave}
            >
              <span className="gradient-text">Dev</span>.
            </a>
            <p className="text-sm text-white/40">
              Crafting digital experiences with passion.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Mail, href: "mailto:hello@developer.com", label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/60 hover:bg-neon-cyan/10 hover:text-neon-cyan transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => onMouseEnter("hover")}
                onMouseLeave={onMouseLeave}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/60 hover:bg-neon-cyan/10 hover:text-neon-cyan transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => onMouseEnter("button")}
            onMouseLeave={onMouseLeave}
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm text-white/40">
            &copy; {currentYear} Developer. All rights reserved.
          </p>
          
          <p className="text-sm text-white/40 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400 animate-pulse" /> using React & Next.js
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
