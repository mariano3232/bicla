import type { ReactNode } from "react"

function ServiceItem({
  name,
  number,
  image,
  imageMobile = null,
  description,
  descriptionMobile = "",
  wide = false,
  extra = null,
}: {
  name: string
  number: string
  image: ReactNode
  imageMobile?: ReactNode
  description: string
  descriptionMobile?: string
  wide?: boolean
  extra?: ReactNode
}) {
  return (
    <div className={wide ? "w-full min-w-0 md:col-span-2 xl:w-[544px]" : "w-full min-w-0 xl:w-[268px]"}>
      <div className="flex justify-between uppercase">
        <p>{name}</p>
        <p>{number}</p>
      </div>
      {imageMobile ? <div className="md:hidden">{imageMobile}</div> : null}
      <div className={imageMobile ? "hidden md:block" : undefined}>{image}</div>
      <div className="relative mt-3 flex min-h-[96px] flex-col border border-black-text px-3 pt-3 pb-2 text-[12px] leading-[16px] tracking-[-2%] md:mt-[23px] md:min-h-[138px] md:pt-[18px] md:text-[15px] md:leading-[20px] xl:h-[138px]">
        <p className={`min-w-[245px] max-w-[468px] whitespace-normal hidden md:block md:whitespace-pre-line${extra ? " leading-[18px]" : ""}`}>{description}</p>
        <p className={`min-w-[245px] max-w-[468px] whitespace-normal md:hidden md:whitespace-pre-line${extra ? " leading-[18px]" : ""}`}>{descriptionMobile || description}</p>
        {extra ? <div className="mt-auto self-end">{extra}</div> : null}
      </div>
    </div>
  )
}

const narrowImage = "mt-[11px]  w-full border border-black-text object-cover md:h-[306px] xl:w-[265px]"
const wideImage = "mt-[11px]  w-full border border-black-text object-cover md:h-[306px]"

export default function Services() {
  return (
    <section className="mx-5 md:mx-10 xl:mx-20">
      <div className="mx-auto w-full max-w-[1440px]">
      <div className="flex flex-col gap-y-[51px] font-mono text-[13px] md:text-[15px]">
        <div className="grid grid-cols-1 gap-y-[51px] md:grid-cols-2 md:gap-x-6 xl:flex xl:justify-between">
          <ServiceItem
            name="Identidad/Branding"
            number="01"
            image={<img src="/gif/ZRN.gif" className={narrowImage + " px-6"} />}
            description="Construimos la identidad de tu marca, desde el concepto y la comunicación hasta su sistema visual para darle una imagen propia."
          />
          <ServiceItem
            name="Diseño Web"
            number="02"
            wide
            image={<img src="/gif/diseñoweb.gif" className={wideImage} />}
            description="Diseño de sitios personalizados desde 0, combinando estética, funcionalidad y una experiencia pensada para adaptarse a las necesidades de cada marca."
            descriptionMobile="Diseño de sitios desde 0, combinando estética, funcionalidad y una experiencia pensada para adaptarse a las necesidades de cada marca."
          />
          <ServiceItem
            name="Re-diseños"
            number="03"
            image={<img src="/gif/rediseño.gif" className={narrowImage} />}
            // imageMobile={<img src="/gif/rediseñoMobile.gif" className={narrowImage} />}
            description="Actualizamos tu sitio web para adaptarlo a nuevas necesidades, mejorando su diseño y estructura."
            descriptionMobile="Actualizamos tu sitio para adaptarlo a nuevas necesidades, mejorando su diseño y estructura para ofrecer una experiencia mas clara."
          />
        </div>
        <div className="grid grid-cols-1 gap-y-[51px] md:grid-cols-2 md:gap-x-6 xl:flex xl:justify-between">
          <ServiceItem
            name="animación web"
            number="04"
            wide
            image={<img src="/gif/AnimacionWEB.gif" className={wideImage} />}
            description={"Damos movimiento a tu sitio a través de animaciones simples o complejas para hacerlo dinámico\n(Hover, efectos visuales, etc.)"}
          />
          <ServiceItem
            name="UX / UI"
            number="05"
            image={<img src="/gif/UXUIFINAL.gif" className={narrowImage} />}
            description="Interfaces intuitivas y experiencias de usuario pensadas para navegar de forma simple."
          />
          <ServiceItem
            name="Hosting y Dominio"
            number="06"
            image={<img src="/gif/online.gif" className={"border-0 " + narrowImage} />}
            imageMobile={<img src="/gif/onlineMobile.gif" className={narrowImage} />}
            description={'Ponemos tu sitio online,\nnos ocupamos de que funcione y este listo para recibir usuarios.'}
          />
        </div>
        <div className="grid grid-cols-1 gap-y-[51px] md:grid-cols-2 md:gap-x-6 xl:flex xl:justify-between">
          <ServiceItem
            name="Kit Instagram"
            number="07"
            image={<img src="/gif/ig.gif" className={narrowImage + " object-cover"} />}
            description="Diseñamos la presencia visual de tu marca en IG. (Feed, destacadas, foto de perfil)"
            extra={<p className="text-[10px] leading-[13px] tracking-[-0.02em] underline">*Servicio adicional</p>}
          />

          <ServiceItem
            name="Optimización y SEO"
            number="08"
            wide
            image={<img src="/gif/seobig.gif" className={wideImage} />}
            description="Optimizamos tu sitio para que los buscadores puedan entenderlo, encontrarlo y mostrarlo de manera más efectiva en sus resultados."
          />
          
          <ServiceItem
            name="Desarrollo a medida"
            number="09"
            image={<img src="/gif/desarrollointegral.gif" className={narrowImage} />}
            description="Creamos soluciones adaptadas a las necesidades de cada proyecto. (Paneles de admin, formularios, etc.)"
            descriptionMobile="Creamos soluciones adaptadas a las necesidades de cada proyecto. (Paneles de administración, formularios, etc.)"
          />
        </div>
      </div>
      </div>
    </section>
  )
}
