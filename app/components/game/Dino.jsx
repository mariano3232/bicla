"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./dino.module.css";

export default function Dino() {
  const dinoRef = useRef(null);
  const cactusRef = useRef(null);
  const scoreRef = useRef(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [runId, setRunId] = useState(0);

  const jump = useCallback(() => {
    const dino = dinoRef.current;
    if (!dino || status !== "playing" || dino.classList.contains(styles.jump)) return;

    dino.classList.add(styles.jump);
    setTimeout(() => {
      dino.classList.remove(styles.jump);
    }, 1000);
  }, [status]);

  const start = useCallback(() => {
    scoreRef.current = 0;
    setScore(0);
    setStatus("playing");
    setRunId((id) => id + 1);
  }, []);

  const onInteract = useCallback(() => {
    if (status !== "playing") {
      start();
      return;
    }
    jump();
  }, [jump, start, status]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
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
    if (status !== "playing") return;

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
        setStatus("over");
        return;
      }

      scoreRef.current += 1;
      setScore(scoreRef.current);
    }, 50);

    return () => clearInterval(isAlive);
  }, [status, runId]);

  return (
    <div
      className={status=="idle"? styles.hidden : styles.game}
      onClick={onInteract}
      role="button"
      tabIndex={0}
    >
      <p className={styles.score}>Score: {score}</p>
      {status !== "playing" && (
        <div>
          {status === "over" ? (
            <div className={styles.overlay}>
              <p>Game Over · {score}</p>
              <p>Click o espacio para reiniciar</p>
            </div>
          ) : (
            <div className={styles.disabled}>
              <img src={"bike.png"} className="h-[141px] relative bottom-2 justify-between mx-15"/>
            </div>
          )}
        </div>
      )}
      <div className={styles.dino} ref={dinoRef} />
      <div
        key={runId}
        className={styles.cactus}
        ref={cactusRef}
        style={{ animationPlayState: status === "playing" ? "running" : "paused" }}
      />
      <div className={styles.ground} />
    </div>
  );
}
