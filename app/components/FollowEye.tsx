"use client"

import { useEffect, useRef, useState } from "react"

const PUPIL_RADIUS = 2

type FollowEyeProps = {
  className?: string
  mouse: { x: number; y: number } | null
}

function clampToCircle(dx: number, dy: number, radius: number) {
  const dist = Math.hypot(dx, dy)
  if (dist <= radius || dist === 0) return { x: dx, y: dy }
  const scale = radius / dist
  return { x: dx * scale, y: dy * scale }
}

export default function FollowEye({ className, mouse }: FollowEyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef(mouse)
  mouseRef.current = mouse
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const update = () => {
      const el = eyeRef.current
      const m = mouseRef.current
      if (!el || !m) {
        setOffset({ x: 0, y: 0 })
        return
      }

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const maxRadius = Math.min(rect.width, rect.height) / 2 - PUPIL_RADIUS

      const { x, y } = clampToCircle(m.x - cx, m.y - cy, maxRadius)
      setOffset({ x, y })
    }

    update()
    window.addEventListener("scroll", update, true)
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update, true)
      window.removeEventListener("resize", update)
    }
  }, [mouse])

  return (
    <div
      ref={eyeRef}
      className={`pointer-events-none h-2 w-2 rounded-full ${className ?? ""}`}
    >
      <div
        className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-white"
        style={{
          transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
        }}
      />
    </div>
  )
}
