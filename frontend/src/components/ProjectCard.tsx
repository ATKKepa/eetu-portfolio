import { motion } from "framer-motion";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  highlights?: string[];
};

type ProjectCardProps = {
  project: Project;
  index: number;
  badgeLabel: string;
  ctaLabel: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectCard({ project, index, badgeLabel, ctaLabel }: ProjectCardProps) {
  return (
    <motion.article
      className="group flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur transition dark:border-white/5 dark:bg-white/5 dark:shadow-[0_25px_80px_rgba(15,23,42,0.45)]"
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="relative mb-5 rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/20 to-sky-400/20 p-5 dark:from-indigo-600/40 dark:via-fuchsia-500/30 dark:to-sky-400/30">
        <div className="absolute inset-3 rounded-2xl border border-white/15" />
        <span className="relative text-xs uppercase tracking-[0.3em] text-slate-700 dark:text-white/70">
          {badgeLabel}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
        {project.title}
      </h3>
      <div className="mt-3 flex-1">
        <p className="text-sm text-slate-600 dark:text-white/70">
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-white/70">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200/80 px-3 py-1 text-xs text-slate-700 dark:border-white/15 dark:text-white/80"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.link && (
        <motion.a
          href={project.link}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-200"
          whileHover={{ x: 4 }}
        >
          {ctaLabel}
        </motion.a>
      )}
    </motion.article>
  );
}
