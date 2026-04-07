"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { MagneticButton } from "@/components/buttons/MagneticButton";
import { SplitText } from "@/components/text/SplitText";
import { useCursorContext } from "@/hooks/useCursorContext";

/**
 * Hero Section
 * 
 * Features:
 * - Large animated headline with character split animation
 * - 3D parallax background elements
 * - Mouse-responsive floating elements
 * - Animated call-to-action buttons
 * - Social links with magnetic effect
 * - Scroll indicator
 */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { onMouseEnter, onMouseLeave } = useCursorContext();

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Spring physics for smoother parallax
  const ySpring = useSpring(y, { stiffness: 100, damping: 30 });
  const scaleSpring = useSpring(scale, { stiffness: 100, damping: 30 });

  // Mouse position for 3D tilt effect
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize mouse position (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      mouseX.set(x * 10);
      mouseY.set(y * 10);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background elements
      gsap.fromTo(
        ".hero-bg-element",
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.5, 
          stagger: 0.2,
          ease: "expo.out",
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background Elements */}
      <motion.div 
        className="absolute inset-0 perspective-1000"
        style={{ y: ySpring, opacity }}
      >
        {/* Floating geometric shapes */}
        <motion.div
          className="hero-bg-element absolute top-20 left-[10%] w-32 h-32 border border-neon-cyan/20 rounded-lg"
          style={{
            rotateX: mouseY,
            rotateY: mouseX,
            transformStyle: "preserve-3d",
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="hero-bg-element absolute top-40 right-[15%] w-24 h-24 border border-neon-purple/20 rounded-full"
          style={{
            rotateX: useTransform(mouseY, (v) => -v),
            rotateY: useTransform(mouseX, (v) => -v),
          }}
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="hero-bg-element absolute bottom-32 left-[20%] w-16 h-16 bg-neon-cyan/10 rotate-45"
          style={{
            rotateX: mouseY,
            rotateY: mouseX,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [45, 50, 45],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.div
          className="hero-bg-element absolute bottom-20 right-[25%] w-20 h-20 border-2 border-neon-pink/20"
          style={{
            rotateX: useTransform(mouseY, (v) => -v * 1.5),
            rotateY: useTransform(mouseX, (v) => -v * 1.5),
          }}
          animate={{
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Gradient rings */}
        <motion.div
          className="hero-bg-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="hero-bg-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.02]"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 section-container max-w-7xl mx-auto text-center"
        style={{ scale: scaleSpring }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass-card rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => onMouseEnter("hover")}
          onMouseLeave={onMouseLeave}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm text-white/70">Available for projects</span>
        </motion.div>

        {/* Main Headline */}
        <div className="mb-6">
          <SplitText
            as="h1"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-white leading-[0.9] tracking-tight"
            splitType="chars"
            staggerDelay={0.03}
            initialDelay={0.4}
            yOffset={80}
          >
            Creative
          </SplitText>
        </div>

        <div className="mb-8">
          <SplitText
            as="h1"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.9] tracking-tight"
            splitType="chars"
            staggerDelay={0.03}
            initialDelay={0.6}
            yOffset={80}
            highlightWords={["Developer"]}
            highlightClassName="gradient-text"
          >
            Developer
          </SplitText>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Crafting digital experiences with code and creativity.
          <br />
          Specializing in React, TypeScript & modern web technologies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <MagneticButton
            variant="neon"
            size="lg"
            href="#projects"
            icon={<ArrowDown className="w-5 h-5" />}
          >
            View My Work
          </MagneticButton>
          
          <MagneticButton
            variant="secondary"
            size="lg"
            href="#contact"
          >
            Get In Touch
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {[
            { icon: Github, href: "https://github.com/Pushpraj5732", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/pushpraj-chavda-a0a7b4321?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
            
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-xl glass-card text-white/60 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => onMouseEnter("hover")}
              onMouseLeave={onMouseLeave}
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-neon-cyan"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
