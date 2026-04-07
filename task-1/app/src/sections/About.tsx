"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Zap, Globe } from "lucide-react";
import { AnimatedHeading } from "@/components/text/SplitText";
import { useCursorContext } from "@/hooks/useCursorContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * About Section
 * 
 * Features:
 * - Animated timeline reveal on scroll
 * - Staggered content animations
 * - Feature cards with hover effects
 * - Parallax image/text elements
 * - GSAP ScrollTrigger integration
 */

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code with modern best practices and patterns.",
  },
  {
    icon: Palette,
    title: "Pixel Perfect",
    description: "Meticulous attention to detail ensuring every pixel is in its place.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing for speed and efficiency without compromising on quality.",
  },
  {
    icon: Globe,
    title: "Responsive",
    description: "Creating seamless experiences across all devices and screen sizes.",
  },
];

const stats = [
  { value: "0+", label: "Years Experience" },
  { value: "4", label: "Projects Completed" },
  { value: "100%", label: "Satisfaction" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { onMouseEnter, onMouseLeave } = useCursorContext();

  // Scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // In view detection for animations
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full"
        style={{
          y: y1,
          background: "radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="section-container max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={contentRef} className="mb-20">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-neon-cyan font-mono text-sm">01.</span>
            <div className="h-[1px] w-12 bg-neon-cyan/30" />
            <span className="text-white/40 text-sm uppercase tracking-wider">About Me</span>
          </motion.div>

          <AnimatedHeading
            level={2}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8"
            staggerDelay={0.02}
          >
            Passionate about creating digital experiences
          </AnimatedHeading>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg text-white/60 leading-relaxed">
              I&apos;m a full-stack developer with a passion for creating beautiful, 
              functional, and user-centered digital experiences. With over 5 years 
              of experience in the industry, I&apos;ve worked with startups and 
              established companies alike.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              My approach combines technical expertise with creative problem-solving. 
              I believe that great software is not just about code—it&apos;s about 
              understanding users, solving real problems, and delivering experiences 
              that delight.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onMouseEnter={() => onMouseEnter("card")}
              onMouseLeave={onMouseLeave}
            >
              <motion.span
                className="block text-4xl md:text-5xl font-display font-bold gradient-text mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.span>
              <span className="text-sm text-white/50">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative glass-card rounded-2xl p-6 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => onMouseEnter("card")}
              onMouseLeave={onMouseLeave}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10" />
              </div>

              {/* Icon */}
              <motion.div
                className="relative w-12 h-12 mb-4 rounded-xl bg-neon-cyan/10 flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <feature.icon className="w-6 h-6 text-neon-cyan" />
              </motion.div>

              {/* Content */}
              <h3 className="relative text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="relative text-sm text-white/50 leading-relaxed">
                {feature.description}
              </p>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-neon-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Timeline Section */}
        <div ref={timelineRef} className="mt-32">
          <motion.div
            className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0, x: -30 }}
            animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-neon-purple font-mono text-sm">02.</span>
            <div className="h-[1px] w-12 bg-neon-purple/30" />
            <span className="text-white/40 text-sm uppercase tracking-wider">My Journey</span>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent"
              initial={{ scaleY: 0 }}
              animate={isTimelineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ originY: 0 }}
            />

            {/* Timeline items */}
            {[
  {
    year: "2021 - 2023",
    title: "12th Science",
    company: "Higher Secondary Education",
    description:
      "Completed 12th Science, building a strong academic foundation in mathematics, logical thinking, and analytical problem solving that later supported my journey into software development.",
    side: "left",
  },
  {
    year: "2023 - 2027",
    title: "B.Tech in Information Technology",
    company: "GCET",
    description:
      "Currently pursuing Computer Engineering at GCET, focusing on full stack development, backend learning, project building, problem solving, and strengthening practical software engineering skills.",
    side: "right",
  },
  {
    year: "2025",
    title: "Frontend Developer Intern",
    company: "Brainbeemly",
    description:
      "Completed a 1-month internship at Brainbeemly where I worked on frontend development tasks, improved UI components, and gained hands-on experience with practical project workflows and modern web development practices.",
    side: "left",
  },
].map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-start gap-8 mb-12 ${
                  item.side === "right" ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-cyan border-4 border-background"
                  initial={{ scale: 0 }}
                  animate={isTimelineInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.2, type: "spring" }}
                />

                {/* Content */}
                <div className={`ml-8 md:ml-0 md:w-[45%] ${item.side === "right" ? "md:text-right" : ""}`}>
                  <motion.span
                    className="inline-block px-3 py-1 mb-2 text-sm font-mono text-neon-cyan bg-neon-cyan/10 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.year}
                  </motion.span>
                  <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-neon-purple text-sm mb-2">{item.company}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
