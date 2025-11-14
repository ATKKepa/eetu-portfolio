import { useState } from "react";
import { motion } from "framer-motion";

export type ContactMethod = {
  label: string;
  value: string;
  hint: string;
  actionLabel: string;
  href: string;
  copyLabel?: string;
  copySuccessLabel?: string;
  copyValue?: string;
};

export type ContactSocial = {
  label: string;
  username: string;
  href: string;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  methods: ContactMethod[];
  socials: ContactSocial[];
  socialsLabel: string;
};

type ContactSectionProps = {
  content: ContactContent;
};

export default function ContactSection({ content }: ContactSectionProps) {
  const [copiedMethod, setCopiedMethod] = useState<string | null>(null);

  const handleCopy = async (method: ContactMethod) => {
    if (!method.copyValue || typeof navigator === "undefined" || !navigator.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(method.copyValue);
      setCopiedMethod(method.label);
      window.setTimeout(() => setCopiedMethod((prev) => (prev === method.label ? null : prev)), 2200);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  };

  return (
    <section
      id="contact"
      className="relative mx-4 mt-12 mb-16 max-w-5xl overflow-hidden rounded-[3rem] border border-slate-200/70 bg-gradient-to-r from-indigo-100 via-fuchsia-50 to-sky-100 px-6 py-20 text-center shadow-[0_30px_120px_rgba(15,23,42,0.12)] dark:border-white/10 dark:from-indigo-600/30 dark:via-fuchsia-500/20 dark:to-sky-500/30 dark:shadow-[0_30px_120px_rgba(15,23,42,0.6)] sm:mx-auto"
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
        className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: {} }}
      >
        {content.methods.map((method, index) => (
          <motion.article
            key={method.label}
            className="flex h-full flex-col gap-4 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/10 dark:shadow-[0_20px_60px_rgba(15,23,42,0.5)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/70">
              {method.label}
            </p>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">
              {method.value}
            </p>
            <p className="text-sm text-slate-600 dark:text-white/80">{method.hint}</p>
            <div className="mt-auto flex flex-wrap gap-3">
              <motion.a
                href={method.href}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {method.actionLabel}
              </motion.a>
              {method.copyValue && method.copyLabel && (
                <motion.button
                  type="button"
                  onClick={() => handleCopy(method)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-300/70 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-white/30 dark:text-white"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {copiedMethod === method.label && method.copySuccessLabel
                    ? method.copySuccessLabel
                    : method.copyLabel}
                </motion.button>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 flex flex-col items-center gap-3 text-sm text-slate-600 dark:text-white/80 md:flex-row md:justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.1 }}
      >
        {content.socials.length > 0 && (
          <span className="uppercase tracking-[0.3em] text-xs text-slate-500 dark:text-white/70">
            {content.socialsLabel}
          </span>
        )}
        <div className="flex flex-wrap items-center gap-3 text-base font-semibold text-slate-900 dark:text-white">
          {content.socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-400 dark:border-white/20 dark:text-white"
              whileHover={{ y: -2 }}
            >
              {social.label}
              <span className="text-slate-500 dark:text-white/70">@{social.username}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
