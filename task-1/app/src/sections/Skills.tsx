"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useCursorContext } from "@/hooks/useCursorContext";
import { AnimatedHeading } from "@/components/text/SplitText";

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}
const skills: Skill[] = [
  
  { name: "React", level: 75, category: "Frontend", color: "#61DAFB" },
  
  { name: "Next.js", level: 63, category: "Frontend", color: "#ffffff" },
  { name: "Tailwind CSS", level: 95, category: "Frontend", color: "#06B6D4" },

  { name: "Node.js", level: 75, category: "Backend", color: "#339933" },
  { name: "Python", level: 73, category: "Backend", color: "#3776AB" },
  { name: "PostgreSQL", level: 67, category: "Backend", color: "#4169E1" },
  { name: "MongoDB", level: 65, category: "Backend", color: "#47A248" },
  { name: "GraphQL", level: 50, category: "Backend", color: "#E10098" },
  { name: "Redis", level: 40, category: "Backend", color: "#DC382D" },

  { name: "Git", level: 60     , category: "Tools", color: "#F05032" },

];

const categories = ["All", "Frontend", "Backend", "Tools"];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { onMouseEnter, onMouseLeave } = useCursorContext();

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
     
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(180, 0, 255, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="section-container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-neon-cyan font-mono text-sm">03.</span>
            <div className="h-[1px] w-12 bg-neon-cyan/30" />
            <span className="text-white/40 text-sm uppercase tracking-wider">Skills</span>
          </motion.div>

          <AnimatedHeading
            level={2}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
          >
            Technologies I Work With
          </AnimatedHeading>

          <motion.p
            className="text-lg text-white/60 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A curated collection of tools and technologies I use to bring ideas to life.
            Always learning, always evolving.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => onMouseEnter("hover")}
              onMouseLeave={onMouseLeave}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  layout: { duration: 0.3 },
                }}
              >
                <SkillCard
                  skill={skill}
                  isHovered={hoveredSkill === skill.name}
                  onHover={() => setHoveredSkill(skill.name)}
                  onLeave={() => setHoveredSkill(null)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Proficiency Overview */}
        <motion.div
          className="mt-20 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { label: "Frontend Development", value: 70, color: "from-neon-cyan to-blue-500" },
            { label: "Backend Development", value: 65, color: "from-neon-purple to-pink-500" },
            { label: "DevOps & Tools", value: 69, color: "from-orange-500 to-red-500" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              onMouseEnter={() => onMouseEnter("card")}
              onMouseLeave={onMouseLeave}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-medium">{item.label}</span>
                <motion.span
                  className="text-neon-cyan font-mono"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  {item.value}%
                </motion.span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${item.value}%` } : {}}
                  transition={{ duration: 1.5, delay: 1 + index * 0.2, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Individual Skill Card Component
 */
interface SkillCardProps {
  skill: Skill;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function SkillCard({ skill, isHovered, onHover, onLeave }: SkillCardProps) {
  const { onMouseEnter, onMouseLeave } = useCursorContext();
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    onLeave();
    onMouseLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative glass-card rounded-xl p-4 cursor-pointer transition-all duration-300"
      onMouseEnter={() => {
        onHover();
        onMouseEnter("card");
      }}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      whileTap={{ scale: 0.95 }}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${skill.color}20, transparent 70%)`,
        }}
      />

      {/* Skill name */}
      <div className="relative z-10">
        <motion.h3
          className="text-sm font-medium text-white mb-2"
          animate={{ color: isHovered ? skill.color : "#ffffff" }}
          transition={{ duration: 0.3 }}
        >
          {skill.name}
        </motion.h3>

        {/* Progress bar */}
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            style={{ backgroundColor: skill.color }}
          />
        </div>

        {/* Level indicator */}
        <motion.span
          className="text-xs text-white/40 mt-1 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Category badge */}
      <motion.span
        className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
      >
        {skill.category}
      </motion.span>
    </motion.div>
  );
}
