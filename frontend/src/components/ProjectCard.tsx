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
      className="group flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/95 p-6 text-[#263443] shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur transition dark:border-[#2C3237] dark:bg-[#202428] dark:text-[#F2F4F6] dark:shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="relative mb-5 rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/20 to-sky-400/20 p-5 dark:from-[#3C5468]/70 dark:via-[#56758E]/60 dark:to-[#D98E62]/35">
        <div className="absolute inset-3 rounded-2xl border border-white/15" />
        <span className="relative text-xs uppercase tracking-[0.3em] text-[#455a6e] dark:text-[#CDBFA4]">
          {badgeLabel}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-[#1f2a33] dark:text-white">
        {project.title}
      </h3>
      <div className="mt-3 flex-1">
        <p className="text-sm text-[#4a5d70] dark:text-[#A8B0B7]">
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-[#4a5d70] dark:text-[#A8B0B7]">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-[#D98E62] dark:bg-[#D98E62]" />
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
            className="rounded-full border border-slate-200/80 px-3 py-1 text-xs text-[#455a6e] dark:border-[#2C3237] dark:text-[#A8B0B7]"
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
          className="mt-6 inline-flex items-center text-sm font-semibold text-[#2B3947] dark:text-[#D98E62]"
          whileHover={{ x: 4 }}
        >
          {ctaLabel}
        </motion.a>
      )}
    </motion.article>
  );
}
