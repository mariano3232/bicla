"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type Step = {
  title: string
  description: string
  misc: string
}

const STACK_GAP = 92
/** Espacio bajo el header */
const STACK_TOP_EXTRA = 12
const DEFAULT_HEADER_HEIGHT = 88
/** Más alto = el stacking arranca antes (con menos scroll). */
const SCROLL_START_OFFSET = 0

function getStackTopBase() {
  const header = document.querySelector("header")
  const headerHeight = header?.getBoundingClientRect().height ?? DEFAULT_HEADER_HEIGHT
  return headerHeight + STACK_TOP_EXTRA
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-medium">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

function StepCard({
  step,
  index,
  className = "",
}: {
  step: Step
  index: number
  className?: string
}) {
  return (
    <article className={`relative mx-5 my-4 flex h-auto flex-col gap-6 border bg-white px-5 pb-8 pt-7 md:mx-10 md:px-10 xl:mx-20 xl:h-[297px] xl:flex-row xl:justify-between xl:gap-8 xl:px-10 xl:pb-18 ${className}`}>
      <div className="absolute left-0 right-0 top-0 h-[1px]">
        <div className="absolute inset-0 origin-left bg-black-text/20" />
        <div className="js-progress-bar absolute inset-0 origin-left scale-x-0 bg-gray-500"/>
      </div>
      <h2 className="hidden font-mono text-[60px] font-medium leading-none xl:block">
        {String(index + 1).padStart(2, "0")}
      </h2>
      <div className="flex min-w-0 flex-col gap-4 xl:h-full xl:w-[400px] xl:justify-between">
        <div className="flex items-baseline gap-3">
          <h2 className="font-mono text-2xl font-medium leading-none md:text-3xl xl:hidden">
            {String(index + 1).padStart(2, "0")}
          </h2>
          <p className="font-sans text-2xl font-medium leading-none md:text-3xl xl:text-[60px]">
            {step.title}
          </p>
        </div>
        <p className="font-mono text-[13px] font-light whitespace-pre-line md:text-[15px] xl:max-w-[330px] xl:text-justify">
          {step.misc}
        </p>
      </div>
      <p className="min-w-0 self-start font-mono text-[13px] font-normal leading-[18px] tracking-[-0.02em] whitespace-normal md:text-[16px] md:leading-[21px] xl:ml-40 xl:w-[484px] xl:whitespace-pre-line">
        <RichText text={step.description} />
      </p>
    </article>
  )
}

function StepsCarousel({ steps }: { steps: Step[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  function updateActive() {
    const el = scrollerRef.current
    if (!el || el.clientWidth === 0) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    const next = Math.min(steps.length - 1, Math.max(0, index))
    setActive((current) => (current === next ? current : next))
  }

  function go(index: number) {
    const el = scrollerRef.current
    if (!el) return
    const next = Math.min(steps.length - 1, Math.max(0, index))
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" })
  }

  return (
    <div className="xl:hidden">
      <div
        ref={scrollerRef}
        onScroll={updateActive}
        className="flex snap-x snap-mandatory items-stretch overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step, i) => (
          <div key={step.title} className="flex w-full shrink-0 snap-start">
            <StepCard step={step} index={i} className="h-full w-full" />
          </div>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-end gap-4 px-5 font-mono text-[13px] md:px-10">
        <button
          type="button"
          aria-label="Paso anterior"
          disabled={active === 0}
          onClick={() => go(active - 1)}
          className="cursor-pointer disabled:cursor-default disabled:opacity-30"
        >
          ←
        </button>
        <span>
          {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label="Paso siguiente"
          disabled={active === steps.length - 1}
          onClick={() => go(active + 1)}
          className="cursor-pointer disabled:cursor-default disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>
  )
}

export default function StackingSteps({ steps }: { steps: Step[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [stackTopBase, setStackTopBase] = useState(DEFAULT_HEADER_HEIGHT + STACK_TOP_EXTRA)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    if (!section) return

    const desktop = window.matchMedia("(min-width: 1280px)")
    let ctx: gsap.Context | undefined
    let stacking = false

    const setup = () => {
      const topBase = getStackTopBase()
      setStackTopBase(topBase)

      if (!desktop.matches) {
        ctx?.revert()
        ctx = undefined
        stacking = false
        return
      }

      if (stacking && ctx) {
        ScrollTrigger.refresh()
        return
      }

      const cards = Array.from(
        section.querySelectorAll<HTMLElement>(".js-stacking-card"),
      )
      const containers = Array.from(
        section.querySelectorAll<HTMLElement>(".js-stacking-card-container"),
      )
      if (!cards.length) return

      const cardHeight = cards[0].getBoundingClientRect().height || 369
      const clipBottom = (100 * (cardHeight - STACK_GAP)) / cardHeight

      ctx = gsap.context(() => {
        cards.forEach((card, i) => {
          const bar = card.querySelector(".js-progress-bar")
          const next = containers[i + 1]
          const stickTop = topBase + STACK_GAP * i
          const nextStickTop = topBase + STACK_GAP * (i + 1)

          gsap.fromTo(
            bar,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: {
                trigger: containers[i],
                start: `top ${stickTop + SCROLL_START_OFFSET}px`,
                end: next
                  ? `top ${nextStickTop + SCROLL_START_OFFSET}px`
                  : `bottom ${stickTop}px`,
                scrub: true,
              },
            },
          )

          if (!next) return

          gsap.fromTo(
            card,
            { clipPath: "inset(0% 0% 0% 0%)" },
            {
              clipPath: `inset(0% 0% ${clipBottom}% 0%)`,
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: `top ${cardHeight + SCROLL_START_OFFSET}px`,
                end: `top ${nextStickTop + SCROLL_START_OFFSET}px`,
                scrub: true,
              },
            },
          )
        })
      }, section)
      stacking = true
    }

    setup()

    const onResize = () => setup()
    window.addEventListener("resize", onResize)
    desktop.addEventListener("change", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      desktop.removeEventListener("change", onResize)
      ctx?.revert()
    }
  }, [steps.length])

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="mt-25 pb-30"
      // style={{ paddingBottom: stackTopBase + (steps.length - 1) * STACK_GAP }}
    >
      <StepsCarousel steps={steps} />
      <div className="hidden xl:block">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="js-stacking-card-container sticky"
            style={{ top: stackTopBase + i * STACK_GAP, zIndex: i + 1 }}
          >
            <div className="js-stacking-card">
              <StepCard step={step} index={i} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
