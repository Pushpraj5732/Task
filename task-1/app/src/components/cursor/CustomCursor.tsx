"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useCursorContext } from "@/hooks/useCursorContext";

/**
 * Custom Animated Cursor Component
 * 
 * Features:
 * - Smooth cursor following with spring physics
 * - Scales and morphs when hovering interactive elements
 * - Blends with background using mix-blend-mode
 * - Hidden on mobile/touch devices
 * - Premium feel with elastic transitions
 */

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Get cursor state from context
  const { cursorVariant, cursorText, cursorColor } = useCursorContext();

  // Motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for elastic, premium feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();

    // Mouse move handler with smooth tracking
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Mouse enter handler
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    if (!isTouchDevice) {
      window.addEventListener("mousemove", moveCursor);
      document.body.addEventListener("mouseleave", handleMouseLeave);
      document.body.addEventListener("mouseenter", handleMouseEnter);
      
      // Add class to body for cursor styling
      document.body.classList.add("custom-cursor-active");
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  // Cursor variant configurations
  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "rgba(0, 255, 255, 0.8)",
      mixBlendMode: "difference" as const,
      borderRadius: "50%",
      border: "none",
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(0, 255, 255, 0.15)",
      mixBlendMode: "normal" as const,
      borderRadius: "50%",
      border: "1px solid rgba(0, 255, 255, 0.5)",
    },
    text: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(180, 0, 255, 0.15)",
      mixBlendMode: "normal" as const,
      borderRadius: "50%",
      border: "1px solid rgba(180, 0, 255, 0.5)",
    },
    button: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(0, 255, 255, 0.2)",
      mixBlendMode: "normal" as const,
      borderRadius: "50%",
      border: "2px solid rgba(0, 255, 255, 0.6)",
    },
    card: {
      width: 120,
      height: 120,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      mixBlendMode: "normal" as const,
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    image: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(0, 255, 255, 0.1)",
      mixBlendMode: "normal" as const,
      borderRadius: "50%",
      border: "2px solid rgba(0, 255, 255, 0.4)",
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor dot */}
          <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              ...variants[cursorVariant],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              mass: 0.5,
            }}
          >
            {/* Inner dot for default state */}
            {cursorVariant === "default" && (
              <motion.div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: cursorColor || "rgba(0, 255, 255, 0.8)" }}
                layoutId="cursor-inner"
              />
            )}
            
            {/* Text label for text variant */}
            {cursorVariant === "text" && (
              <motion.span
                className="text-xs font-medium text-white uppercase tracking-wider"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                {cursorText || "View"}
              </motion.span>
            )}

            {/* Image label for image variant */}
            {cursorVariant === "image" && (
              <motion.span
                className="text-xs font-medium text-neon-cyan uppercase tracking-wider"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                View
              </motion.span>
            )}
          </motion.div>

          {/* Trailing cursor ring for premium effect */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{
              x: useSpring(cursorX, { damping: 30, stiffness: 200, mass: 0.8 }),
              y: useSpring(cursorY, { damping: 30, stiffness: 200, mass: 0.8 }),
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              width: cursorVariant === "default" ? 32 : 0,
              height: cursorVariant === "default" ? 32 : 0,
              opacity: cursorVariant === "default" ? 0.3 : 0,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
            }}
          >
            <div className="w-full h-full rounded-full border border-neon-cyan/30" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
