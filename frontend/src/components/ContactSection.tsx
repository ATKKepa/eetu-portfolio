import { motion } from "framer-motion";

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

type ContactSectionProps = {
  content: ContactContent;
};

export default function ContactSection({ content }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-[3rem] border border-slate-200/70 bg-gradient-to-r from-indigo-100 via-fuchsia-50 to-sky-100 px-6 py-20 text-center shadow-[0_30px_120px_rgba(15,23,42,0.12)] dark:border-white/10 dark:from-indigo-600/30 dark:via-fuchsia-500/20 dark:to-sky-500/30 dark:shadow-[0_30px_120px_rgba(15,23,42,0.6)]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.5),_transparent_55%)] opacity-70 dark:opacity-100" />
      <motion.p
        className="text-xs uppercase tracking-[0.4em] text-slate-600 dark:text-white/70"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        {content.eyebrow}
      </motion.p>
      <motion.h2
        className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {content.title}
      </motion.h2>
      <motion.p
        className="mx-auto mt-5 max-w-2xl text-base text-slate-600 dark:text-white/80"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {content.description}
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.a
          href={content.primaryCta.href}
          className="w-full rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-slate-950 shadow-[0_20px_60px_rgba(255,255,255,0.3)] sm:w-auto"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          {content.primaryCta.label}
        </motion.a>
        <motion.a
          href={content.secondaryCta.href}
          className="w-full rounded-2xl border border-slate-300/70 px-8 py-4 text-sm font-semibold text-slate-700 backdrop-blur transition dark:border-white/30 dark:text-white/80 sm:w-auto"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          {content.secondaryCta.label}
        </motion.a>
      </motion.div>
    </section>
  );
}
