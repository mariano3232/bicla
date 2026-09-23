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
            <span className="flex items-end gap-3">
              <span className="shrink-0 font-light whitespace-nowrap">
                Somos <span className="font-medium">Bicla</span>,
              </span>

              <button
                type="button"
                className="relative shrink-0 cursor-pointer"
                onClick={startGame}
                aria-label="Iniciar juego"
              >
                {score ? (
                  <p className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px]">
                    Score: {score}
                  </p>
                ) : null}
                <span className="absolute -top-1 right-0 font-sans text-[clamp(20px,2.5vw,32px)] font-medium leading-none">
                  *
                </span>
                <img
                  src="/bike.png"
                  alt=""
                  className="w-[123px] object-contain rotate-340"
                />
              </button>

              <span
                className="mb-[0.28em] flex min-w-0 flex-1 items-center gap-1"
                aria-hidden="true"
              >
                <span className="h-px flex-1 bg-black-text" />
                <svg
                  viewBox="0 0 16 18"
                  className="h-[clamp(14px,1.6vw,18px)] w-[clamp(12px,1.4vw,16px)] shrink-0 fill-none stroke-black-text stroke-[1.5]"
                  aria-hidden="true"
                >
                  <path d="M2 2 L13 9 L2 16 Z" />
                </svg>
              </span>
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
