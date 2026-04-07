"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import { AnimatedHeading } from "@/components/text/SplitText";
import { useCursorContext } from "@/hooks/useCursorContext";

/**
 * Experience Section
 * 
 * Features:
 * - Scroll-based storytelling with pinned sections
 * - Progressive content reveal
 * - Animated timeline
 * - Company cards with hover effects
 * - Achievement highlights
 */

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "Brainbeemly",
    location: "Remote",
    period: "1 Month Internship",
    description:
      "Completed a 1-month internship at Brainbeemly where I worked on frontend development tasks, improved UI components, and contributed to responsive web interfaces. Gained practical experience in building reusable components and understanding real-world project workflows.",
    achievements: [
      "Built and improved responsive UI components",
      "Worked on modern frontend development practices",
      "Enhanced form usability and user interface design",
      "Contributed to real-world internship tasks and mini project features",
    ],
    technologies: ["React", "JavaScript", "HTML", "CSS", "Bootstrap"],
  },
  {
    id: 2,
    role: "Full Stack Developer (Learning & Projects)",
    company: "Personal Projects",
    location: "India",
    period: "2025 - Present",
    description:
      "Actively building full stack projects as part of my learning journey. Working on frontend, backend, APIs, authentication, database integration, and deployment while creating portfolio-ready projects to strengthen practical development skills.",
    achievements: [
      "Built portfolio-focused MERN stack projects",
      "Practiced API integration and backend fundamentals",
      "Worked on reusable React components and routing",
      "Learned Docker, Nginx, and deployment basics for real-world development",
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Docker"],
  },
  {
    id: 3,
    role: "Backend Developer (Learning Spring)",
    company: "Self Learning",
    location: "India",
    period: "2025 - Present",
    description:
      "Focused on strengthening backend development skills using Spring. Learning REST APIs, authentication, database design, and backend architecture while preparing for full stack development and software engineering roles.",
    achievements: [
      "Learned backend concepts using Spring framework",
      "Practiced CRUD operations and API development",
      "Explored authentication and database integration",
      "Strengthened problem-solving through hands-on coding",
    ],
    technologies: ["Java", "Spring", "MySQL", "REST API", "Git"],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);


  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(180, 0, 255, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="section-container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-neon-cyan font-mono text-sm">05.</span>
            <div className="h-[1px] w-12 bg-neon-cyan/30" />
            <span className="text-white/40 text-sm uppercase tracking-wider">Experience</span>
          </motion.div>

          <AnimatedHeading
            level={2}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
          >
            Work History
          </AnimatedHeading>

          <motion.p
            className="text-lg text-white/60 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A journey through my professional career, showcasing growth, 
            achievements, and the technologies I&apos;ve mastered along the way.
          </motion.p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
            />
          ))}
        </div>

      
      </div>
    </section>
  );
}

/**
 * Individual Experience Card Component
 */
interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { onMouseEnter, onMouseLeave } = useCursorContext();

  const isCardInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isCardInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.article
        className="glass-card rounded-2xl p-8 group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={() => onMouseEnter("card")}
        onMouseLeave={onMouseLeave}
      >
        <div className="grid lg:grid-cols-[1fr,2fr] gap-8">
          {/* Left Column - Role & Company */}
          <div>
            <motion.div
              className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center mb-4"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <Briefcase className="w-6 h-6 text-neon-cyan" />
            </motion.div>

            <h3 className="text-2xl font-display font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors">
              {experience.role}
            </h3>
            
            <p className="text-neon-purple font-medium mb-4">{experience.company}</p>
            
            <div className="space-y-2 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Description & Achievements */}
          <div>
            <p className="text-white/60 mb-6 leading-relaxed">
              {experience.description}
            </p>

            {/* Achievements */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-sm text-white/50"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isCardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <ChevronRight className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/60 border border-white/10 hover:bg-neon-cyan/10 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isCardInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hover accent line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan to-neon-purple rounded-l-2xl"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isCardInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          style={{ originY: 0 }}
        />
      </motion.article>
    </motion.div>
  );
}
