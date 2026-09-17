"use client"
import React from 'react'
import { useScramble } from 'use-scramble';

export default function ScrambleButton({ text }: { text: string }) {

    const { ref, replay } = useScramble({ 
        text,
        speed: 0.5,
        tick: 2,
        scramble: 8,
    });

    return (
        <button ref={ref} onMouseOver={replay} className='border px-8 py-2 transition hover:bg-black hover:text-white cursor-pointer'/>
    )
}
