"use client"

import { useEffect, useState } from "react"
import { PROJECTS } from "../consts";
import FollowEye from "./FollowEye";
import ScrambleText from "./ScrambleText";
import { VideoPlayer } from "./VideoPlayer";

export default function ProjectGallery() {
  const [selected, setSelected] = useState(PROJECTS[0])
  const [videoOpen, setVideoOpen] = useState(false)
  const [retinaMouse, setRetinaMouse] = useState<{ x: number; y: number } | null>(null)

  const index = Math.max(0, PROJECTS.findIndex((project) => project.id === selected.id))

  function go(delta: number) {
    const next = (index + delta + PROJECTS.length) % PROJECTS.length
    setSelected(PROJECTS[next])
  }

  useEffect(() => {
    setVideoOpen(false)
  }, [selected])

  useEffect(() => {
    const onMove = (e: MouseEvent) => setRetinaMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section id="proyectos" className="mx-5 md:mx-10 xl:mx-20">
      <div className="mb-8 flex justify-end md:mb-12">
        <p>Proyectos</p>
      </div>

      {selected.video ? (
        <VideoPlayer
          src={selected.video}
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
        />
      ) : null}

      <div className="flex flex-col gap-8 font-mono text-[13px] md:gap-10 md:text-[15px] xl:flex-row xl:items-start">
        <div className="relative w-full min-w-0 max-w-[740px] xl:flex-[1.4]">
          <img
            src={selected.img}
            alt=""
            className={`h-auto w-full ${selected.id === 4 ? "" : "border"}`}
          />
          {selected.id === 4 ? (
            <FollowEye className="absolute top-[33%] left-[46.5%]" mouse={retinaMouse} />
          ) : null}
          <button
            type="button"
            className="absolute bottom-3 left-3 h-10 w-24 cursor-pointer border bg-[#F7FDFD] text-[14px] font-medium md:h-[45px] md:w-[122px] md:text-[16px]"
            onClick={() => setVideoOpen(true)}
          >
            Ver
          </button>
        </div>

        <div className="flex min-w-0 w-full flex-col justify-between gap-6 md:gap-8 xl:my-2 xl:w-[390px] xl:shrink-0">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <ScrambleText className="text-mono text-[26px] font-medium uppercase leading-none sm:text-[32px] xl:text-[40px]" text={selected?.name} step={6}/>
              <ScrambleText className="text-mono text-[26px] font-light uppercase leading-none sm:text-[32px] xl:text-[40px]" text={"0" + selected.id} step={6}/>
            </div>
            <p className="mt-3 max-w-[390px] whitespace-pre-line text-[12px] font-light md:text-[14px]">{selected.misc}</p>
          </div>

          <ScrambleText className="w-full max-w-[393px] font-mono text-[14px] font-light leading-[20px] tracking-[1%] md:text-[15px]" step={8} text={selected.description}/>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex h-8 w-[190px] items-center justify-between border px-2">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              aria-label={project.name}
              onClick={() => setSelected(project)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center"
            >
              <div
                className={`h-[10px] w-[10px] rounded-full border transition duration-500 ${selected.id === project.id ? "bg-gray-400" : "bg-transparent"}`}
              />
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1 font-mono">
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
