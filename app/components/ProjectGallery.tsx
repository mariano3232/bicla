"use client"

import { useState } from "react"

const PROJECTS = [
  { src: "/kiosco.png", className: "bg-amber-100" },
  { src: "/revista.png", className: "border" },
  { src: "/zrn.png", className: "border" },
  { src: "/retina.png", className: "border bg-black" },
]

export default function ProjectGallery() {
  const [selected, setSelected] = useState(PROJECTS[0].src)

  return (
    <section id="proyectos" className="mx-20 mt-10">
      <div className="flex justify-end">
        <p>Proyectos exitosos</p>
      </div>
      <div className="mt-5 flex justify-between">
        {PROJECTS.map((project) => (
          <button
            key={project.src}
            type="button"
            onClick={() => setSelected(project.src)}
            className="cursor-pointer"
          >
            <img
              src={project.src}
              alt=""
              className={`h-[155px] w-[323px] ${project.className}`}
            />
          </button>
        ))}
      </div>
      <img src={selected} alt="" className="my-10 h-[480px] w-full border object-cover" />
    </section>
  )
}
