"use client"

import { useRef, useState, type FormEvent } from "react"
import ScrambleButton from "./ScrambleButton"
import emailjs from "@emailjs/browser"

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.current || status === "sending") return

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error")
      return
    }

    setStatus("sending")
    emailjs.sendForm(serviceId, templateId, form.current, { publicKey }).then(
      () => {
        setStatus("sent")
        form.current?.reset()
      },
      () => {
        setStatus("error")
      },
    )
  }

  return (
    <form id="contacto" ref={form} onSubmit={sendEmail} className="mb-20 px-5 pt-10 md:px-10 xl:px-20">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <p className="text-2xl font-medium md:text-[60px]">CONTACTANOS :)</p>
        <p className="font-mono text-[13px] md:text-base md:text-end">¿QUÉ TENÉS EN MENTE? /<br/> ESCRIBINOS</p>
      </div>
      <div className="mt-15 mb-5 grid grid-cols-1 justify-between gap-x-3 gap-y-5 md:grid-cols-2">
        <input name="nombre" type="text" required className="h-[50px] w-full min-w-0 border-1 border-[#1E1E1E] px-4 md:px-10" placeholder="Nombre" />
        <input name="mail" type="email" required className="h-[50px] w-full min-w-0 border-1 border-[#1E1E1E] px-4 md:px-10" placeholder="Mail" />
        <input name="telefono" type="tel" className="h-[50px] w-full min-w-0 border-1 border-[#1E1E1E] px-4 md:px-10" placeholder="Teléfono" />
        <input name="asunto" type="text" className="h-[50px] w-full min-w-0 border-1 border-[#1E1E1E] px-4 md:px-10" placeholder="Asunto" />
        <textarea name="mensaje" required className="h-[153px] w-full min-w-0 border-1 border-[#1E1E1E] px-4 py-4 md:col-span-2 md:px-10" placeholder="Mensaje" />
      </div>
      <ScrambleButton text="Enviar" />
      {status === "sent" ? <p className="mt-4 font-mono">Mensaje enviado.</p> : null}
      {status === "error" ? <p className="mt-4 font-mono">No se pudo enviar el mensaje.</p> : null}
    </form>
  )
}
