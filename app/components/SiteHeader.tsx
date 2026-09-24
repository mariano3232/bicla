"use client";

import { useEffect, useState } from "react";

import { useGame } from "../context/GameContext";

const NAV_ITEMS = [
  { label: "Inicio", id: "inicio" },
  { label: "Modalidad", id: "modalidad" },
  { label: "Proyectos", id: "proyectos" },
  { label: "Servicios", id: "servicios" },
  { label: "Nosotros", id: "nosotros" },
  { label: "Contacto", id: "contacto" },
] as const;

const SECTION_LABELS: Record<string, string> = {
  inicio: "Inicio",
  modalidad: "Modalidad",
  proyectos: "Proyectos",
  servicios: "Contactos",
  nosotros: "Nosotros",
  contacto: "Contacto",
};

const TRACKED_SECTIONS = Object.keys(SECTION_LABELS);

export default function SiteHeader() {
  const { gameStatus } = useGame();
  const [activeSection, setActiveSection] = useState("inicio");

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

  const selectedLabel =
    gameStatus === "playing" || gameStatus === "starting"
      ? "Playbicla"
      : SECTION_LABELS[activeSection] ?? "Inicio";

  return (
    <header className="bg-[#B8F5EE] z-10 fixed top-0 w-full">
      <nav className="flex font-mono justify-between px-10 py-6">
        <h1 className="text-[16px] font-sans font-medium">Bicla:diseñoweb</h1>
        <ul className="flex gap-10 text-[15px]">
          {NAV_ITEMS.map(({ label, id }) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
          <li className="px-[10px] flex items-center gap-1">
            (<img src="/enter.png" alt="" className="h-[10px]" />
            {selectedLabel})
          </li>
        </ul>
      </nav>
      <div className="h-px mx-10 bg-black-text" />
    </header>
  );
}
