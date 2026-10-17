"use client"
import React from 'react'
import { useScramble } from 'use-scramble';

export default function ScrambleButton({
  text,
  className = "",
  onClick,
  type = "button",
}: {
  text: string
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
}) {

    const { ref, replay } = useScramble({ 
        text,
        speed: 0.5,
        tick: 1,
        scramble: 8,
    });

    return (
        <button
            ref={ref}
            type={type}
            onMouseOver={replay}
            onClick={onClick}
            className={"cursor-pointer border px-8 py-2 transition hover:bg-black hover:text-white " + className}
        />
    )
}
