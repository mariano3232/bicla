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
      <div className="relative min-h-[360px] w-fit m-auto">
        <div
          className={`hero-content ${
            gameStatus !== "idle" ? "hero-content--hidden" : ""
          }`}
        >
          <h1 className="max-w-[1256px] font-sans text-[clamp(48px,7.29vw,105px)] font-medium leading-[1.24]">
            <span className="flex items-center gap-3">
              <span className="shrink-0 font-light whitespace-nowrap">
                Somos <span className="font-medium">Bicla</span>,
              </span>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                  <div className="relative">
                    <img
                      src="/bike.png"
                      alt=""
                      className="w-[123px] relative bottom-3 object-contain rotate-340"
                    />
                    <p className="absolute text-[30px] right-4 -top-7">*</p>
                  </div>
                 
                  <img src="/play.png" alt="" className="w-[24px] mb-2"/>
                </div>
                
                <div className="h-[2px] w-[100%] bg-black-text"/>
              </div>
              
            </span>
            
            <span className="mt-1 block whitespace-nowrap font-light">
              Diseño digital <b className="font-medium">sin frenos.</b>
            </span>
          </h1>
        </div>

        <div
          className={`game-container ${
            gameStatus !== "idle" ? "game-container--visible" : ""
          }`}
        >
          <Dino
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            score={score}
            setScore={setScore}
          />
        </div>
      </div>
    </section>
  );
}
