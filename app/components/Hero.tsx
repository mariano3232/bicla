"use client";

import { useState } from "react";
import Dino from "./game/Dino";

export default function Hero() {
  const [gameStatus, setGameStatus] = useState("idle");
  const [score, setScore] = useState(0);

  return (
    <section id="inicio" className="bg-gray-100 pt-12 px-10">
    <div className="relative">
  
      {/* HERO */}
      <div
        className={`hero-content ${
          gameStatus !== "idle" ? "hero-content--hidden" : ""
        }`}
      >
        <div className="font-medium text-[108px]">
          <h1 className="leading-[138px]">
            Somos Bicla,
            <br />
            hacemos las mejores
            <br />
          </h1>
  
          <div className="flex gap-10">
            <p>paginas web</p>
            <div className="flex flex-col">
                {score? <p className="text-[10px] mx-auto">Score: {score}</p> : null}
                <img
                src="/bike.png"
                className="h-[141px] relative justify-between mx-15 cursor-pointer"
                onClick={() => {setGameStatus("starting"); setScore(0)}}
                alt="Iniciar juego"
                />
            </div>
          </div>

          <h1>de Argentina</h1>
        </div>
      </div>
  
      {/* GAME */}
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
  
    <div className="h-px my-5 bg-black-text" />
  
    <p className="w-[600px] leading-[39px] font-mono font-light text-[30px] py-15">
      Creo que esta última combinación puede acercarse más a
      la referencia que me mostraste: limpia, digital, pero
      con un toque divertido.
    </p>
  </section>
  );
}