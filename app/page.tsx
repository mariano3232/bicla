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
        <div className="grid grid-cols-[1fr_max-content_1fr]">
        <Hero/>
        <section className="col-start-2">
          <p className="font-mono font-light w-[561px] my-30 ml-3">
            Somos un estudio de diseño digital que crea marcas, sitios web y proyectos digitales.
            Nos gusta pensar ideas, darles una forma y llevarlas a la pantalla. Trabajamos cada proyecto de manera integral, desde el concepto y la identidad hasta el diseño y desarrollo.
          </p>
        </section>
        </div>

        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-10 mb-5"></div>

        <div className="flex justify-end font-mono mx-20 mb-10 text-[15px]">
          <p>¿Por qué contratarnos?</p>
        </div>

        <section id="inicio" className="grid grid-cols-4 gap-y-15 gap-x-40 mx-20 font-mono">
          {benefits.map((benefit, i) => (
            <div key={i} className="w-[206px] flex flex-col gap-3">
              <img src={benefit.img} alt="" className="h-[60px] mb-4 w-fit" />
              <h3 className="text-[20px] font-medium whitespace-pre-line">
                {benefit.title}
              </h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </section>
        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-30 mb-5"></div>
        <div className="flex justify-end mx-20">
          <p>Paso a paso</p>
        </div>
        
        <StackingSteps steps={steps} />
        
        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-0 mb-5"></div>
        <ProjectGallery />
        
        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-10 mb-5"></div>

        <Services />
            
        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-50 mb-5"></div>
        <ContactForm/>
      </main>

      <footer className="mx-20 border-t-2 h-15 font-mono flex justify-between items-center border-gray-400">
        <p>02·ruedas</p>
        <LiveClock />
        <p>somos@biclaweb.com</p>
        <p>Argentina·</p>
      </footer>
    </GameProvider>
  );
}
