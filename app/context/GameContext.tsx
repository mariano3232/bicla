"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type GameStatus = "idle" | "starting" | "playing";

type GameContextValue = {
  gameStatus: GameStatus;
  setGameStatus: (status: GameStatus) => void;
  score: number;
  setScore: (score: number) => void;
  startGame: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    setGameStatus("starting");
    setScore(0);
  }, []);

  return (
    <GameContext.Provider
      value={{ gameStatus, setGameStatus, score, setScore, startGame }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
}
