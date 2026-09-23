"use client"

import { useState } from "react"

const PROJECTS = [
  {
    src: "/kiosco.png",
    className: "bg-amber-100",
    description1:"Una web pensada para celulares, desarrollada para darle mayor visibilidad al lugar y comunicar sus nuevos productos, descuentos y promociones." ,
    description2:"Además de la landing, desarrollamos un panel de administración que permite actualizar precios, imágenes y contenido sin depender de nosotros. Fue nuestro primer proyecto como Bicla y lo desarrollamos en aproximadamente dos semanas",
  },
  {
    src: "/revista.png",
    className: "border",
    description:"" 
  },
  {
    src: "/zrn.png",
    className: "border",
    description:""
  },
  { 
    src: "/retina.png",
    className: "border bg-black",
    description:""
  },
]

export default function ProjectGallery() {
  const [selected, setSelected] = useState(PROJECTS[0])

  return (
    <section id="proyectos" className="mx-20">
      <div className="flex justify-end mb-12">
        <p>Proyectos exitosos</p>
      </div>
      <div className="mt-5 flex justify-between">
        {PROJECTS.map((project) => (
          <button
            key={project.src}
            type="button"
            onClick={() => setSelected(project)}
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
      <img src={selected.src} alt="" className="my-10 h-[480px] w-full border object-cover" />
      <div>
        <div className="text-[15px] font-mono">
          <div className="flex justify-between w-full items-end mb-10">
            <p className="w-[590px] ">{selected.description1}</p>
            <p className="w-[240px] font-light text-[14px]">02 / WEB 02 / IDENTIDAD 03 / REDISEÑO 01 / WEB 02 </p>
          </div>
          <p className="w-[590px]">{selected.description2}</p>
        </div>
      </div>
    </section>
  )
}
