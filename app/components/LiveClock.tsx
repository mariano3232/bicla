"use client"

import { useEffect, useState } from "react"

function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export default function LiveClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <p className="flex items-center gap-1">
    [ <div className="h-[7px] w-[7px] mr-1 rounded-full bg-[#A92F26]"/>{time} ]
  </p>
}
