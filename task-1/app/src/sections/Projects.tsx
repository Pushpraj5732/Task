"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { AnimatedHeading } from "@/components/text/SplitText";
import { useCursorContext } from "@/hooks/useCursorContext";

/**
 * Projects Section
 * 
 * Features:
 * - Hover-driven project cards with motion depth
 * - 3D tilt effect on hover
 * - Image reveal with parallax
 * - Tags with animated entrance
 * - Smooth transitions between states
 */

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "CiviFix - Civic Issue Reporting Platform",
    description:
      "Developed a civic issue reporting platform where users can report public problems such as potholes, garbage collection issues, drainage faults, and streetlight failures. Implemented issue submission, tracking workflows, and a user-friendly interface to improve communication between citizens and local authorities.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "REST API"],
    githubUrl: "https://github.com/Pushpraj5732/civicfix",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: 2,
    title: "Hospital Management System",
    description:
      "Built a hospital management system to handle patient records, doctor information, appointment scheduling, and administrative operations. Designed to simplify healthcare workflows with structured data management, responsive UI components, and an organized dashboard experience.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    tags: ["React", "JavaScript", "Node.js", "MongoDB", "Bootstrap"],
    githubUrl: "https://github.com/Sneh5824/CVMU-HACKATHON",
    liveUrl: "https://example.com",
    featured: true,
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { onMouseEnter, onMouseLeave } = useCursorContext();

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="section-container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-neon-purple font-mono text-sm">04.</span>
            <div className="h-[1px] w-12 bg-neon-purple/30" />
            <span className="text-white/40 text-sm uppercase tracking-wider">Projects</span>
          </motion.div>

          <AnimatedHeading
            level={2}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
          >
            Featured Work
          </AnimatedHeading>

          <motion.p
            className="text-lg text-white/60 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A selection of projects that showcase my skills and passion for creating 
            exceptional digital experiences.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredProject === project.id}
              onHover={() => setHoveredProject(project.id)}
              onLeave={() => setHoveredProject(null)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.a
            href="https://github.com/Pushpraj5732"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass-card rounded-xl text-white hover:text-neon-cyan transition-colors duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => onMouseEnter("button")}
            onMouseLeave={onMouseLeave}
          >
            <Github className="w-5 h-5" />
            <span>View All Projects</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Individual Project Card Component
 */
interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isInView: boolean;
}

function ProjectCard({ project, index, isHovered, onHover, onLeave, isInView }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { onMouseEnter, onMouseLeave: cursorLeave } = useCursorContext();

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onLeave();
    cursorLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      style={{
        perspective: 1000,
      }}
    >
      <motion.article
        className="relative h-full glass-card rounded-2xl overflow-hidden cursor-pointer"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => {
          onHover();
          onMouseEnter("card", "View");
        }}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isHovered ? 0.8 : 0.5 }}
          />
          
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Featured badge */}
          {project.featured && (
            <motion.span
              className="absolute top-3 left-3 z-20 px-3 py-1 text-xs font-medium bg-neon-cyan/20 text-neon-cyan rounded-full border border-neon-cyan/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              Featured
            </motion.span>
          )}

          {/* Hover overlay with links */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 transition-colors"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="text-xl font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300"
          >
            {project.title}
          </motion.h3>
          
          <p className="text-sm text-white/50 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/40 border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 + tagIndex * 0.05 }}
                whileHover={{ 
                  backgroundColor: "rgba(0, 255, 255, 0.1)",
                  borderColor: "rgba(0, 255, 255, 0.3)",
                  color: "rgba(0, 255, 255, 0.8)",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom glow on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: isHovered ? 1 : 0, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </motion.article>
    </motion.div>
  );
}
