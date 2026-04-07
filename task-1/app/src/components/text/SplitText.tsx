"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Split Text Animation Component
 * 
 * Features:
 * - Splits text into characters or words
 * - Animates each piece with staggered timing
 * - Upward fade-in with spring physics
 * - Configurable delay, stagger, and easing
 * - Triggers on scroll into view
 */

type SplitType = "chars" | "words" | "lines";

interface SplitTextProps {
  children: string;
  className?: string;
  splitType?: SplitType;
  staggerDelay?: number;
  initialDelay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
  threshold?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  highlightWords?: string[];
  highlightClassName?: string;
}

export function SplitText({
  children,
  className,
  splitType = "chars",
  staggerDelay = 0.03,
  initialDelay = 0,
  duration = 0.5,
  yOffset = 40,
  once = true,
  threshold = 0.2,
  as: Component = "div",
  highlightWords = [],
  highlightClassName = "gradient-text",
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Split text based on type
  const getElements = () => {
    switch (splitType) {
      case "chars":
        return children.split("");
      case "words":
        return children.split(" ");
      case "lines":
        return children.split("\n");
      default:
        return children.split("");
    }
  };

  const elements = getElements();

  // Check if element should be highlighted
  const shouldHighlight = (element: string) => {
    return highlightWords.some(
      (word) => element.toLowerCase().includes(word.toLowerCase())
    );
  };

  // Animation variants for container
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  // Animation variants for each element
  const elementVariants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.19, 1, 0.22, 1], // expo-out easing
      },
    },
  };

  // Render with proper spacing
  const renderElement = (element: string, index: number) => {
    const isHighlighted = shouldHighlight(element);
    const isSpace = element === " ";
    const isNewline = element === "\n";

    if (isSpace) {
      return <span key={`space-${index}`}>&nbsp;</span>;
    }

    if (isNewline) {
      return <br key={`br-${index}`} />;
    }

    return (
      <motion.span
        key={`${splitType}-${index}`}
        className={cn(
          "inline-block",
          isHighlighted && highlightClassName
        )}
        variants={elementVariants}
        style={{
          transformOrigin: "center bottom",
          willChange: "transform, opacity",
        }}
      >
        {element}
        {splitType === "words" && index < elements.length - 1 && (
          <span>&nbsp;</span>
        )}
      </motion.span>
    );
  };

  return (
    <Component
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLDivElement & HTMLSpanElement>}
      className={cn("overflow-hidden", className)}
    >
      <motion.span
        className="inline-block"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ perspective: "1000px" }}
      >
        {elements.map((element, index) => renderElement(element, index))}
      </motion.span>
    </Component>
  );
}

/**
 * Animated Heading Component
 * 
 * Pre-configured SplitText for headings with larger animations
 */
interface AnimatedHeadingProps extends Omit<SplitTextProps, "as"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function AnimatedHeading({
  level = 1,
  yOffset = 60,
  duration = 0.7,
  staggerDelay = 0.02,
  ...props
}: AnimatedHeadingProps) {
  const headingMap = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  } as const;

  return (
    <SplitText
      as={headingMap[level]}
      yOffset={yOffset}
      duration={duration}
      staggerDelay={staggerDelay}
      {...props}
    />
  );
}

/**
 * Typewriter Text Component
 * 
 * Text that appears character by character like typing
 */
interface TypewriterTextProps {
  children: string;
  className?: string;
  speed?: number;
  initialDelay?: number;
  once?: boolean;
  showCursor?: boolean;
  cursorClassName?: string;
}

export function TypewriterText({
  children,
  className,
  speed = 50,
  initialDelay = 0,
  once = true,
  showCursor = true,
  cursorClassName = "text-neon-cyan",
}: TypewriterTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const characters = children.split("");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: speed / 1000,
        delayChildren: initialDelay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <span ref={ref} className={cn("inline-flex items-center", className)}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
      {showCursor && (
        <motion.span
          className={cn("inline-block w-[2px] h-[1em] ml-1", cursorClassName)}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </span>
  );
}

/**
 * Reveal Text Component
 * 
 * Text that reveals with a sliding mask effect
 */
interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
}

export function RevealText({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = "up",
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const directionMap = {
    up: { y: "100%", x: 0 },
    down: { y: "-100%", x: 0 },
    left: { x: "100%", y: 0 },
    right: { x: "-100%", y: 0 },
  };

  return (
    <span ref={ref} className={cn("relative inline-block overflow-hidden", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: 0, x: 0 }}
        animate={isInView ? { y: 0, x: 0 } : directionMap[direction]}
        transition={{
          duration,
          delay,
          ease: [0.19, 1, 0.22, 1],
        }}
        style={{
          transform: isInView ? "none" : undefined,
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 bg-neon-cyan"
        initial={{ scaleX: 1, scaleY: 1 }}
        animate={isInView ? { scaleX: 0, scaleY: 0 } : { scaleX: 1, scaleY: 1 }}
        transition={{
          duration: duration * 0.6,
          delay: delay + duration * 0.4,
          ease: [0.19, 1, 0.22, 1],
        }}
        style={{
          transformOrigin: direction === "left" || direction === "up" ? "right" : "left",
        }}
      />
    </span>
  );
}
