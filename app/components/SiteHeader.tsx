"use client";

import { useEffect, useRef, useState } from "react";

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
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      {open ? (
        <path
          d="M5 5l12 12M17 5L5 17"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ) : (
        <path
          d="M3 6h16M3 11h16M3 16h16"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      )}
    </svg>
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className="fixed top-0 z-99 w-full bg-[#B8F5EE]">
      <nav className="font-mono">
        <div className="flex h-[51px] items-center justify-between px-5 md:px-10 xl:px-20">
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

          <ul className="hidden items-center gap-10 text-[15px] md:flex">
            {visibleNavItems.map(({ label, id }) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
            <li className="flex items-center px-[10px]">
              <SectionMarker label={selectedLabel} />
            </li>
          </ul>
        </div>

        <ul
          id="site-nav-menu"
          className={`${menuOpen ? "flex" : "hidden"} mx-5 flex-col border-t border-black-text py-2 text-[14px] md:hidden`}
        >
          {visibleNavItems.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex min-h-11 items-center"
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="flex min-h-11 items-center">
            <SectionMarker label={selectedLabel} />
          </li>
        </ul>
      </nav>
      {showDivider && (
        <div className="mx-5 h-px bg-black-text md:mx-10 xl:mx-20" />
      )}
    </header>
  );
}
