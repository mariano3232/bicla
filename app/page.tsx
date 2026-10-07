import LiveClock from "./components/LiveClock"
import StackingSteps from "./components/StackingSteps"
import { benefits, steps } from "./consts"
import Hero from "./components/Hero";
import ProjectGallery from "./components/ProjectGallery"
import SiteHeader from "./components/SiteHeader";
import { GameProvider } from "./context/GameContext";
import ContactForm from "./components/ContactForm";
import Services from "./components/Services";

export default function Home() {
  return (
    <GameProvider>
      <SiteHeader />

      <main className="flex flex-col">
        <div className="grid xl:grid-cols-[1fr_max-content_1fr]">
        <Hero/>
        <section className="px-5 md:px-10 xl:col-start-2 xl:px-0">
          <p className="my-12 w-full max-w-[561px] font-mono text-[13px] font-light md:my-24 md:text-base xl:my-30 xl:ml-3">
            Somos un estudio de diseño digital que crea marcas, sitios web y proyectos digitales.
            Nos gusta pensar ideas, darles una forma y llevarlas a la pantalla. Trabajamos cada proyecto de manera integral, desde el concepto y la identidad hasta el diseño y desarrollo.
          </p>
        </section>
        </div>

        {/* SEPARADOR */}
        <div className="mx-5 mb-5 mt-10 h-[1px] bg-black-text md:mx-10 xl:mx-20"></div>

        <div className="mx-5 mb-10 flex justify-end font-mono text-[14px] md:mx-10 xl:mx-20">
          <p>¿Por qué contratarnos?</p>
        </div>

        <section id="inicio" className="mx-5 grid grid-cols-1 gap-x-8 gap-y-15 font-mono sm:grid-cols-2 md:mx-10 xl:mx-20 xl:grid-cols-4 xl:gap-x-40">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex w-full flex-col gap-3 items-center text-center md:text-start md:items-start">
              <img src={benefit.img} alt="" className="mb-2 h-[60px] w-fit md:mb-4 md:h-[80px]" />
              <h3 className="text-[16px] font-medium whitespace-pre-line md:text-[20px]">
                {benefit.title}
              </h3>
              <p className="w-max whitespace-pre-line text-[12px] leading-[18px] md:text-[14px] md:leading-[18px]">{benefit.description}</p>
            </div>
          ))}
        </section>
        {/* SEPARADOR */}
        <div className="mx-5 mb-5 mt-16 h-[1px] bg-black-text md:mx-10 xl:mx-20 xl:mt-30"></div>
        <div className="mx-5 flex justify-end md:mx-10 xl:mx-20">
          <p>Paso a paso</p>
        </div>
        
        <StackingSteps steps={steps} />
        
        {/* SEPARADOR */}
        <div className="mx-5 mb-5 mt-0 h-[1px] bg-black-text md:mx-10 xl:mx-20"></div>
        <ProjectGallery />
        
        {/* SEPARADOR */}
        <div className="mx-5 mb-5 mt-10 h-[1px] bg-black-text md:mx-10 xl:mx-20"></div>

        <Services />
            
        {/* SEPARADOR */}
        <div className="mx-5 mb-5 mt-20 h-[1px] bg-black-text md:mx-10 xl:mx-20 xl:mt-50"></div>
        <ContactForm/>
      </main>

      <footer className="mx-5 flex min-h-15 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-2 border-gray-400 py-3 font-mono text-[13px] md:mx-10 md:text-base xl:mx-20">
        <p>02·ruedas</p>
        <LiveClock />
        <p>somos@biclaweb.com</p>
        <p>Argentina·</p>
      </footer>
    </GameProvider>
  );
}
