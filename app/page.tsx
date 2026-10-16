import LiveClock from "./components/LiveClock"
import StackingSteps from "./components/StackingSteps"
import { benefits, steps } from "./consts"
import Hero from "./components/Hero";
import ProjectGallery from "./components/ProjectGallery"
import SiteHeader from "./components/SiteHeader";
import { GameProvider } from "./context/GameContext";
import ContactForm from "./components/ContactForm";
import Services from "./components/Services";
import StepLine from "./components/StepLine";

export default function Home() {
  return (
    <GameProvider>
      <SiteHeader />

      <main className="flex flex-col">
        <div className="grid xl:grid-cols-[1fr_max-content_1fr]">
        <Hero/>
        <section className="px-5 md:px-10 xl:col-start-2 xl:px-0">
          <p className="my-12 w-full max-w-[561px] font-mono text-[13px] font-light md:text-base xl:mt-30 xl:ml-3">
            Somos un estudio de diseño digital que crea marcas, sitios web y proyectos digitales.
            Nos gusta pensar ideas, darles una forma y llevarlas a la pantalla. Trabajamos cada proyecto de manera integral, desde el concepto y la identidad hasta el diseño y desarrollo.
          </p>
        </section>
        </div>

        <StepLine text="SERVICIOS" id="servicios"/>

        <Services />

        <StepLine text="PASO A PASO" />

        <StackingSteps steps={steps} />

        <StepLine text="DIFERENCIALES" />

        <section className="mx-5 grid grid-cols-1 gap-x-8 gap-y-15 font-mono sm:grid-cols-2 md:mx-10 xl:mx-20 xl:grid-cols-4 xl:gap-x-40">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex w-full flex-col gap-2 items-center text-center md:text-start md:items-start">
              <img
                src={benefit.img}
                alt=""
                className='mb-2 h-[60px] w-auto max-w-[100px] md:mb-4 md:h-[70px] md:max-w-[140px]'
                style={{ objectFit: "contain", marginLeft: benefit.ml }}
              />
        
              <h3 className="text-[16px] font-medium whitespace-pre-line md:text-[20px]">
                {benefit.title}
              </h3>
              <p className="w-full whitespace-pre-line text-[12px] leading-[18px] md:text-[14px] md:leading-[18px]">{benefit.description}</p>
            </div>
          ))}
        </section>
        
        <StepLine text="PROYECTOS" id="proyectos"/>

        <ProjectGallery />
        
        <StepLine text="CONTACTO" id="contacto"/>

        <ContactForm/>
      </main>

      <footer className="mx-5 flex min-h-15 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-2 border-gray-400 py-3 font-mono text-[13px] md:mx-10 md:text-base xl:mx-20">
        <p className="hidden md:block">02·ruedas</p>
        <LiveClock />
        <a href={"mailto:somos@biclaweb.com"}>somos@biclaweb.com</a>
        <p className="hidden md:block">Argentina·</p>
      </footer>
    </GameProvider>
  );
}
