"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCursorContext } from "@/hooks/useCursorContext";

/**
 * Navigation Component
 * 
 * Features:
 * - Fixed header with scroll-based visibility
 * - Smooth scroll to sections
 * - Mobile hamburger menu
 * - Active section highlighting
 * - Glassmorphism background
 */

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { onMouseEnter, onMouseLeave } = useCursorContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-4" : "py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="section-container max-w-7xl mx-auto">
          <nav
            className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
              isScrolled
                ? "glass-card"
                : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <motion.a
              href="#hero"
              className="text-xl font-display font-bold text-white"
              onClick={(e) => handleLinkClick(e, "#hero")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => onMouseEnter("hover")}
              onMouseLeave={onMouseLeave}
            >
              <span className="gradient-text">Dev</span>.
            </motion.a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-neon-cyan" : "text-white/60 hover:text-white"
                      }`}
                      onMouseEnter={() => onMouseEnter("hover")}
                      onMouseLeave={onMouseLeave}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-cyan"
                          layoutId="navIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full text-sm font-medium text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => onMouseEnter("button")}
              onMouseLeave={onMouseLeave}
            >
              Hire Me
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              className="absolute top-24 left-4 right-4 glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ul className="space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                          isActive
                            ? "bg-neon-cyan/10 text-neon-cyan"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="mt-4 block w-full py-3 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl text-center font-medium text-neon-cyan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hire Me
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
