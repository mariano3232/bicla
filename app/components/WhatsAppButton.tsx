"use client";


export function WhatsAppButton() {

  return (
    <a
      href={`https://wa.me/542235272441?text=Hola`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="/wsp1.png"
        alt=""
        className="z-99 fixed right-5 bottom-5 h-11 w-11 cursor-pointer transition hover:scale-105 sm:right-15 sm:bottom-15 sm:h-15 sm:w-15"
      />
    </a>
  );
}