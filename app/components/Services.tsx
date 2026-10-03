import type { ReactNode } from "react"

function ServiceItem({
  name,
  number,
  image,
  description,
  wide = false,
  headerClass = "",
  textClass = "",
  extra = null,
}: {
  name: string
  number: string
  image: ReactNode
  description: string
  wide?: boolean
  headerClass?: string
  textClass?: string
  extra?: ReactNode
}) {
  return (
    <div className={wide ? "w-[544px]" : "w-[268px]"}>
      <div className={["flex justify-between uppercase", headerClass].filter(Boolean).join(" ")}>
        <p>{name}</p>
        <p>{number}</p>
      </div>
      {image}
      <div className={["relative mt-[23px] h-[138px] border border-black-text px-3 pt-[18px] leading-[20px] tracking-[-0.02em]", textClass].filter(Boolean).join(" ")}>
        <p>{description}</p>
        {extra}
      </div>
    </div>
  )
}

const narrowImage = "mt-[11px] h-[306px] w-[265px] border border-black-text"
const wideImage = "mt-[11px] h-[306px] w-full border border-black-text object-cover"

export default function Services() {
  return (
    <section id="servicios" className="mx-20">
      <div className="mx-auto w-full max-w-[1440px]">
      <div className="flex justify-end mb-25">
        <p>Servicios</p>
      </div>
      <div className="flex flex-col gap-y-[51px] font-mono text-[15px]">
        <div className="flex justify-between">
          <ServiceItem
            name="Identidad/Branding"
            number="01"
            image={<img src="/gif/ZRN.gif" className={narrowImage} />}
            description="Construimos la identidad de tu marca, desde el concepto y la comunicación hasta su sistema visual. (paleta de colores, tono de voz, etc)"
          />
          <ServiceItem
            name="Diseño Web"
            number="02"
            wide
            image={<img src="/gif/diseñoweb.gif" className={wideImage} />}
            description="Diseño de sitios personalizados desde 0, combinando estética, funcionalidad y adaptados a las necesidades de la marca"
          />
          <ServiceItem
            name="Re-diseños"
            number="03"
            image={<img src="/gif/rediseño.gif" className={narrowImage} />}
            description="Actualizamos y transformamos sitios existentes para adaptarlos a nuevas necesidades."
          />
        </div>
        <div className="flex justify-between">
          <ServiceItem
            name="animación web"
            number="04"
            wide
            image={<img src="/gif/AnimacionWEB.gif" className={wideImage} />}
            description="Damos movimiento a tu sitio a través de animaciones simples o complejas para hacerlo dinámico (Hover, efectos visuales, etc.)"
          />
          <ServiceItem
            name="UX / UI"
            number="05"
            image={
              <div className="relative mt-[11px] h-[306px] w-[265px] border border-black-text bg-[#F3F3F6]">
                <div className="absolute top-[6%] left-[11%] h-[85%] w-[81%] overflow-hidden">
                  <img src="/gif/uxui.gif" className="absolute top-[-34.82%] left-[-22.63%] h-[191.16%] w-[145.79%] max-w-none" />
                </div>
              </div>
            }
            description="Diseñamos interfaces intuitivas y experiencias de usuario pensadas para que navegar sea simple."
          />
          <ServiceItem
            name="Hosting y Dominio"
            number="06"
            image={<img src="/gif/online.gif" className={narrowImage} />}
            description="Ponemos tu sitio online y nos ocupamos de que funcione correctamente. (Dominio, hosting, instalación, etc.)"
          />
        </div>
        <div className="flex justify-between">
          <ServiceItem
            name="Optimización y SEO"
            number="07"
            image={<img src="/gif/construction.webp" className={narrowImage} />}
            description="Optimizamos tu sitio para que los buscadores puedan entenderlo y encontrarlo."
          />
          <ServiceItem
            name="Kit Instagram"
            number="08"
            wide
            headerClass="w-[268px]"
            textClass="w-full"
            image={<img src="/gif/construction.webp" className="mt-[11px] h-[306px] w-full border border-black-text" />}
            description="Diseñamos la presencia visual de tu marca en IG. (Feed, destacadas, foto de perfil,adaptados a tus necesidades.)"
            extra={<p className="absolute right-2 bottom-2 text-[10px] leading-[13px] tracking-[-0.02em] underline">*Servicio<br/>adicional</p>}
          />
          <ServiceItem
            name="Optimización y SEO"
            number="09"
            image={<img src="/gif/construction.webp" className={narrowImage} />}
            description="Optimizamos tu sitio para que los buscadores puedan entenderlo y encontrarlo."
          />
        </div>
      </div>
      </div>
    </section>
  )
}
