"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type Step = {
  title: string
  description1: string
  description2: string
  misc: string
}

/** Alto visible de cada card apilada en desktop (padding + título). */
const STACK_GAP = 92
/** Espacio bajo el header */
const STACK_TOP_EXTRA = 12
const DEFAULT_HEADER_HEIGHT = 88
/** Más alto = el stacking arranca antes (con menos scroll). */
const SCROLL_START_OFFSET = 0

function measureStackGap(section: HTMLElement) {
  const containers = section.querySelectorAll<HTMLElement>(
    ".js-stacking-card-container",
  )
  let gap = 0

  containers.forEach((container) => {
    const title = container.querySelector("h2")
    if (!title) return
    const next =
      Math.ceil(
        title.getBoundingClientRect().bottom -
          container.getBoundingClientRect().top,
      ) + 4
    gap = Math.max(gap, next)
  })

  return gap || STACK_GAP
}

function getStackTopBase() {
  const header = document.querySelector("header")
  const headerHeight = header?.getBoundingClientRect().height ?? DEFAULT_HEADER_HEIGHT
  return headerHeight + STACK_TOP_EXTRA
}

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <article className="relative mx-5 my-4 flex h-auto flex-col gap-6 border bg-white px-5 pb-8 pt-7 md:mx-10 md:px-10 xl:mx-20 xl:h-[297px] xl:flex-row xl:justify-between xl:gap-8 xl:px-10 xl:pb-18">
      <div className="absolute left-0 right-0 top-0 h-[1px]">
        <div className="absolute inset-0 origin-left bg-black-text/20" />
        <div className="js-progress-bar absolute inset-0 origin-left scale-x-0 bg-gray-500"/>
      </div>
      <div className="flex min-w-0 flex-col gap-6 md:gap-10">
        <h2 className="min-w-0 font-mono text-[clamp(26px,calc((100vw-5.5rem)/8.8),60px)] font-light leading-none whitespace-nowrap">
          {String(index + 1).padStart(2, "0")}:{step.title}
        </h2>
        <p className="font-mono text-[13px] font-light whitespace-normal md:whitespace-pre-line md:text-[15px] xl:max-w-[365px] xl:text-justify">
          {step.misc}
        </p>
      </div>

      <div className="flex flex-col gap-10 xl:w-[484px]">
        <p className="min-w-0 self-start font-mono text-[13px] font-normal leading-[18px] whitespace-normal md:text-[16px] md:leading-[21px] xl:whitespace-pre-line">
          {step.description1}
        </p>
        <p className="min-w-0 self-start font-mono text-[13px] font-normal leading-[18px] whitespace-normal md:text-[16px] md:leading-[21px] xl:whitespace-pre-line">
          {step.description2}
        </p>
      </div>
      
    </article>
  )
}

export default function StackingSteps({ steps }: { steps: Step[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [stackTopBase, setStackTopBase] = useState(DEFAULT_HEADER_HEIGHT + STACK_TOP_EXTRA)
  const [stackGap, setStackGap] = useState(STACK_GAP)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    if (!section) return

    let ctx: gsap.Context | undefined
    let lastWidth = window.innerWidth

    const setup = () => {
      const topBase = getStackTopBase()
      const gap = measureStackGap(section)
      setStackTopBase(topBase)
      setStackGap((current) => (current === gap ? current : gap))

      ctx?.revert()
      ctx = undefined

      const cards = Array.from(
        section.querySelectorAll<HTMLElement>(".js-stacking-card"),
      )
      const containers = Array.from(
        section.querySelectorAll<HTMLElement>(".js-stacking-card-container"),
      )
      if (!cards.length) return

      ctx = gsap.context(() => {
        cards.forEach((card, i) => {
          const bar = card.querySelector(".js-progress-bar")
          const next = containers[i + 1]
          const stickTop = topBase + gap * i
          const nextStickTop = topBase + gap * (i + 1)
          const cardHeight = card.getBoundingClientRect().height || 369
          const clipBottom =
            cardHeight > gap ? (100 * (cardHeight - gap)) / cardHeight : 0
          const isLast = i === cards.length - 1
          // El último no tiene otra card que lo frene: sin este pin el sticky
          // lo empuja hacia arriba mientras el resto sigue clavado.
          const lastHold = Math.round(Math.max(cardHeight, window.innerHeight * 0.45))

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
                  : `+=${lastHold}`,
                scrub: true,
              },
            },
          )

          if (isLast) {
            ScrollTrigger.create({
              trigger: containers[i],
              start: `top ${stickTop}px`,
              end: `+=${lastHold}`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
            })
          }

          if (!next || clipBottom <= 0) return

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
    }

    setup()

    const onResize = () => {
      if (window.innerWidth === lastWidth) {
        ScrollTrigger.refresh()
        return
      }
      lastWidth = window.innerWidth
      setup()
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      ctx?.revert()
    }
  }, [steps.length])

  return (
    <section
      ref={sectionRef}
      className="mt-5 pb-30"
    >
      {steps.map((step, i) => (
        <div
          key={step.title}
          className={`js-stacking-card-container${i === steps.length - 1 ? "" : " sticky"}`}
          style={{ top: stackTopBase + i * stackGap, zIndex: i + 1 }}
        >
          <div className="js-stacking-card">
            <StepCard step={step} index={i} />
          </div>
        </div>
      ))}
    </section>
  )
}
