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
  ],
  en: [
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
  ],
};

const copy: Record<Locale, Copy> = {
  fi: {
    nav: {
      links: [
        { label: "Etusivu", href: "#hero" },
        { label: "Projektit", href: "#projects" },
        { label: "Yhteys", href: "#contact" },
      ],
    },
    hero: {
      badge: "Viimeistelty fullstack-työ",
      availability: "Avoin uusille mahdollisuuksille",
      headline: "Hei, olen Eetu —\nFullstack-tekijä.",
      description:
        "Rakennan modernia ja viimeisteltyä frontti- ja backend-kehitystä Reactilla, TypeScriptillä ja JVM-ympäristössä. Yhdistän huolitellun käyttöliittymän, sujuvat animaatiot ja tuotantokelpoisen arkkitehtuurin — ja haen parhaillaan uutta tiimiä, jossa voin kasvattaa osaamistani.",
      primaryCta: "Katso viimeisimmät projektit",
      secondaryCta: "Ota yhteyttä",
      stats: [
        { label: "Vuotta tuotantotyötä", value: "1" },
        { label: "Julkaistua projektia", value: "6" },
        { label: "Työhakutila", value: "Avoin nyt" },
      ],
      scrollHint: "Scrollaa ja tutustu",
    },
    projects: {
      eyebrow: "Projektit",
      title: "Tuon designin, datan ja tuotekehityksen yhteen",
      description:
        "Jokainen kokonaisuus on rakennettu tuotantovalmiiksi: mittarointi, CI/CD ja dokumentaatio sisältyvät pakettiin.",
      badgeLabel: "Toteutus",
      ctaLabel: "Tutustu projektiin →",
      projects: projectData.fi,
    },
    experience: {
      eyebrow: "Kokemus",
      title: "Pienissä tiimeissä rakennettu tuotantokunto",
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
          readiness: "Valmis siirtymään FastAPIin",
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
        },
      ],
    },
    contact: {
      eyebrow: "Yhteistyö",
      title: "Onko mielessä uusi tuote, MVP tai modernisointi?",
      description:
        "Autan suunnittelemaan ja toteuttamaan kokonaisuuksia, jotka kestävät tuotantoon. Vastaan mielelläni viestiin saman päivän aikana.",
      primaryCta: { label: "Lähetä sähköposti", href: "mailto:sahkoposti@esimerkki.com" },
      secondaryCta: { label: "LinkedIn", href: "https://www.linkedin.com/" },
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
      availability: "Open for new roles",
      headline: "Hi, I'm Eetu —\na Full-stack Engineer.",
      description:
        "I craft modern frontend and backend solutions with React, TypeScript and the JVM ecosystem. I focus on refined UI, smooth motion and production-ready architecture — and I'm actively looking for a team where I can keep leveling up.",
      primaryCta: "Browse recent work",
      secondaryCta: "Reach out",
      stats: [
        { label: "Years in production", value: "1" },
        { label: "Personal launches", value: "6" },
        { label: "Availability", value: "Open now" },
      ],
      scrollHint: "Scroll to explore",
    },
    projects: {
      eyebrow: "Projects",
      title: "Blending design, data and product delivery",
      description:
        "Every engagement ships production-ready: instrumentation, CI/CD and documentation included.",
      badgeLabel: "Case study",
      ctaLabel: "View case →",
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
          readiness: "Ready for FastAPI",
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
        },
      ],
    },
    contact: {
      eyebrow: "Collaboration",
      title: "Need a new product, MVP or modernization?",
      description:
        "I help design and deliver solutions that hold up in production. Expect a reply within the same day.",
      primaryCta: { label: "Send an email", href: "mailto:sahkoposti@esimerkki.com" },
      secondaryCta: { label: "LinkedIn", href: "https://www.linkedin.com/" },
    },
  },
};

const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/ATKKepa" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
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
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-900"
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
