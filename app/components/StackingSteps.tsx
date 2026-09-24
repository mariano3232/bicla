"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type Step = {
  title: string
  description: string
  misc: string
}

const STACK_GAP = 92

function StepCard({
  step,
  index,
}: {
  step: Step
  index: number
}) {
  return (
    <article className="relative flex h-[297px] justify-between bg-white border my-4 mx-20 px-10 pt-7 pb-18">

      <div className="absolute left-0 right-0 top-0 h-[1px]">
        <div className="absolute inset-0 origin-left bg-black-text/20" />
        <div className="js-progress-bar absolute inset-0 origin-left bg-gray-500"/>
      </div>

      <h2 className="font-mono text-[60px] font-medium leading-none">
        {String(index + 1).padStart(2, "0")}
      </h2>
      <div className="flex flex-col justify-between">
        <p className="w-[550px] font-sans font-medium text-[60px] leading-none">
          {step.title}
        </p>
        <p className="w-[330px] font-mono text-[15px] font-light whitespace-pre-line text-justify">
          {step.misc}
        </p>
      </div>
      <p className="w-[484px]self-start font-mono text-[16px] font-normal leading-[21px] tracking-[-0.02em] whitespace-pre-line">
        {step.description}
      </p>
    </article>
  )
}

export default function StackingSteps({ steps }: { steps: Step[] }) {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    if (!section) return

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>(".js-stacking-card"),
    )
    const containers = Array.from(
      section.querySelectorAll<HTMLElement>(".js-stacking-card-container"),
    )
    if (!cards.length) return

    const cardHeight = cards[0].getBoundingClientRect().height || 369
    const clipBottom = (100 * (cardHeight - STACK_GAP)) / cardHeight

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const bar = card.querySelector(".js-progress-bar")
        const next = containers[i + 1]
        const stickTop = STACK_GAP * i
        const nextStickTop = STACK_GAP * (i + 1)

        gsap.fromTo(
          bar,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: containers[i],
              start: `top ${stickTop}px`,
              end: next ? `top ${nextStickTop}px` : `bottom ${stickTop}px`,
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
              start: `top ${cardHeight}px`,
              end: `top ${nextStickTop}px`,
              scrub: true,
            },
          },
        )
      })
    }, section)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      ctx.revert()
    }
  }, [steps.length])

  return (
    <section id="modalidad" ref={sectionRef} className="mt-25">
      {steps.map((step, i) => (
        <div
          key={step.title}
          className="js-stacking-card-container sticky"
          style={{ top: i * STACK_GAP, zIndex: i + 1 }}
        >
          <div className="js-stacking-card">
            <StepCard step={step} index={i} />
          </div>
        </div>
      ))}
    </section>
  )
}
