import { motion } from "framer-motion";
import type { Project } from "./ProjectCard";
import ProjectCard from "./ProjectCard";

export type ProjectsContent = {
  eyebrow: string;
  title: string;
  description: string;
  badgeLabel: string;
  ctaLabel: string;
  projects: Project[];
};

type ProjectsSectionProps = {
  content: ProjectsContent;
};

export default function ProjectsSection({ content }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />

      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-200">
          {content.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
          {content.title}
        </h2>
        <p className="mt-4 text-base text-slate-600 dark:text-white/70">
          {content.description}
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {content.projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            badgeLabel={content.badgeLabel}
            ctaLabel={content.ctaLabel}
          />
        ))}
      </div>
    </section>
  );
}
