"use client"
import { useEffect, useState } from "react"
import { PROJECTS } from "../consts";
import FollowEye from "./FollowEye";
import ScrambleText from "./ScrambleText";



export default function ProjectGallery() {
  const [selected, setSelected] = useState(PROJECTS[0])
  const [retinaMouse, setRetinaMouse] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setRetinaMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  

  return (
    <section id="proyectos" className="mx-20">
      <div className="flex justify-end mb-12">
        <p>Proyectos exitosos</p>
      </div>
      <div className="mt-5 flex justify-between">
        {PROJECTS.map((project) => (
          <button
            key={project.mini}
            type="button"
            onClick={() => setSelected(project)}
            className="cursor-pointer"
          >
            <img
              src={project.mini}
              alt=""
              className={`h-[142px] w-[296px] transition-opacity duration-500 ${project.className} ${selected === project ? "opacity-100" : "opacity-70"}`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setSelected(PROJECTS[3])}
          className="cursor-pointer relative border"
        >
          <FollowEye className="absolute top-[65px] left-[46px]" mouse={retinaMouse} />
          <FollowEye className="absolute top-[75px] right-[63px]" mouse={retinaMouse} />
          <img
            src="/retina.png"
            alt=""
            className={`h-[142px] border-2 border-black w-[296px] transition-opacity duration-500`}
          />
          </button>
      </div>

      <div className="relative my-14 h-[695px] w-full border">
        {PROJECTS.map((project) => (
          <img
            key={project.img}
            src={project.img}
            alt=""
            className={`absolute inset-0 h-full m-auto transition-opacity duration-500 ${selected === project ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      <div>
        <div className="text-[15px] font-mono flex justify-between">
          <div className="flex flex-col gap-8 w-[313px]">
            <p className="w-[313px] font-light text-[14px]">{selected.misc}</p>
            {/* <ScrambleText className="w-[313px] font-light text-[14px]" text={selected.misc}/> */}
            <ScrambleText className="w-[550px] h-[200px]" step={6} text={selected.description}/>
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
            <p className="mt-10">{selected.duration}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
