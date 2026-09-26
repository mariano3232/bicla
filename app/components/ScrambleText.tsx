"use client"
import React from 'react'
import { useScramble } from 'use-scramble';

export default function ScrambleText({ text, className, step=1 }: { text: string, className: string, step?:number }) {

    const { ref, replay } = useScramble({ 
        text,
        speed: 1,
        tick: 1,
        step,
        scramble: 4,
        seed: 0,
        overdrive:false,
    });

    return (
        <p ref={ref} className={className}></p>
    )
}
