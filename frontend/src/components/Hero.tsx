import { motion } from "framer-motion";
import profilePortrait from "../assets/profile.png";

export type HeroContent = {
  badge: string;
  availability?: string;
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  stats: { label: string; value: string }[];
  scrollHint: string;
};

type HeroProps = {
  content: HeroContent;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.025 },
  },
};

const letterVariants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Hero({ content }: HeroProps) {
  const lines = content.headline.split("\n");

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-slate-900 dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-100">
        <div className="absolute inset-x-0 top-10 mx-auto h-64 w-[36rem] rounded-full bg-gradient-to-r from-indigo-400/40 via-fuchsia-400/30 to-sky-400/30 blur-[140px] dark:from-indigo-500/40 dark:via-fuchsia-500/40 dark:to-sky-500/40" />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-600/30" />
        <div className="absolute -right-12 top-0 h-80 w-80 rounded-full bg-fuchsia-300/30 blur-3xl dark:bg-fuchsia-500/30" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-500/25" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="flex w-full max-w-3xl flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-indigo-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {content.badge}
            </motion.div>
            {content.availability && (
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-emerald-50 px-5 py-2 text-xs font-semibold text-emerald-900 shadow-sm dark:border-emerald-300/40 dark:bg-emerald-400/20 dark:text-emerald-100"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                {content.availability}
              </motion.div>
            )}
          </div>

          <motion.h1
            className="max-w-4xl text-balance text-4xl font-bold tracking-[0.04em] text-slate-900 sm:text-5xl md:text-6xl dark:text-white"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {lines.map((line, lineIndex) => {
              const words = line.trim().split(/\s+/).filter(Boolean);
              return (
                <span key={`line-${lineIndex}`} className="block">
                  {words.map((word, wordIndex) => (
                    <span
                      key={`word-${lineIndex}-${wordIndex}`}
                      className="inline-flex whitespace-nowrap"
                    >
                      {word.split("").map((char, charIndex) => (
                        <motion.span
                          key={`char-${lineIndex}-${wordIndex}-${charIndex}`}
                          variants={letterVariants}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                      {wordIndex < words.length - 1 && (
                        <span className="inline-block w-2" aria-hidden>
                          {"\u00A0"}
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              );
            })}
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-balance text-base text-slate-600 md:text-lg dark:text-gray-300 lg:mx-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {content.description}
          </motion.p>

          <div className="mt-12 flex w-full flex-col gap-4 sm:flex-row">
            <motion.a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-sky-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(79,70,229,0.35)]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              {content.primaryCta}
            </motion.a>
            <motion.a
              href="#contact"
              className="rounded-full border border-slate-300/80 px-8 py-3 text-sm font-semibold text-slate-900 backdrop-blur dark:border-white/15 dark:text-white/90"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              {content.secondaryCta}
            </motion.a>
          </div>

          <motion.ul
            className="mt-16 grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            {content.stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 lg:text-left"
              >
                <p className="text-3xl font-semibold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-white/60">
                  {stat.label}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="w-full max-w-[13rem] shrink-0 sm:max-w-[15rem] lg:max-w-[18rem]"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-indigo-500/35 via-fuchsia-500/30 to-sky-500/30 blur-[80px] dark:from-indigo-500/45 dark:via-fuchsia-500/35 dark:to-sky-500/35" />
            <div className="relative aspect-[2/3] overflow-hidden rounded-[26px] border border-white/15 bg-gradient-to-b from-[#101631] via-[#090f1f] to-[#05060c] shadow-xl shadow-indigo-900/30 ring-1 ring-white/10">
              <img
                src={profilePortrait}
                alt="Portrait of Eetu Purhonen"
                className="h-full w-full object-cover object-[50%_36%] sm:object-[50%_42%] lg:object-[50%_38%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-950/70" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-slate-950/50 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2 text-xs text-slate-500 dark:text-white/60"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <span>{content.scrollHint}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
