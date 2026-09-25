import LiveClock from "./components/LiveClock"
import ScrambleButton from "./components/ScrambleButton";
import StackingSteps from "./components/StackingSteps"
import { benefits, steps, services } from "./consts"
import Hero from "./components/Hero";
import ProjectGallery from "./components/ProjectGallery"
import SiteHeader from "./components/SiteHeader";
import { GameProvider } from "./context/GameContext";


export default function Home() {
  return (
    <GameProvider>
      <SiteHeader />

      <main className="flex flex-col">
        <Hero/>

        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-30 mb-5"></div>
        <div className="flex justify-end font-mono mx-20 mb-60">
          <p>¿Por qué contratarnos?</p>
        </div>

        <section id="modalidad" className="grid grid-cols-4 gap-y-15 gap-x-40 mx-20 font-mono">
          {benefits.map((service, i) => (
            <div key={i} className="w-[206px] flex flex-col gap-3">
              <img src={service.img} alt="" className="h-[80px] w-fit" />
              <h3 className="text-[20px] font-medium whitespace-pre-line">
                {service.title}
              </h3>
              <p>{service.description}</p>
            </div>
          ))}
        </section>
        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-60 mb-5"></div>
        <div className="flex justify-end mx-20">
          <p>Paso a paso</p>
        </div>

        <StackingSteps steps={steps} />
        
        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-50 mb-5"></div>
        <ProjectGallery />
        
        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-50 mb-5"></div>

        <section id="servicios" className="mx-20">
          <div className="flex justify-end mb-25">
            <p>Servicios</p>
          </div>
          <div className="grid w-full grid-cols-4 gap-20 font-mono">
            {
              services.map(((service,i)=>(
              <div key={i} className="min-w-0 w-full">
                <div className="flex justify-between">
                  <p className="uppercase">{service.name}</p>
                  <p>{"0"+ (i+1)}</p>
                </div>
                <div className="border border-black-text h-[305px] flex justify-center items-center">IMAGEN</div>
                <div className="border border-black-text relative leading-[20px] font-mono font-regular mt-10 pt-5 px-2 text-[15px] h-[138px] tracking-[-2%]">
                  <p>{service.description}</p>
                  {service.aditional?
                  <p className="absolute bottom-2 right-2 underline tracking-[-2%] leading-[13px] text-[10px]">*Servicio<br/>adicional</p>
                  :null}
                </div>
              </div>
              )))
            }
          </div>
        </section>
            
        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-50 mb-5"></div>

        <section id="nosotros" className="mx-20">
          <p className="font-medium text-[60px]">IDENTIDAD VISUAL</p>
        </section>

        {/* SEPARADOR */}
        <div className="bg-black-text h-[1px] mx-20 mt-50 mb-5"></div>

        <section id="contacto" className="mb-50 pt-10 px-20">
          <div className="flex justify-between">
            <p className="font-medium text-[60px]">CONTACTANOS :)</p>
            <p>Miscelanea</p>
          </div>
          <div className="grid grid-cols-2 gap-y-5 gap-x-3 justify-between mt-20 mb-5">
            <input type="text" className="border-1 border-[#1E1E1E] h-[50px] px-10" placeholder="Nombre"/>
            <input type="text" className="border-1 border-[#1E1E1E] h-[50px] px-10" placeholder="Mail"/>
            <input type="text" className="border-1 border-[#1E1E1E] h-[50px] px-10" placeholder="Teléfono"/>
            <input type="text" className="border-1 border-[#1E1E1E] h-[50px] px-10" placeholder="Asunto"/>
            <input type="text" className="col-span-2 border-1 h-[153px] border-[#1E1E1E] px-10" placeholder="Mensaje"/>
          </div>
          <ScrambleButton text="Enviar"/>
        </section>
      </main>

      <footer className="mx-20 border-t-2 h-15 font-mono flex justify-between items-center border-gray-400">
        <p>02·ruedas</p>
        <LiveClock />
        <p>malenacosentino@gmail.com</p>
        <p>Argentina·</p>
      </footer>
    </GameProvider>
  );
}
