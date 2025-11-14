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
  feedback?: {
    label: string;
    quote: string;
  };
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-slate-800/5 to-transparent dark:via-[#181B1E]/40" />

      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="text-sm uppercase tracking-[0.3em] text-[#4a5e72] dark:text-[#D98E62]">
          {content.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold text-[#1f2a33] md:text-4xl dark:text-[#F2F4F6]">
          {content.title}
        </h2>
        <p className="mt-4 text-base text-[#44576b] dark:text-[#A8B0B7]">
          {content.description}
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-8">
        {content.experiences.map((experience, index) => (
          <motion.article
            key={`${experience.company}-${experience.role}`}
            className="rounded-3xl border border-slate-200/70 bg-white p-8 text-[#2B3947] shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:border-[#2C3237] dark:bg-[#202428] dark:text-white dark:shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#475c71] dark:text-[#CDBFA4]">
              <span>{experience.company}</span>
              <span className="h-px w-6 bg-slate-200 dark:bg-[#2C3237]" />
              <span>{experience.period}</span>
              <span className="h-px w-6 bg-slate-200 dark:bg-[#2C3237]" />
              <span>{experience.location}</span>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h3 className="text-2xl font-semibold text-[#1f2a33] dark:text-[#F2F4F6]">
                {experience.role}
              </h3>
              {experience.readiness && (
                <span className="inline-flex items-center rounded-full border border-[#D98E62]/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#2B3947] dark:border-[#D98E62]/70 dark:text-[#F2F4F6]">
                  {experience.readiness}
                </span>
              )}
            </div>

            <p className="mt-4 text-base text-[#44576b] dark:text-[#A8B0B7]">
              {experience.summary}
            </p>

            <ul className="mt-5 space-y-3 text-sm text-[#465a6e] dark:text-[#A8B0B7]">
              {experience.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-[#c87444] dark:bg-[#D98E62]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {experience.feedback && (
              <div className="mt-6 rounded-2xl border border-slate-200/80 bg-[#f6f1ea] p-5 text-sm text-[#263443] dark:border-[#2C3237] dark:bg-[#181B1E]/90 dark:text-[#A8B0B7]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#56758E] dark:text-[#D98E62]">
                  {experience.feedback.label}
                </p>
                <p className="mt-3 italic leading-relaxed">“{experience.feedback.quote}”</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {experience.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200/80 px-3 py-1 text-xs text-[#465a6e] dark:border-[#2C3237] dark:text-[#A8B0B7]"
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
