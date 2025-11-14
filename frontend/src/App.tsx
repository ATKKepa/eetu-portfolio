import { useEffect, useMemo, useState } from "react";
import Hero, { type HeroContent } from "./components/Hero";
import ProjectsSection, { type ProjectsContent } from "./components/ProjectsSection";
import ExperienceSection, { type ExperienceContent } from "./components/ExperienceSection";
import ContactSection, { type ContactContent } from "./components/ContactSection";
import Navbar, { type NavLink, type SocialLink } from "./components/Navbar";
import type { Project } from "./components/ProjectCard";

type Locale = "fi" | "en";
type ThemeMode = "dark" | "light";
const LANGUAGE_PARAM = "lang";
const CONTACT_EMAIL = "eetupurhonen8@gmail.com";
const CONTACT_PHONE_VALUE = "+358505388987";
const CONTACT_PHONE_DISPLAY = "+358 50 538 8987";
const GITHUB_USERNAME = "ATKKepa";
const LINKEDIN_USERNAME = "eetupurhonen";
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
const LINKEDIN_URL = `https://www.linkedin.com/in/${LINKEDIN_USERNAME}`;
const PORTFOLIO_REPO_URL = "https://github.com/ATKKepa/eetu-portfolio";

type Copy = {
  nav: {
    links: NavLink[];
  };
  hero: HeroContent;
  projects: ProjectsContent;
  experience: ExperienceContent;
  contact: ContactContent;
};

const projectData: Record<Locale, Project[]> = {
  fi: [
    {
      title: "taskon-react-flask",
      description:
        "Täysin oma fullstack-tuottavuusratkaisu: Flask-API, React + Mantine -UI, tiedostogalleria ja drag & drop -kanban yhdistettynä SQLiteen.",
      highlights: [
        "Tuotantovalmiit käyttökokemukset Mantinen komponenteilla, optimistiset päivitykset ja dnd-kitillä toteutetut laudat",
        "Flask-taustapalvelu, jossa on migraatiot, idempotentit tiedostokäsittelyt ja checksum-pohjainen duplikaattien tunnistus",
        "Jaettu kontrakti frontin ja backin välillä (api.ts) sekä README, joka kertoo asetukset ja julkaisut"
      ],
      tags: ["React", "Mantine", "Flask", "SQLite", "dnd-kit"],
      link: "https://github.com/ATKKepa/taskon-react-flask",
    },
    {
      title: "Portfolio 2025",
      description:
        "Tämä sivusto: kaksikielinen, tumma/vaalea tila ja animaatiot, joilla esittelen osaamiseni rekrytiimeille.",
      highlights: [
        "Rakensin i18n-vaihdon, teemanhallinnan ja CTA-linkit samaan kevyeen tilahallintaan",
        "Hero-, projekti- ja kokemusosiot viimeistelty Tailwind + Framer Motion -mikrointeraktioilla",
        "Komponenttipohja (Navbar, osiot, kortit), jota voi laajentaa uusiin caseihin ilman kopiointia"
      ],
      tags: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion", "i18n"],
      link: PORTFOLIO_REPO_URL,
    },
    {
      title: "Flutter_demo",
      description:
        "Flutter-sovellus, jossa kokeilen Material 3 -teemaa, reaktiivista Riverpod-tilaa ja Firebase-synkkaa, jotta demo toimii sekä Androidilla että iOS:llä.",
      highlights: [
        "Offline-first logiikka, joka puskuroidaan SQLiteen ja synkataan takaisin Firestoreen ilman konflikteja",
        "Mukautettavat teemat ja animaatiot, jotka näyttävät luonnollisilta sekä mobiilissa että web buildissä",
        "Explorer-näkymä, jolla demoon lisätyt komponentit dokumentoituvat automaattisesti"
      ],
      tags: ["Flutter", "Dart", "Firebase", "Riverpod"],
      link: "https://github.com/ATKKepa/Flutter_demo",
    },
    {
      title: "next_mini",
      description:
        "Kevyt Next.js -kokonaisuus, joka näyttää miten rakennan autentikoinnin, CMS-syötteet ja dynaamiset sivupohjat ilman raskasta backendia.",
      highlights: [
        "App Router + Server Actions -pohjainen lomakeflow, joka validioidaan Zodilla",
        "Prisma + PlanetScale -integraatio, jolla sisältö on heti tuotantokelpoinen",
        "Tailwind + Framer Motion -kirjastoilla toteutetut mikrointeraktiot"
      ],
      tags: ["Next.js", "TypeScript", "Prisma", "Tailwind", "Framer Motion"],
      link: "https://github.com/ATKKepa/next_mini",
    },
  ],
  en: [
    {
      title: "taskon-react-flask",
      description:
        "End-to-end productivity suite I own fully: Flask API, React + Mantine UI, file gallery, notes, and drag & drop kanban backed by SQLite.",
      highlights: [
        "Production-grade UX with Mantine, smooth dnd-kit boards, optimistic updates and thoughtful empty states",
        "Flask backend with migrations, idempotent file handling, checksum de-duplication and tuned SQL queries",
        "Shared api.ts contracts, typed React components and a README documenting setup, API and deployment"
      ],
      tags: ["React", "Mantine", "Flask", "SQLite", "dnd-kit"],
      link: "https://github.com/ATKKepa/taskon-react-flask",
    },
    {
      title: "Portfolio 2025",
      description:
        "This very site: bilingual, theme-aware and animation-heavy so recruiters instantly see how I build products.",
      highlights: [
        "Implemented language switching, theme state and CTA routing on a lightweight shared state layer",
        "Hero, projects and experience sections polished with Tailwind + Framer Motion micro-interactions",
        "Reusable component system (Navbar, sections, cards) that can stretch to future case studies without duplication"
      ],
      tags: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion", "i18n"],
      link: PORTFOLIO_REPO_URL,
    },
    {
      title: "Flutter_demo",
      description:
        "A Flutter build that explores Material 3 theming, Riverpod state, and Firebase sync so the demo feels native on Android, iOS and web.",
      highlights: [
        "Offline-first logic buffered in SQLite then synced back to Firestore without conflicts",
        "Custom themes and motion that behave naturally across mobile and web targets",
        "Component explorer view that self-documents every widget added to the demo"
      ],
      tags: ["Flutter", "Dart", "Firebase", "Riverpod"],
      link: "https://github.com/ATKKepa/Flutter_demo",
    },
    {
      title: "next_mini",
      description:
        "A lean Next.js build that showcases how I handle auth, CMS-style content feeds and dynamic layouts without a heavy backend.",
      highlights: [
        "App Router + Server Actions form flow validated with Zod",
        "Prisma + PlanetScale integration so content is production-ready on day one",
        "Tailwind + Framer Motion micro-interactions for a polished feel"
      ],
      tags: ["Next.js", "TypeScript", "Prisma", "Tailwind", "Framer Motion"],
      link: "https://github.com/ATKKepa/next_mini",
    },
  ],
};

const copy: Record<Locale, Copy> = {
  fi: {
    nav: {
      links: [
        { label: "Etusivu", href: "#hero" },
        { label: "Projektit", href: "#projects" },
  { label: "Ota yhteyttä", href: "#contact" },
      ],
    },
    hero: {
      badge: "Viimeistelty fullstack",
  availability: "Avoin uusille mahdollisuuksille · Etsin opinnäytetyöpaikkaa",
      headline: "Hei, olen Eetu —\nFullstack-tekijä.",
      description:
        "Rakennan modernia ja viimeisteltyä frontti- ja backend-kehitystä Reactilla, TypeScriptillä ja JVM-ympäristössä. Yhdistän huolitellun käyttöliittymän, sujuvat animaatiot ja tuotantokelpoisen arkkitehtuurin — ja haen parhaillaan uutta tiimiä, jossa voin kasvattaa osaamistani.",
      primaryCta: "Katso viimeisimmät projektini",
      secondaryCta: "Ota yhteyttä",
      stats: [
  { label: "Vuotta käytännön kehitystä", value: "1" },
  { label: "Omalla ajalla julkaistua projektia", value: "6" },
        { label: "Työtilanne", value: "Etsinnässä" },
      ],
      scrollHint: "Scrollaa ja tutustu",
    },
    projects: {
      eyebrow: "Projektit",
      title: "Tuon designin, datan ja tuotekehityksen yhteen",
      description:
        "Jokainen kokonaisuus on rakennettu tuotantovalmiiksi: mittarointi, CI/CD ja dokumentaatio sisältyvät pakettiin.",
  badgeLabel: "Projektin ydin",
  ctaLabel: "Avaa repo →",
      projects: projectData.fi,
    },
    experience: {
      eyebrow: "Kokemus",
      title: "Pienissä tiimeissä hiottu osaaminen",
      description:
        "Kahden harjoittelun aikana keskityin sekä tekoälyä hyödyntäviin web-sovelluksiin että infraan — näin läheltä koko ketjun suunnittelusta julkaisuun.",
      experiences: [
        {
          company: "Peliporukka RP Ry",
          role: "Software Developer Intern — AI & Web",
          period: "05/2025 – 08/2025",
          location: "Tampere",
          summary:
            "Rakensin Azure OpenAI (GPT-4) -pohjaisen chat-sovelluksen Mantine/React-frontendilla, Flask-REST-rajapinnoilla ja Cosmos DB -tietokannalla.",
          bullets: [
            "Suunnittelin ja dokumentoin REST-pinnat sisäisiin työkaluihin, jotta kehittäjien olisi helpompi käyttää ja ylläpitää niitä",
            "Rakensin GitHub Actions -workflowt (lint/test/build) pull requestien laadun ja julkaisujen luotettavuuden varmistamiseksi",
            "Osallistuin API-rakenteiden, datamallien ja julkaisuarkkitehtuurin suunnitteluun sekä opin tuotantotason päätöksenteon perusteet"
          ],
          tech: ["React", "Vite", "Mantine", "Flask", "REST", "Cosmos DB", "Azure OpenAI", "GitHub Actions"],
          readiness: "Vastaan myös CI/CD:stä ja julkaisuista",
          feedback: {
            label: "Työnantajan palaute",
            quote: "Eetu osoitti vahvaa omistautumista, oma-aloitteisuutta ja tiimityökykyä koko harjoittelun ajan.",
          },
        },
        {
          company: "Peliporukka RP Ry",
          role: "Developer Intern — Infra, Web & Games",
          period: "12/2024 – 02/2025",
          location: "Tampere",
          summary:
            "Ylläpidin Linux/Windows-palvelimia, rakensin sisäisiä työkaluja ja opin viemään koodin kontista Kubernetes-klusteriin.",
          bullets: [
            "Konfiguroin DDoS-suojaukset, seurasin palvelimien kuntoa ja automatisoin perushuoltoja",
            "Julkaisin verkkosivuja ja API-palveluita Kubernetes-ympäristöön sekä asensin perustason monitoroinnin ja lokituksen",
            "Rakensin sisäisiä työkaluja Lua/TypeScriptillä (React/Svelte) MariaDB/MySQL-taustoilla ja standardoin CI/CD:tä GitHubissa"
          ],
          tech: ["Kubernetes", "Linux", "Windows", "Lua", "React", "Svelte", "TypeScript", "MariaDB", "MySQL", "GitHub"],
          feedback: {
            label: "Työnantajan palaute",
            quote: "Eetu hoiti infra- ja web-tehtävät huolellisesti, haki palautetta ja piti aikatauluista kiinni.",
          },
        },
      ],
    },
    contact: {
      eyebrow: "Puhutaanko töistä?",
  title: "Etsitkö tiimiin fullstack-tekijää?",
      description:
        "Jos kaipaat tekijää, joka yhdistää käyttöliittymän, backendin ja CI/CD:n, jutellaan. Olen avoin uusille haasteille ja vastaan saman päivän aikana.",
      methods: [
        {
          label: "Puhelin",
          value: CONTACT_PHONE_DISPLAY,
          hint: "Soita tai jätä WhatsApp-viesti, vastaan sinulle nopeasti",
          actionLabel: "Soita",
          href: `tel:${CONTACT_PHONE_VALUE}`,
        },
        {
          label: "Sähköposti",
          value: CONTACT_EMAIL,
          hint: "Lähetä sähköposti, vastaan sinulle pian",
          actionLabel: "Lähetä sähköposti",
          href: `mailto:${CONTACT_EMAIL}`,
          copyLabel: "Kopioi osoite",
          copySuccessLabel: "Kopioitu!",
          copyValue: CONTACT_EMAIL,
        },
      ],
      socialsLabel: "Kanavat",
      socials: [
        { label: "GitHub", username: GITHUB_USERNAME, href: GITHUB_URL },
        { label: "LinkedIn", username: LINKEDIN_USERNAME, href: LINKEDIN_URL },
      ],
    },
  },
  en: {
    nav: {
      links: [
        { label: "Home", href: "#hero" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
      ],
    },
    hero: {
      badge: "Polished full-stack work",
  availability: "Open for new roles · Seeking a thesis placement",
      headline: "Hi, I'm Eetu —\na Full-stack Engineer.",
      description:
        "I craft modern frontend and backend solutions with React, TypeScript and the JVM ecosystem. I focus on refined UI, smooth motion and production-ready architecture — and I'm actively looking for a team where I can keep leveling up.",
      primaryCta: "Browse recent work",
      secondaryCta: "Reach out",
      stats: [
        { label: "Years in production", value: "1" },
        { label: "Personal launches", value: "6" },
        { label: "Work status", value: "Looking" },
      ],
      scrollHint: "Scroll to explore",
    },
    projects: {
      eyebrow: "Projects",
      title: "Blending design, data and product delivery",
      description:
        "Every engagement ships production-ready: instrumentation, CI/CD and documentation included.",
  badgeLabel: "Build focus",
  ctaLabel: "Open repo →",
      projects: projectData.en,
    },
    experience: {
      eyebrow: "Experience",
      title: "Hands-on impact across AI, web and infra",
      description:
        "Two internships gave me a front-row seat to building AI-enabled products and running infrastructure — from planning through production.",
      experiences: [
        {
          company: "Peliporukka RP Ry",
          role: "Software Developer Intern — AI & Web",
          period: "05/2025 – 08/2025",
          location: "Tampere",
          summary:
            "Implemented an Azure OpenAI (GPT-4) chat app with a Mantine/React frontend, Flask REST APIs and Cosmos DB persistence.",
          bullets: [
            "Designed and documented REST endpoints for internal tools so teams could consume and maintain them faster",
            "Built GitHub Actions workflows (lint/test/build) to keep pull requests healthy and releases predictable",
            "Co-led discussions around API structure, data models and deployment, sharpening my production-grade intuition"
          ],
          tech: ["React", "Vite", "Mantine", "Flask", "REST", "Cosmos DB", "Azure OpenAI", "GitHub Actions"],
          readiness: "Owns CI/CD and releases",
          feedback: {
            label: "Management's feedback",
            quote: "Eetu demonstrated strong dedication, initiative and collaboration throughout the internship.",
          },
        },
        {
          company: "Peliporukka RP Ry",
          role: "Developer Intern — Infra, Web & Games",
          period: "12/2024 – 02/2025",
          location: "Tampere",
          summary:
            "Maintained Linux/Windows servers, shipped internal tools and learned the full path from code to Kubernetes production.",
          bullets: [
            "Configured DDoS protection and routine server maintenance while keeping uptime steady",
            "Deployed websites and APIs into Kubernetes with baseline monitoring and logging in place",
            "Built internal tools in Lua and TypeScript (React/Svelte) backed by MariaDB/MySQL while helping standardize CI/CD"
          ],
          tech: ["Kubernetes", "Linux", "Windows", "Lua", "React", "Svelte", "TypeScript", "MariaDB", "MySQL", "GitHub"],
          feedback: {
            label: "Management's feedback",
            quote: "Eetu handled infra and web tasks carefully, asked for feedback and kept timelines on track.",
          },
        },
      ],
    },
    contact: {
      eyebrow: "Let’s talk roles",
  title: "Looking for a full-stack engineer?",
      description:
        "Looking for someone who can ship UI, APIs and automation as one package? I’m actively open to opportunities and reply within the same day.",
      methods: [
        {
          label: "Phone",
          value: CONTACT_PHONE_DISPLAY,
          hint: "Call or drop a WhatsApp message; I respond fast",
          actionLabel: "Call now",
          href: `tel:${CONTACT_PHONE_VALUE}`,
        },
        {
          label: "Email",
          value: CONTACT_EMAIL,
          hint: "Send an email, I will contact you back shortly",
          actionLabel: "Write an email",
          href: `mailto:${CONTACT_EMAIL}`,
          copyLabel: "Copy address",
          copySuccessLabel: "Copied!",
          copyValue: CONTACT_EMAIL,
        },
      ],
      socialsLabel: "Stay connected",
      socials: [
        { label: "GitHub", username: GITHUB_USERNAME, href: GITHUB_URL },
        { label: "LinkedIn", username: LINKEDIN_USERNAME, href: LINKEDIN_URL },
      ],
    },
  },
};

const socialLinks: SocialLink[] = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
];

const resolveLocale = (value: string | null | undefined): Locale | null => {
  if (value === "fi" || value === "en") {
    return value;
  }
  return null;
};

const getLanguageFromSearch = (search: string): Locale | null => {
  const params = new URLSearchParams(search);
  return resolveLocale(params.get(LANGUAGE_PARAM));
};

const getInitialLanguage = (): Locale => {
  if (typeof window !== "undefined") {
    const fromUrl = getLanguageFromSearch(window.location.search);
    if (fromUrl) {
      return fromUrl;
    }
    const stored = resolveLocale(window.localStorage.getItem("portfolio-language"));
    if (stored) {
      return stored;
    }
  }
  return "fi";
};

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem("portfolio-theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
};

function App() {
  const [language, setLanguage] = useState<Locale>(getInitialLanguage);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("portfolio-language", language);
    const url = new URL(window.location.href);
    url.searchParams.set(LANGUAGE_PARAM, language);
    window.history.replaceState({}, "", url);
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handlePopState = () => {
      const fromUrl = getLanguageFromSearch(window.location.search);
      if (fromUrl && fromUrl !== language) {
        setLanguage(fromUrl);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [language]);

  const content = useMemo(() => copy[language], [language]);

  const languageToggleLabel =
    language === "fi" ? "Switch to English" : "Vaihda suomeksi";

  const themeToggleLabel =
    language === "fi"
      ? theme === "dark"
        ? "Vaihda vaaleaan tilaan"
        : "Vaihda tummaan tilaan"
      : theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0F1113] via-[#181B1E] to-[#0F1113] text-[#F2F4F6]"
          : "bg-gradient-to-b from-[#f8f6f2] via-[#f2ebe1] to-[#f9f5ee] text-[#2B3947]"
      }`}
    >
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeToggle={() =>
          setTheme((prev) => (prev === "dark" ? "light" : "dark"))
        }
        links={content.nav.links}
        languageToggleLabel={languageToggleLabel}
        themeToggleLabel={themeToggleLabel}
        socials={socialLinks}
      />
      <Hero key={content.hero.headline} content={content.hero} />
      <ProjectsSection content={content.projects} />
      <ExperienceSection content={content.experience} />
      <ContactSection content={content.contact} />
    </div>
  );
}

export default App;
