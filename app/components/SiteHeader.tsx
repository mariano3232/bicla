"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import { useGame } from "../context/GameContext";

const NAV_ITEMS = [
  { label: "Inicio", id: "inicio" },
  { label: "Proyectos", id: "proyectos" },
  { label: "Servicios", id: "servicios" },
  { label: "Contacto", id: "contacto" },
] as const;

const SECTION_LABELS: Record<string, string> = {
  inicio: "Inicio",
  // modalidad: "Modalidad",
  proyectos: "Proyectos",
  servicios: "Servicios",
  contacto: "Contacto",
};

const TRACKED_SECTIONS = Object.keys(SECTION_LABELS);

function MenuIcon({ open }: { open: boolean }) {
  const line =
    "absolute left-0 block h-[1.5px] w-4 bg-current transition-[transform,opacity] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

  return (
    <span className="relative block h-[11px] w-4" aria-hidden="true">
      <span className={`${line} top-0 ${open ? "translate-y-[4.75px] rotate-45" : ""}`} />
      <span className={`${line} top-[4.75px] ${open ? "opacity-0" : "opacity-100"}`} />
      <span className={`${line} top-[9.5px] ${open ? "-translate-y-[4.75px] -rotate-45" : ""}`} />
    </span>
  );
}

function SectionMarker({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1">
      (<img src="/enter.png" alt="" className="h-[10px]" />
      {label})
    </span>
  );
}

export default function SiteHeader() {
  const { gameStatus } = useGame();
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("inicio");
  const [showDivider, setShowDivider] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktopNav, setIsDesktopNav] = useState<boolean | null>(null);

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    const header = headerRef.current;
    if (!target || !header) return;

    const offset = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setMenuOpen(false);
    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduceMotion ? "auto" : "smooth",
    });
    history.pushState(null, "", `#${id}`);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktopNav(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !TRACKED_SECTIONS.includes(hash)) return;

    requestAnimationFrame(() => {
      scrollToSection(hash);
    });
  }, [scrollToSection]);

  useEffect(() => {
    const sections = TRACKED_SECTIONS.map((id) =>
      document.getElementById(id),
    ).filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          );

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const nav = document.querySelector("header nav");
    if (!hero || !(nav instanceof HTMLElement)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowDivider(entry.isIntersecting);
      },
      {
        rootMargin: `-${nav.offsetHeight}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      const header = headerRef.current;
      if (
        header &&
        event.target instanceof Node &&
        !header.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    const media = window.matchMedia("(min-width: 768px)");
    const onMediaChange = () => {
      if (media.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    media.addEventListener("change", onMediaChange);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      media.removeEventListener("change", onMediaChange);
    };
  }, [menuOpen]);

  const isPlaying =
    gameStatus === "playing" || gameStatus === "starting";

  const selectedLabel = isPlaying
    ? "Playbicla"
    : SECTION_LABELS[activeSection] ?? "Inicio";

  const visibleNavItems = isPlaying
    ? NAV_ITEMS
    : NAV_ITEMS.filter(({ id }) => id !== activeSection);

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-99 isolate w-full bg-[#B8F5EE]"
    >
      <nav className="relative z-10 font-mono">
        <div data-nav-bar className="flex h-[51px] items-center justify-between px-5 md:px-10 xl:px-20">
          <h1 className="font-sans text-[14px] font-medium md:text-[16px]">
            Bicla:diseñoweb
          </h1>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-nav-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>

          <ul
            className="hidden items-center gap-10 text-[15px] md:flex"
            {...(isDesktopNav === false ? { inert: true } : {})}
          >
            {visibleNavItems.map(({ label, id }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(event) => onNavigate(event, id)}>
                  {label}
                </a>
              </li>
            ))}
            <li className="flex items-center px-[10px]">
              <SectionMarker label={selectedLabel} />
            </li>
          </ul>
        </div>

        <div
          id="site-nav-menu"
          className={`grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="min-h-0 overflow-hidden" inert={!menuOpen}>
            <ul
              className={`mx-5 flex flex-col items-end border-t border-black-text py-2 text-[14px] transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${menuOpen ? "opacity-100" : "opacity-0"}`}
            >
              {visibleNavItems.map(({ label, id }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex min-h-11 items-center"
                    onClick={(event) => onNavigate(event, id)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="absolute left-4 top-15 flex min-h-11 items-center">
                <SectionMarker label={selectedLabel} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showDivider && (
        <div className="mx-5 h-px bg-black-text md:mx-10 xl:mx-20" />
      )}
    </header>
  );
}
