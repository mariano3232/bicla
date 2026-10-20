"use client"

import { useEffect, useRef, useState } from "react"
import { PROJECTS } from "../consts";
import FollowEye from "./FollowEye";
import ScrambleButton from "./ScrambleButton";
import ScrambleText from "./ScrambleText";
import { VideoPlayer } from "./VideoPlayer";

type Project = (typeof PROJECTS)[number]

function ProjectBody({
  project,
  mobile,
  retinaMouse,
  onPreview,
}: {
  project: Project
  mobile: boolean
  retinaMouse: { x: number; y: number } | null
  onPreview: () => void
}) {
  const description =
    mobile && "descriptionMobile" in project && project.descriptionMobile
      ? project.descriptionMobile
      : project.description

  return (
    <div className="flex flex-col gap-8 font-mono text-[13px] md:gap-10 md:text-[15px] xl:flex-row xl:items-stretch">
      <div className="relative w-full min-w-0 max-w-[700px] xl:flex-[1.4]">
        <img
          src={project.img}
          alt=""
          draggable={false}
          className={`h-auto w-full select-none ${project.id === 4 ? "" : "border"}`}
        />
        {project.id === 3 ? (
          <FollowEye className="absolute top-[33%] left-[46.5%]" mouse={retinaMouse} />
        ) : null}
        <button
          type="button"
          className=" md:hidden absolute bottom-3 left-3 h-10 w-20 cursor-pointer border bg-[#F7FDFD] text-[13px] md:h-[45px] md:w-[122px] md:text-[16px]"
          onClick={onPreview}
        >
          Ver
        </button>
        {"site" in project && project.site ? (
          <a
            href={project.site}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar el sitio de ${project.name}`}
            className="absolute bottom-3 right-3 flex h-10 w-10 cursor-pointer items-center justify-center border bg-[#F7FDFD] md:h-[45px] md:w-[45px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              className="h-[20px] w-[20px]"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 5 10 14" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 13.5V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4.5" />
            </svg>
          </a>
        ) : null}
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex min-w-0 w-full flex-col justify-start gap-6 md:gap-8 xl:w-[390px] xl:shrink-0 xl:self-stretch xl:mb-5">
          <div>
            <div className="hidden flex-wrap items-baseline relative bottom-1 md:flex">
              <ScrambleText className="text-mono text-[26px] font-light uppercase leading-none sm:text-[32px] xl:text-[40px]" text={"0" + project.id + ":"} step={6} />
              <ScrambleText className="text-mono text-[26px] font-regular uppercase leading-none sm:text-[32px] xl:text-[40px]" text={project.name} step={6} />
            </div>
            <p className="mt-3 max-w-[375px] tracking-[-2%] text-justify whitespace-pre-line text-[12px] font-light md:text-[14px]">
              <span className="font-medium uppercase md:hidden">{`0${project.id}:${project.name} / `}</span>
              {project.misc}
            </p>
          </div>

          <ScrambleText
            className="w-full max-w-[375px] font-mono text-[12px] font-light leading-[20px] tracking-[0%] md:text-[15px]"
            step={8}
            text={description}
          />
        </div>
        <ScrambleButton
          text="Vista previa"
          className="hidden md:block h-10 w-full tracking-[3%] text-[14px] font-mono mt-8 mb-2 md:mt-0 md:mb-0 md:h-[45px] md:text-[16px]"
          onClick={onPreview}
        />
      </div>
    </div>
  )
}

export default function ProjectGallery() {
  const [selected, setSelected] = useState(PROJECTS[0])
  const [videoOpen, setVideoOpen] = useState(false)
  const [retinaMouse, setRetinaMouse] = useState<{ x: number; y: number } | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const skipVideoClose = useRef(false)
  const scrollTimer = useRef<number | null>(null)

  const index = Math.max(0, PROJECTS.findIndex((project) => project.id === selected.id))

  function scrollTrackTo(next: number) {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" })
  }

  function go(delta: number) {
    const next = (index + delta + PROJECTS.length) % PROJECTS.length
    setSelected(PROJECTS[next])
    scrollTrackTo(next)
  }

  function selectProject(project: Project) {
    const next = PROJECTS.findIndex((item) => item.id === project.id)
    setSelected(project)
    if (next >= 0) scrollTrackTo(next)
  }

  function openPreview(project: Project) {
    if (project.id !== selected.id) skipVideoClose.current = true
    setSelected(project)
    setVideoOpen(true)
  }

  function syncFromScroll() {
    if (scrollTimer.current) window.clearTimeout(scrollTimer.current)
    scrollTimer.current = window.setTimeout(() => {
      const track = trackRef.current
      if (!track || track.clientWidth === 0) return
      const next = Math.min(
        PROJECTS.length - 1,
        Math.max(0, Math.round(track.scrollLeft / track.clientWidth)),
      )
      const project = PROJECTS[next]
      if (project.id !== selected.id) setSelected(project)
    }, 80)
  }

  useEffect(() => {
    if (skipVideoClose.current) {
      skipVideoClose.current = false
      return
    }
    setVideoOpen(false)
  }, [selected])

  useEffect(() => {
    const onMove = (e: MouseEvent) => setRetinaMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current)
    }
  }, [])

  return (
    <section className="mx-2 mx-5 md:mx-10 xl:mx-20">

      {selected.video ? (
        <VideoPlayer
          src={selected.video}
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
        />
      ) : null}

      <div
        ref={trackRef}
        onScroll={syncFromScroll}
        className="flex snap-x snap-mandatory items-start overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
      >
        {PROJECTS.map((project) => (
          <div key={project.id} className="w-full shrink-0 basis-full snap-start">
            <ProjectBody
              project={project}
              mobile
              retinaMouse={retinaMouse}
              onPreview={() => openPreview(project)}
            />
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <ProjectBody
          project={selected}
          mobile={false}
          retinaMouse={retinaMouse}
          onPreview={() => openPreview(selected)}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex h-8 w-[140px] md:w-[190px] items-center justify-between border px-2">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              aria-label={project.name}
              onClick={() => selectProject(project)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center"
            >
              <div
                className={`h-[10px] w-[10px] rounded-full border transition duration-500 ${selected.id === project.id ? "bg-gray-400" : "bg-transparent"}`}
              />
            </button>
          ))}
        </div>

        <div className=" flex items-center gap-1 font-mono">
          <button
            type="button"
            aria-label="Proyecto anterior"
            onClick={() => go(-1)}
            className="cursor-pointer px-2 py-2 text-[20px] leading-none"
          >
            ←
          </button>
          <span className="min-w-[4.5rem] text-center text-[13px] font-light">
            {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Proyecto siguiente"
            onClick={() => go(1)}
            className="cursor-pointer px-2 py-2 text-[20px] leading-none"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
