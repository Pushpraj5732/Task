"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * Cursor Context for managing global cursor state
 * 
 * Provides:
 * - Cursor variant switching (default, hover, text, button, card, image)
 * - Custom cursor text
 * - Custom cursor color
 * - Functions to set cursor state
 */

export type CursorVariant = "default" | "hover" | "text" | "button" | "card" | "image";

interface CursorContextType {
  cursorVariant: CursorVariant;
  cursorText: string;
  cursorColor: string;
  setCursorVariant: (variant: CursorVariant) => void;
  setCursorText: (text: string) => void;
  setCursorColor: (color: string) => void;
  // Convenience handlers
  onMouseEnter: (variant?: CursorVariant, text?: string) => void;
  onMouseLeave: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [cursorText, setCursorText] = useState<string>("");
  const [cursorColor, setCursorColor] = useState<string>("");

  // Convenience handler for mouse enter
  const onMouseEnter = useCallback((variant: CursorVariant = "hover", text: string = "") => {
    setCursorVariant(variant);
    if (text) setCursorText(text);
  }, []);

  // Convenience handler for mouse leave
  const onMouseLeave = useCallback(() => {
    setCursorVariant("default");
    setCursorText("");
    setCursorColor("");
  }, []);

  return (
    <CursorContext.Provider
      value={{
        cursorVariant,
        cursorText,
        cursorColor,
        setCursorVariant,
        setCursorText,
        setCursorColor,
        onMouseEnter,
        onMouseLeave,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

// Custom hook to use cursor context
export function useCursorContext() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursorContext must be used within a CursorProvider");
  }
  return context;
}

// HOC to add cursor hover effects to components
export function withCursorHover<T extends object>(
  Component: React.ComponentType<T>,
  variant: CursorVariant = "hover",
  text: string = ""
) {
  return function WithCursorHoverWrapper(props: T) {
    const { onMouseEnter, onMouseLeave } = useCursorContext();

    return (
      <div
        onMouseEnter={() => onMouseEnter(variant, text)}
        onMouseLeave={onMouseLeave}
      >
        <Component {...props} />
      </div>
    );
  };
}
