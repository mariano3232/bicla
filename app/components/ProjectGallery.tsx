"use client"
import { useEffect, useState } from "react"
import { PROJECTS } from "../consts";
import FollowEye from "./FollowEye";
import ScrambleText from "./ScrambleText";
import { VideoPlayer } from "./VideoPlayer";

export default function ProjectGallery() {
  const [selected, setSelected] = useState(PROJECTS[0])
  const [retinaMouse, setRetinaMouse] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setRetinaMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section id="proyectos" className="mx-5 md:mx-10 xl:mx-20">
      <div className="mb-12 flex justify-end">
        <p>Proyectos</p>
      </div>
      <div className="mb-16 mt-5 grid grid-cols-2 gap-4 xl:mb-30 xl:flex xl:justify-between xl:gap-6">
        {PROJECTS.filter(e=>e.name !== "RetinaType").map((project,i) => (
          <button
            key={project.mini}
            type="button"
            onClick={() => setSelected(project)}
            className="min-w-0 cursor-pointer xl:w-full xl:max-w-[296px]"
          >
            <img
              src={project.mini}
              alt=""
              className={`aspect-[296/142] h-auto w-full object-cover transition-opacity duration-500 xl:h-[142px] xl:aspect-auto ${selected === project ? "opacity-100" : "opacity-70"}`}
            />
            <div className="flex text-[14px] mt-3 justify-between font-mono">
              <p>{project.type}</p>
              <p>{"0" + (i+1)}</p>
            </div>
          </button>
        ))}
        <button
          type="button"
          onClick={() => setSelected(PROJECTS[3])}
          className="relative min-w-0 cursor-pointer xl:w-full xl:max-w-[300px]"
        >
          <div className="relative">
            <FollowEye className="absolute top-[45.8%] left-[17%] border border-red-" mouse={retinaMouse} />
            <FollowEye className="absolute top-[52.8%] right-[22.7%] border border-red-" mouse={retinaMouse} />
            <img
              src="/retina.png"
              alt=""
              className="aspect-[300/142] h-auto w-full border-2 border-black object-cover transition-opacity duration-500 xl:h-[142px] xl:aspect-auto"
            />
          </div>
          <div className="flex text-[15px] mt-3 justify-between font-mono">
            <p>Web móvil</p>
            <p>04</p>
          </div>
          </button>
      </div>

      <div className="relative my-14 aspect-[16/9] max-h-[500px] w-full overflow-hidden border">
        {PROJECTS.map((project) => (
          project.video ? (
            <div
              key={project.img}
              className={`absolute inset-0 flex h-full items-center justify-center transition-opacity duration-300 ${selected === project ? "z-10 opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <VideoPlayer
                src={project.video}
                className="h-full w-auto max-w-full object-contain"
              />
            </div>
          ) : (
            <img
              key={project.img}
              src={project.img}
              alt=""
              className={`absolute inset-0 m-auto h-full w-full object-contain transition-opacity duration-300 ${selected === project ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
          )
        ))}
      </div>
      <div>
        <div className="flex flex-col gap-10 font-mono text-[15px] lg:flex-row lg:justify-between">
          <div className="flex w-full flex-col gap-8 lg:w-auto">
            <p className="max-w-[313px] text-[14px] font-light">{selected.misc}</p>
            {/* <ScrambleText className="w-[313px] font-light text-[14px]" text={selected.misc}/> */}
            <ScrambleText className="h-auto min-h-[120px] w-full lg:h-[200px] lg:w-[550px]" step={6} text={selected.description}/>
          </div>
          <div className="flex flex-col gap-1">
            {PROJECTS.map((project) => (
              <button
                key={project.mini}
                type="button"
                onClick={() => setSelected(project)}
                className={`flex items-center gap-2 cursor-pointer transition-opacity duration-500 ${selected === project ? "opacity-100" : "opacity-70"}`}
              >
                (<div className={`h-[10px] w-[10px] ${project.color}`}/>)
                <span>{project.name}</span>
              </button>
            ))}
            <p className="mt-10 font-light">{selected.duration}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
