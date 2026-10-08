"use client"

import { useEffect, useRef } from "react"

export function VideoPlayer({
  src,
  open,
  onClose,
}: {
  src: string
  open: boolean
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) dialog.showModal()
      const video = dialog.querySelector("video")
      video?.play().catch(() => {})
      return
    }

    dialog.querySelector("video")?.pause()
    if (dialog.open) dialog.close()
  }, [open, src])

  const requestClose = () => {
    dialogRef.current?.close()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        const dialog = dialogRef.current
        if (!dialog) return
        const rect = dialog.getBoundingClientRect()
        const inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        if (!inside) requestClose()
      }}
      className="w-[min(960px,calc(100vw-2rem))] m-auto border border-black-text bg-white backdrop:bg-black/50"
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={requestClose}
          className="cursor-pointer font-mono text-[14px] absolute top-5 right-5 w-5 h-5 rounded bg-red-300"
        >
          X
        </button>
      </div>
      <video key={src} controls autoPlay muted className="max-h-[75vh] w-full bg-black">
        <source src={src} type="video/mp4" />
      </video>
    </dialog>
  )
}
