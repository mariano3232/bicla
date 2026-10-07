"use client";

import { useGame } from "../context/GameContext";
import CloudLayer from "./game/CloudLayer";
import Dino, { playGameMusic } from "./game/Dino";

export default function Hero() {
  const { gameStatus, setGameStatus, score, setScore, startGame } = useGame();

  const beginGame = () => {
    playGameMusic();
    startGame();
  };

  return (
    <section
      id="inicio"
      className="col-span-3 col-start-1 row-start-1 bg-[#B8F5EE] pb-12 pt-36 md:pb-16 md:pt-48 xl:grid xl:grid-cols-subgrid xl:pb-20 xl:pt-60"
    >
      <div className="hero-content px-5 md:px-10 xl:col-start-2 xl:px-0">
          <h1 className="max-w-[1256px] font-sans text-[32px] font-medium leading-[1.15] md:text-[clamp(48px,7.29vw,105px)] md:leading-[1.24]">
            <span className="flex h-auto flex-col gap-3 xl:h-[200px] xl:flex-row xl:items-end">
              <span className="shrink-0 font-light xl:whitespace-nowrap">
                Somos <span className="font-medium">Bicla</span>,
              </span>
              <div className="flex min-h-[150px] w-full min-w-0 flex-1 flex-col justify-end md:h-[200px]">
                {gameStatus === "idle" ? (
                  <div className="relative flex w-full flex-1 flex-col justify-end overflow-hidden">
                    <CloudLayer />

                    <div className="absolute top-0 flex justify-between pr-3 w-full">
                      {score?<p className="font-mono text-[16px]">Score: {score}</p>:<div/>}
                      {/* <div className="flex gap-2">
                        <img src="/sonido.png" alt="" className="h-[20px]" />
                        <img src="/musica.png" alt="" className="h-[20px]" />
                      </div> */}
                    </div>

                    <div className="relative z-10 flex justify-between items-end">
                      <div className="relative">
                        <img
                          src="/bike.png"
                          alt=""
                          className="relative bottom-2 w-[78px] cursor-pointer object-contain rotate-340 md:bottom-3 md:w-[123px]"
                          onClick={beginGame}
                        />
                        <p className="absolute -top-5 right-2 text-[20px] md:-top-7 md:right-4 md:text-[30px]">*</p>
                      </div>
                      <img
                        src="/play.png"
                        alt=""
                        onClick={beginGame}
                        className="mb-2 w-[16px] cursor-pointer md:w-[24px]"
                      />
                    </div>
                    <div className="relative z-10 h-[2px] w-full bg-black-text" />
                  </div>
                ) : (
                  <Dino
                    gameStatus={gameStatus}
                    setGameStatus={setGameStatus}
                    score={score}
                    setScore={setScore}
                  />
                )}
              </div>
            </span>

            <span className="mt-1 block font-light xl:whitespace-nowrap">
              Diseño digital <b className="font-medium">sin frenos.</b>
            </span>
          </h1>
      </div>
    </section>
  );
}
