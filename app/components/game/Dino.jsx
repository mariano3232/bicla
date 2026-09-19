"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./dino.module.css";

const START_RIGHT = -40;
const BASE_CROSS_MS = 2500;
const MIN_CROSS_MS = 1200;
const SCORE_TICK_MS = 100;

const ENEMY_TYPES = [
  { src: "/caballo.png", w: 90, h: 57 },
  { src: "/pistolita.png", w: 56, h: 56 },
  { src: "/servicio.png", w: 70, h: 70 },
];

function crossDuration(score) {
  return Math.max(MIN_CROSS_MS, BASE_CROSS_MS - score * 6);
}

function spawnGapPx(score) {
  return Math.max(800, 1100 - score * 1.2) + Math.random() * 280;
}

function pickType(score) {
  const pool = [ENEMY_TYPES[0]];
  if (score >= 12) pool.push(ENEMY_TYPES[1]);
  if (score >= 40) pool.push(ENEMY_TYPES[2]);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function Dino({ gameStatus, setGameStatus, score, setScore }) {
  const dinoRef = useRef(null);
  const gameRef = useRef(null);
  const obstaclesRef = useRef(null);
  const scoreRef = useRef(0);

  const [runId, setRunId] = useState(0);

  const jump = useCallback(() => {
    const dino = dinoRef.current;

    if (
      !dino ||
      gameStatus !== "playing" ||
      dino.classList.contains(styles.jump)
    ) {
      return;
    }

    dino.classList.add(styles.jump);

    setTimeout(() => {
      dino.classList.remove(styles.jump);
    }, 1000);
  }, [gameStatus]);

  const start = useCallback(() => {
    scoreRef.current = 0;
    setScore(0);

    setRunId((id) => id + 1);
    setGameStatus("starting");
  }, [setGameStatus, setScore]);

  const onInteract = useCallback(() => {
    if (gameStatus !== "playing") {
      start();
      return;
    }

    jump();
  }, [jump, start, gameStatus]);

  useEffect(() => {
    if (gameStatus !== "starting") return;

    const timeout = setTimeout(() => {
      setGameStatus("playing");
    }, 700);

    return () => clearTimeout(timeout);
  }, [gameStatus, setGameStatus]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        onInteract();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onInteract]);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const game = gameRef.current;
    const root = obstaclesRef.current;
    if (!game || !root) return;

    const obstacles = [];
    let nextGap = 80;
    let frame = 0;
    let last = performance.now();
    let scoreAcc = 0;

    const spawn = (type, extraRight = 0) => {
      const el = document.createElement("div");
      el.className = styles.enemy;
      el.style.width = `${type.w}px`;
      el.style.height = `${type.h}px`;
      el.style.backgroundImage = `url(${type.src})`;
      const right = START_RIGHT + extraRight;
      el.style.right = `${right}px`;
      root.appendChild(el);
      obstacles.push({ el, right, w: type.w });
    };

    const tick = (now) => {
      const dt = now - last;
      last = now;

      const scoreNow = scoreRef.current;
      const travel = game.clientWidth - START_RIGHT;
      const speed = travel / crossDuration(scoreNow);

      const newest = obstacles[obstacles.length - 1];
      if (!newest || newest.right > nextGap) {
        spawn(pickType(scoreNow));
        nextGap = spawnGapPx(scoreNow);
      }

      const dino = dinoRef.current;
      const dinoBox = dino?.getBoundingClientRect();

      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.right += speed * dt;
        obstacle.el.style.right = `${obstacle.right}px`;

        if (obstacle.right >= game.clientWidth + obstacle.w) {
          obstacle.el.remove();
          obstacles.splice(i, 1);
          continue;
        }

        if (dinoBox) {
          const box = obstacle.el.getBoundingClientRect();
          const hit =
            dinoBox.left < box.right - 10 &&
            dinoBox.right > box.left + 10 &&
            dinoBox.bottom > box.top + 10;

          if (hit) {
            setGameStatus("idle");
            return;
          }
        }
      }

      scoreAcc += dt;
      while (scoreAcc >= SCORE_TICK_MS) {
        scoreAcc -= SCORE_TICK_MS;
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      root.replaceChildren();
    };
  }, [gameStatus, runId, setGameStatus, setScore]);

  useEffect(() => {
    if (gameStatus === "starting") {
      scoreRef.current = 0;
    }
  }, [gameStatus]);

  return (
    <div
      className={`${styles.gameWrapper} ${
        gameStatus === "idle" ? styles.hidden : ""
      } ${gameStatus === "starting" ? styles.starting : ""}`}
    >
      <div
        ref={gameRef}
        className={styles.game}
        onClick={onInteract}
        role="button"
        tabIndex={0}
      >
        <p className={styles.score}>Score: {score}</p>

        {gameStatus === "starting" && (
          <div className={styles.overlay}>
            <p>Preparado...</p>
          </div>
        )}
        <div className={styles.dino} ref={dinoRef} />
        <div key={runId} className={styles.obstacles} ref={obstaclesRef} />
        <div className="absolute bottom-1 w-full h-2 bg-black"></div>
      </div>
    </div>
  );
}
