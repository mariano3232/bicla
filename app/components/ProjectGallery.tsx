"use client"

import { useState } from "react"

const PROJECTS = [
  {
    name: "Super Kiosco el 11",
    color: "bg-[#3C4AAB]",
    mini: "/kiosco.png",
    img: "/bigkiosco.png",
    className: "bg-amber-100",
    misc: "DISEÑO WEB 01/ DESARROLLO 02 / PANEL DE ADMINISTRACIÓN 03 / RESPONSIVE 04",
    description: "Una web pensada para celulares, desarrollada para darle mayor visibilidad al lugar y comunicar sus nuevos productos, descuentos y promociones. Además de la landing, desarrollamos un panel de administración que permite actualizar precios, imágenes y contenido sin depender de nosotros.",
    duration: "·2 semanas de desarrollo.",
  },
  {
    name: "ZRN Comercio Exterior",
    color: "bg-[#98BCCF]",
    mini: "/revista.png",
    img: "/bigrevista.png",
    className: "border",
    misc: "BRANDING 01/ IDENTIDAD VISUAL 02 / DISEÑO WEB 03 / RESPONSIVE 04",
    description: "Un proyecto integral para una empresa de comercio exterior. Desarrollamos la identidad de la marca, desde el concepto y la creación del logo hasta su sistema visual, y la llevamos a una landing de tres pantallas con animaciones y sistemas de imágenes.",
    duration: "·3 semanas de desarrollo.",
  },
  {
    name: "Aurea Digital",
    color: "bg-[#A92F26]",
    mini: "/zrn.png",
    img: "/bigzrn.png",
    className: "border",
    misc: "DISEÑO WEB 01/ UX/UI 02 / ANIMACIÓN 03 / INTERACCIÓN 04",
    description: "Un prototipo de revista digital pensado para explorar nuevas formas de llevar el diseño editorial a la web. Diseñamos un sitio de varias pantallas con animaciones simples y complejas, combinando contenido, navegación e interacción.",
    duration: "·Proyecto de diseño.",
  },
  {
    name: "RetinaType",
    color: "bg-[#EE7900]",
    mini: "/retina.png",
    img: "/bigretina.png",
    className: "border bg-black",
    misc: "APLICACIÓN 01/ UX/UI 02 / ANIMACIÓN 03 / INTERACCIÓN 04",
    description: "Un prototipo de aplicación web para explorar y descargar tipografías. Desarrollamos su identidad visual, interfaz, iconografía y sistema de señalética para mostrar cómo podría funcionar el proyecto como producto digital.",
    duration: "·Proyecto de diseño.",
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
      </div>
      <div className="relative my-14 h-[695px] w-full border">
        {PROJECTS.map((project) => (
          <img
            key={project.img}
            src={project.img}
            alt=""
            className={`absolute inset-0 h-[695px] w-full object-cover transition-opacity duration-500 ${selected === project ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      <div>
        <div className="text-[15px] font-mono flex justify-between">
          <div className="flex flex-col gap-8 w-[313px]">
            <p className="w-[313px] font-light text-[14px]">{selected.misc}</p>
            <p className="w-[550px] ">{selected.description}</p>
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
