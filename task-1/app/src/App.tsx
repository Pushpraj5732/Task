"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CursorProvider } from "@/hooks/useCursorContext";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { GradientOrbs, ParticleBackground } from "@/components/background/ParticleBackground";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";

/**
 * Main App Component
 * 
 * Features:
 * - Loading screen with progress animation
 * - Custom cursor with context provider
 * - Lenis smooth scrolling
 * - Page transition animations
 * - Background effects (particles, gradient orbs)
 * - All sections integrated
 */

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize smooth scrolling
  useSmoothScroll();

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Preload images and resources
  useEffect(() => {
    const preloadResources = async () => {
      // Preload critical images
      const images = [
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      ];

      const preloadPromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(preloadPromises);
      } catch (error) {
        console.warn("Some images failed to preload");
      }
    };

    preloadResources();
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />

      {/* Main Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="relative min-h-screen bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Custom Cursor */}
            <CustomCursor />

            {/* Background Effects */}
            <GradientOrbs />
            <ParticleBackground particleCount={60} />

            {/* Noise Overlay */}
            <div className="noise-overlay" />

            {/* Navigation */}
            <Navigation />

            {/* Main Content */}
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <CursorProvider>
      <AppContent />
    </CursorProvider>
  );
}

export default App;
