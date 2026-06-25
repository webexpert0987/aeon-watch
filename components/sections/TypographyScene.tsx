'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { motion } from 'framer-motion'

const words = [
  { text: 'EXCELLENCE', align: 'flex-start', italic: false, outlined: false, color: '#eeeae4' },
  { text: 'PRECISION', align: 'flex-end', italic: true, outlined: false, color: '#c8a97a' },
  { text: 'ENDURANCE', align: 'center', italic: false, outlined: true, color: 'transparent' },
]

export default function TypographyScene() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const wordEls = sectionRef.current?.querySelectorAll('[data-word]')
      wordEls?.forEach((el) => {
        const split = new SplitType(el as HTMLElement, { types: 'chars' })
        gsap.fromTo(
          split.chars,
          { y: 120, opacity: 0, rotationY: -45, filter: 'blur(12px)' },
          {
            y: 0, opacity: 1, rotationY: 0, filter: 'blur(0px)',
            duration: 1.4, stagger: 0.035, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Parallax on words
      const wordContainers = sectionRef.current?.querySelectorAll('[data-word-container]')
      wordContainers?.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -60 : 60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#030308',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10vh 4vw',
        gap: '2vh',
        overflow: 'clip',
        position: 'relative',
      }}
    >
      {/* Background grid lines */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(200,169,122,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,122,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {words.map((word) => (
        <div
          key={word.text}
          data-word-container
          style={{
            display: 'flex',
            justifyContent: word.align,
            /* clip-path clips only Y (top/bottom = 0), the ±200% lets text overflow horizontally */
            clipPath: 'inset(0 -200% 0 -200%)',
          }}
        >
          <h2
            data-word
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(48px, 16vw, 240px)',
              fontWeight: word.italic ? 300 : 200,
              fontStyle: word.italic ? 'italic' : 'normal',
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              color: word.color,
              WebkitTextStroke: word.outlined ? '1.5px rgba(238,234,228,0.25)' : undefined,
              perspective: '1200px',
              transformStyle: 'preserve-3d',
              whiteSpace: 'nowrap',
            }}
          >
            {word.text}
          </h2>
        </div>
      ))}

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '0 2vw',
          marginTop: '4vh',
          transformOrigin: 'left center',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,169,122,0.3), transparent)' }} />
        <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(200,169,122,0.4)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Est. Geneva, MMXXIV
        </span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,169,122,0.3), transparent)' }} />
      </motion.div>
    </section>
  )
}
