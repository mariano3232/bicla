"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import CloudLayer from "./CloudLayer";
import { CLOUD_SPEED_RATIO, START_RIGHT } from "./clouds";
import styles from "./dino.module.css";

const BASE_CROSS_MS = 2200;
const MIN_CROSS_MS = 800;
const BASE_JUMP_MS = 1200;
const JUMP_FOLLOWS_SPEED = 0.4;
const SCORE_TICK_MS = 100;

const ENEMY_TYPES = [
  { src: "/engranaje.png", w: 40, h: 40 },
  { src: "/tipos.png", w: 60, h: 50 },
  { src: "/doschips.png", w: 30, h: 60 },
  { src: "/caballo.png", w: 80, h: 60, mb:100 },
];

function crossDuration(score) {
  return Math.max(MIN_CROSS_MS, BASE_CROSS_MS - score * 2);
}

function jumpDuration(score) {
  const speedRatio = BASE_CROSS_MS / crossDuration(score);
  const jumpRatio = 1 + (speedRatio - 1) * JUMP_FOLLOWS_SPEED;
  return BASE_JUMP_MS / jumpRatio;
}

function spawnGapPx(score) {
  return Math.max(800, 1100 - score * 1.2) + Math.random() * 280;
}

function pickType(score) {
  const pool = [ENEMY_TYPES[0]];
  if (score >= 100) pool.push(ENEMY_TYPES[1]);
  if (score >= 200) pool.push(ENEMY_TYPES[2]);
  if (score >= 200) pool.push(ENEMY_TYPES[3]);
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

    const duration = jumpDuration(scoreRef.current);
    dino.style.setProperty("--jump-ms", `${duration}ms`);
    dino.classList.add(styles.jump);

    setTimeout(() => {
      dino.classList.remove(styles.jump);
    }, duration);
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
      el.style.bottom = `${type.mb}px`;
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
            dinoBox.bottom > box.top + 10 &&
            dinoBox.top < box.bottom -10;

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

  const getCloudSpeed = useCallback(() => {
    const game = gameRef.current;
    if (!game) return 0;

    const travel = game.clientWidth - START_RIGHT;
    const speed = travel / crossDuration(scoreRef.current);
    return speed * CLOUD_SPEED_RATIO;
  }, []);

  return (
    <div
      className={`${styles.gameWrapper} ${
        gameStatus === "starting" ? styles.starting : ""
      }`}
    >
      <div className="flex justify-between pr-3 w-full">
        <p className={styles.score}>Score: {score}</p>
        <div className="flex gap-2">
          <img src="/sonido.png" alt="" className="h-[20px]" />
          <img src="/musica.png" alt="" className="h-[20px]" />
        </div>
      </div>

      <div
        ref={gameRef}
        className={styles.game}
        onClick={onInteract}
        role="button"
        tabIndex={0}
      >  
        {gameStatus === "starting" && (
          <div className={styles.overlay}>
            <p>Cargando...</p>
          </div>
        )}
        <CloudLayer key={`clouds-${runId}`} getSpeed={getCloudSpeed} />
        <div className={styles.dino} ref={dinoRef} />
        <div key={`obstacles-${runId}`} className={styles.obstacles} ref={obstaclesRef} />
        <div className="absolute bottom-1 w-full h-[2px] bg-black"></div>
      </div>
    </div>
  );
}
