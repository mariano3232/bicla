"use client";

import { useState } from "react";
import Dino from "./game/Dino";

export default function Hero() {

  const [gameStatus, setGameStatus] = useState("idle");
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameStatus("starting");
    setScore(0);
  };

  return (
    <section id="inicio" className="bg-[#B8F5EE] pb-20 pt-60">
      <div className="w-fit m-auto">
        <div className="hero-content">
          <h1 className="max-w-[1256px] font-sans text-[clamp(48px,7.29vw,105px)] font-medium leading-[1.24]">
            <span className="flex gap-3 items-end h-[200px]">
              <span className="shrink-0 font-light whitespace-nowrap">
                Somos <span className="font-medium">Bicla</span>,
              </span>
              <div className="flex min-w-0 flex-1 flex-col w-full h-[200px] justify-end">
                {gameStatus === "idle" ? (
                  <>
                    <div className="flex justify-between items-end">
                      <div className="relative">
                        <img
                          src="/bike.png"
                          alt=""
                          className="w-[123px] relative bottom-3 object-contain rotate-340 cursor-pointer"
                          onClick={startGame}
                        />
                        <p className="absolute text-[30px] right-4 -top-7">*</p>
                      </div>
                      <img
                        src="/play.png"
                        alt=""
                        onClick={startGame}
                        className="w-[24px] mb-2 cursor-pointer"
                      />
                    </div>
                    <div className="h-[2px] w-full bg-black-text" />
                  </>
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

            <span className="mt-1 block whitespace-nowrap font-light">
              Diseño digital <b className="font-medium">sin frenos.</b>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
