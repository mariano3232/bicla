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
    <form id="contacto" ref={form} onSubmit={sendEmail} className="mb-50 pt-10 px-20">
      <div className="flex justify-between">
        <p className="font-medium text-[60px]">CONTACTANOS :)</p>
        <p>Miscelanea</p>
      </div>
      <div className="grid grid-cols-2 gap-y-5 gap-x-3 justify-between mt-20 mb-5">
        <input name="nombre" type="text" required className="border-1 border-[#1E1E1E] h-[50px] px-10" placeholder="Nombre" />
        <input name="mail" type="email" required className="border-1 border-[#1E1E1E] h-[50px] px-10" placeholder="Mail" />
        <input name="telefono" type="tel" className="border-1 border-[#1E1E1E] h-[50px] px-10" placeholder="Teléfono" />
        <input name="asunto" type="text" className="border-1 border-[#1E1E1E] h-[50px] px-10" placeholder="Asunto" />
        <textarea name="mensaje" required className="col-span-2 border-1 h-[153px] border-[#1E1E1E] px-10 py-4" placeholder="Mensaje" />
      </div>
      <ScrambleButton text="Enviar" />
      {status === "sent" ? <p className="mt-4 font-mono">Mensaje enviado.</p> : null}
      {status === "error" ? <p className="mt-4 font-mono">No se pudo enviar el mensaje.</p> : null}
    </form>
  )
}
