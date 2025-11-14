import { motion } from "framer-motion";

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  tech: string[];
  readiness?: string;
};

export type ExperienceContent = {
  eyebrow: string;
  title: string;
  description: string;
  experiences: ExperienceItem[];
};

type ExperienceSectionProps = {
  content: ExperienceContent;
};

export default function ExperienceSection({ content }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-slate-800/5 to-transparent dark:via-white/5" />

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

      <div className="mt-16 grid grid-cols-1 gap-8">
        {content.experiences.map((experience, index) => (
          <motion.article
            key={`${experience.company}-${experience.role}`}
            className="rounded-3xl border border-slate-200/70 bg-white/95 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_25px_80px_rgba(15,23,42,0.45)]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-200">
              <span>{experience.company}</span>
              <span className="h-px w-6 bg-slate-300 dark:bg-white/30" />
              <span>{experience.period}</span>
              <span className="h-px w-6 bg-slate-300 dark:bg-white/30" />
              <span>{experience.location}</span>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {experience.role}
              </h3>
              {experience.readiness && (
                <span className="inline-flex items-center rounded-full border border-emerald-200/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-300/40 dark:text-emerald-200">
                  {experience.readiness}
                </span>
              )}
            </div>

            <p className="mt-4 text-base text-slate-600 dark:text-white/70">
              {experience.summary}
            </p>

            <ul className="mt-5 space-y-3 text-sm text-slate-600 dark:text-white/80">
              {experience.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {experience.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200/80 px-3 py-1 text-xs text-slate-700 dark:border-white/15 dark:text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
