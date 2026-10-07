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
          <h1 className="max-w-[1256px] font-sans text-[clamp(48px,7.29vw,105px)] font-medium leading-[1.24]">
            <span className="flex h-auto flex-col gap-3 xl:h-[200px] xl:flex-row xl:items-end">
              <span className="shrink-0 font-light xl:whitespace-nowrap">
                Somos <span className="font-medium">Bicla</span>,
              </span>
              <div className="flex h-[190px] w-full min-w-0 flex-1 flex-col justify-between md:h-[200px]">
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
                          className="w-[123px] relative bottom-3 object-contain rotate-340 cursor-pointer"
                          onClick={beginGame}
                        />
                        <p className="absolute text-[30px] right-4 -top-7">*</p>
                      </div>
                      <img
                        src="/play.png"
                        alt=""
                        onClick={beginGame}
                        className="w-[24px] mb-2 cursor-pointer"
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
