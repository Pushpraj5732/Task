"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useCursorContext } from "@/hooks/useCursorContext";
import { cn } from "@/lib/utils";

/**
 * Magnetic Button Component
 * 
 * Features:
 * - Button slightly follows cursor on hover with elastic physics
 * - Smooth, premium feel with spring animations
 * - Integrated with custom cursor system
 * - Glow effects and glassmorphism styling
 * - Multiple variants (primary, secondary, ghost)
 */

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "neon";
  size?: "sm" | "md" | "lg";
  magneticStrength?: number;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  magneticStrength = 0.3,
  onClick,
  href,
  disabled = false,
  icon,
  iconPosition = "right",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { onMouseEnter, onMouseLeave } = useCursorContext();

  // Motion values for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for elastic movement
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Transform for inner content (opposite direction for depth)
  const contentX = useTransform(xSpring, (val) => -val * 0.2);
  const contentY = useTransform(ySpring, (val) => -val * 0.2);

  // Handle mouse move for magnetic effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Apply magnetic strength
    x.set(distanceX * magneticStrength);
    y.set(distanceY * magneticStrength);
  };

  // Reset position on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    onMouseLeave();
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter("button");
  };

  // Variant styles
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20
      border border-neon-cyan/50
      text-white
      hover:border-neon-cyan
      hover:shadow-glow
      backdrop-blur-md
    `,
    secondary: `
      bg-white/5
      border border-white/20
      text-white
      hover:bg-white/10
      hover:border-white/40
      backdrop-blur-md
    `,
    ghost: `
      bg-transparent
      border border-transparent
      text-white/80
      hover:text-white
      hover:bg-white/5
    `,
    neon: `
      bg-neon-cyan/10
      border-2 border-neon-cyan
      text-neon-cyan
      hover:bg-neon-cyan/20
      hover:shadow-glow-lg
      backdrop-blur-md
    `,
  };

  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-3",
    lg: "px-8 py-4 text-lg gap-4",
  };

  // Base classes
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium rounded-xl
    transition-all duration-300
    overflow-hidden
    group
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Combine classes
  const classes = cn(
    baseClasses,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  // Button content with inner animations
  const content = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      style={{ x: contentX, y: contentY }}
    >
      {icon && iconPosition === "left" && (
        <motion.span
          className="inline-flex"
          animate={{ x: isHovered ? -2 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <motion.span
          className="inline-flex"
          animate={{ x: isHovered ? 2 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.span>
  );

  // Background glow effect
  const glowEffect = (
    <motion.div
      className="absolute inset-0 rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 255, 255, 0.15), transparent 50%)",
      }}
    />
  );

  // Shimmer effect
  const shimmerEffect = (
    <motion.div
      className="absolute inset-0 -translate-x-full"
      animate={{ translateX: isHovered ? "200%" : "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
      }}
    />
  );

  // Render as link or button
  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        style={{ x: xSpring, y: ySpring }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
      >
        {glowEffect}
        {shimmerEffect}
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={classes}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
    >
      {glowEffect}
      {shimmerEffect}
      {content}
    </motion.button>
  );
}

/**
 * Magnetic Wrapper Component
 * 
 * Wraps any element with magnetic hover effect
 */
interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
}

export function MagneticWrapper({
  children,
  className,
  magneticStrength = 0.2,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * magneticStrength);
    y.set(distanceY * magneticStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
