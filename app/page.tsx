import LiveClock from "./components/LiveClock"
import ScrambleButton from "./components/ScrambleButton";
import StackingServices from "./components/StackingServices"
import { benefits, services } from "./consts"
import Dino from "./components/game/Dino"
export default function Home() {

  return (
    <>
      <header className="bg-gray-100">
        <nav className="flex font-mono justify-between px-10 py-6">
          <h1 className="text-[16px] font-sans font-medium">Bicla:diseñoweb</h1>
          <ul className="flex gap-10">
            <li><a href="#inicio">Inicio</a></li><li><a href="#servicios">Servicios</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
        <div className="h-px mx-10 bg-black-text" />
      </header>

      <main className="flex flex-col gap-10">
        <section id="inicio" className="bg-gray-100 pt-12 px-10">
          <div className="font-medium text-[108px]">
            <h1 className="leading-[138px]">Somos Bicla,<br/> hacemos las mejores <br/> </h1>
            <div className="flex gap-10">
              <p>paginas web</p>
              <Dino/>
            </div>
            <h1>de Argentina</h1>
          </div>
          <div className="h-px my-5 bg-black-text" />

          <p className="w-[600px] leading-[39px] font-mono font-light text-[30px] py-15">
            Creo que esta última combinación puede acercarse
            más a la referencia que me mostraste: limpia,
            digital, pero con un toque divertido.
          </p>
        </section>

        <section id="beneficios" className="grid grid-cols-4 gap-y-15 gap-x-40 m-auto">
          {benefits.map((service, i) => (
            <div key={i} className="w-[206px] flex flex-col gap-3">
              <img src={service.img} alt="" className="w-[73px]" />
              <h3 className="text-[24px] font-sans font-medium whitespace-pre-line">
                {service.title}
              </h3>
              <p className="font-mono">{service.description}</p>
            </div>
          ))}
        </section>

        <StackingServices services={services} />
        
        <section>
          <div className="p-10 flex justify-end w-full">
            <p>Adicionales</p>
          </div>
          <div className="flex justify-between px-10">
          {
            [1,2,3,4].map(extra => (
              <div className="w-[320px] h-[369px] border" key={extra}></div>
            ))
          }
          </div>
        </section>

        <section id="proyectos" className="mb-50">
          <p className="m-10">Proyectos super exitosos</p>
          <div className="flex justify-between px-10 mt-10">
            <img src={"/kiosco.png"} className="bg-amber-100 w-[323px] h-[155px]"/>
            <img src={"/revista.png"} className="border w-[323px] h-[155px]"/>
            <img src={"/zrn.png"} className="border w-[323px] h-[155px]"/>
            <img src={"/retina.png"} className="border w-[323px] h-[155px] bg-black"/>
          </div>
          <div className=" h-[480px] border m-10"></div>
        </section>

        <section id="proyectos" className="mb-50 border-t-2 pt-10 px-10">
          <div className="flex justify-between">
            <p className="font-medium text-[64px]">CONTACTANOS :)</p>
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

      <footer className="mx-10 border-t-2 h-15 font-mono flex justify-between items-center border-gray-400">
        <p>02 ruedas</p>
        <LiveClock />
        <p>malenacosentino@gmail.com</p>
        <p>Argentina·</p>
      </footer>
    </>
  );
}
