"use client";

import { useEffect, useState } from "react";

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

export default function SiteHeader() {
  const { gameStatus } = useGame();
  const [activeSection, setActiveSection] = useState("inicio");
  const [showDivider, setShowDivider] = useState(true);

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

  const isPlaying =
    gameStatus === "playing" || gameStatus === "starting";

  const selectedLabel = isPlaying
    ? "Playbicla"
    : SECTION_LABELS[activeSection] ?? "Inicio";

  const visibleNavItems = isPlaying
    ? NAV_ITEMS
    : NAV_ITEMS.filter(({ id }) => id !== activeSection);

  return (
    <header className="fixed top-0 z-99 w-full bg-[#B8F5EE]">
      <nav className="flex flex-col gap-2 px-5 py-2 font-mono md:h-[51px] md:flex-row md:items-center md:justify-between md:px-10 md:py-0 xl:px-20">
        <h1 className="font-sans text-[16px] font-medium">Bicla:diseñoweb</h1>
        <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] md:gap-10 md:text-[15px]">
          {visibleNavItems.map(({ label, id }) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
          <li className="flex items-center gap-1 md:px-[10px]">
            (<img src="/enter.png" alt="" className="h-[10px]" />
            {selectedLabel})
          </li>
        </ul>
      </nav>
      {showDivider && <div className="mx-5 h-px bg-black-text md:mx-10 xl:mx-20" />}
    </header>
  );
}
