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
      className="relative mx-4 mt-12 mb-16 max-w-5xl overflow-hidden rounded-[3rem] border border-slate-200/60 bg-gradient-to-r from-[#fdf7f1] via-[#f4f1eb] to-[#f6fbff] px-6 py-20 text-center shadow-[0_30px_120px_rgba(15,23,42,0.08)] sm:mx-auto dark:border-[#2C3237] dark:from-[#0F1113] dark:via-[#181B1E] dark:to-[#0F1113] dark:shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_60%)] opacity-80 dark:bg-[radial-gradient(circle_at_top,_rgba(60,84,104,0.45),_transparent_60%)]" />
      <motion.p
        className="text-xs uppercase tracking-[0.4em] text-[#56758E] dark:text-[#D98E62]"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        {content.eyebrow}
      </motion.p>
      <motion.h2
        className="mt-4 text-3xl font-semibold text-[#3C5468] md:text-4xl dark:text-[#F2F4F6]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {content.title}
      </motion.h2>
      <motion.p
        className="mx-auto mt-5 max-w-2xl text-base text-[#56758E] dark:text-[#A8B0B7]"
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
            className="flex h-full flex-col gap-4 rounded-2xl border border-white/60 bg-white/85 p-6 text-left text-[#3C5468] shadow-[0_15px_50px_rgba(15,23,42,0.1)] backdrop-blur dark:border-[#2C3237] dark:bg-[#202428] dark:text-white dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#56758E] dark:text-[#D98E62]">
              {method.label}
            </p>
            <p className="break-all text-2xl font-semibold text-[#3C5468] dark:text-white">
              {method.value}
            </p>
            <p className="text-sm text-[#56758E] dark:text-[#A8B0B7]">{method.hint}</p>
            <div className="mt-auto flex flex-wrap gap-3">
              <motion.a
                href={method.href}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#3C5468] via-[#56758E] to-[#D98E62] px-5 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {method.actionLabel}
              </motion.a>
              {method.copyValue && method.copyLabel && (
                <motion.button
                  type="button"
                  onClick={() => handleCopy(method)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#CDBFA4]/70 px-5 py-2.5 text-sm font-semibold text-[#3C5468] transition hover:border-[#D98E62] dark:border-[#2C3237] dark:text-[#F2F4F6]"
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
        className="mt-12 flex flex-col items-center gap-3 text-sm text-[#56758E] md:flex-row md:justify-center dark:text-[#A8B0B7]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.1 }}
      >
        {content.socials.length > 0 && (
          <span className="uppercase tracking-[0.3em] text-xs text-[#56758E] dark:text-[#D98E62]">
            {content.socialsLabel}
          </span>
        )}
        <div className="flex flex-wrap items-center gap-3 text-base font-semibold text-[#3C5468] dark:text-white">
          {content.socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 px-4 py-2 text-sm text-[#56758E] transition hover:border-[#D98E62]/70 hover:text-[#3C5468] dark:border-[#2C3237] dark:text-[#A8B0B7] dark:hover:border-[#D98E62]/70 dark:hover:text-white"
              whileHover={{ y: -2 }}
            >
              {social.label}
              <span className="text-[#A8B0B7] dark:text-[#6E777F]">@{social.username}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
