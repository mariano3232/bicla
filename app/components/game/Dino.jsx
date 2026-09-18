"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./dino.module.css";

export default function Dino({ gameStatus, setGameStatus, score, setScore }) {
  const dinoRef = useRef(null);
  const cactusRef = useRef(null);
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

    const isAlive = setInterval(() => {
      const dino = dinoRef.current;
      const cactus = cactusRef.current;

      if (!dino || !cactus) return;

      const dinoBox = dino.getBoundingClientRect();
      const cactusBox = cactus.getBoundingClientRect();

      const hit =
        dinoBox.left < cactusBox.right - 10 &&
        dinoBox.right > cactusBox.left + 10 &&
        dinoBox.bottom > cactusBox.top + 10;

      if (hit) {
        setGameStatus("idle");
        return;
      }

      scoreRef.current += 1;
      setScore(scoreRef.current);
    }, 50);

    return () => clearInterval(isAlive);
  }, [gameStatus, runId, setGameStatus]);

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
        className={styles.game}
        onClick={onInteract}
        role="button"
        tabIndex={0}
      >
        <p className={styles.score}>Score: {score}</p>

        {gameStatus === "starting" && (
          <div className={styles.overlay}>
            <p>Get ready...</p>
          </div>
        )}
        <div className={styles.dino} ref={dinoRef} />
        <div
          key={runId}
          className={styles.cactus}
          ref={cactusRef}
          style={{
            animationPlayState:
              gameStatus === "playing" ? "running" : "paused",
          }}
        />
        <div className={styles.ground} />
      </div>
    </div>
  );
}