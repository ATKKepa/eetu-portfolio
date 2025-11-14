import { motion } from "framer-motion";

export type NavLink = { label: string; href: string };
export type SocialLink = { label: string; href: string };
type SupportedLanguage = "fi" | "en";
type ThemeMode = "dark" | "light";

type NavbarProps = {
  language: SupportedLanguage;
  onLanguageChange: (locale: SupportedLanguage) => void;
  theme: ThemeMode;
  onThemeToggle: () => void;
  links: NavLink[];
  socials: SocialLink[];
  languageToggleLabel: string;
  themeToggleLabel: string;
};

const languageButtons: { value: SupportedLanguage; label: string }[] = [
  { value: "fi", label: "FI" },
  { value: "en", label: "EN" },
];

export default function Navbar({
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  links,
  socials,
  languageToggleLabel,
  themeToggleLabel,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 w-full px-6 py-6">
      <motion.nav
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-slate-200/70 bg-white/80 px-6 py-3 text-slate-900 shadow-[0_20px_60px_rgba(2,6,23,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-950/70 dark:text-white dark:shadow-[0_20px_60px_rgba(2,6,23,0.55)]"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <a href="#hero" className="text-sm font-semibold tracking-wide">
          Eetu.dev
        </a>

        <ul className="hidden items-center gap-6 text-sm text-slate-500 dark:text-white/70 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-slate-900 dark:hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-slate-200/80 bg-white/80 p-1 text-xs font-semibold text-slate-500 dark:border-white/15 dark:bg-white/5 dark:text-white/70">
            {languageButtons.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                aria-label={languageToggleLabel}
                onClick={() => onLanguageChange(value)}
                className={`rounded-full px-3 py-1 transition ${
                  language === value
                    ? "bg-slate-900 text-white dark:bg-white/80 dark:text-slate-900"
                    : "hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={onThemeToggle}
            aria-label={themeToggleLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/80 text-slate-700 shadow-sm transition hover:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "dark" ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="4" />
                <path
                  strokeLinecap="round"
                  d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 6.07l-1.42-1.42M8.35 8.35L6.93 6.93m10.14-0.28l-1.42 1.42M8.35 15.65l-1.42 1.42"
                />
              </svg>
            )}
          </motion.button>

          <div className="hidden items-center gap-2 text-sm font-medium sm:flex">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="rounded-full border border-slate-200/70 px-3 py-1 text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-white/15 dark:text-white/70 dark:hover:border-white/40 dark:hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
