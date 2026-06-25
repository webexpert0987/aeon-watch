'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import WatchDisplay from '@/components/ui/WatchDisplay'
import { useMousePosition } from '@/hooks/useMousePosition'

// Generate deterministic CSS particle positions (no random() — SSR safe)
const CSS_PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 137.508) % 100,
  y: (i * 97.3) % 100,
  size: 1 + (i % 3),
  opacity: 0.2 + (i % 5) * 0.08,
  duration: 8 + (i % 6) * 2,
  delay: -(i % 8) * 1.5,
}))

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const mouse = useMousePosition()

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: 'chars' })
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 80, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            stagger: 0.04,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.to(glowRef.current, {
        scale: 1.4,
        opacity: 0.9,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
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
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15vh 8vw',
        textAlign: 'center',
      }}
    >
      {/* CSS particle backdrop */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        {CSS_PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: '#c8a97a',
              opacity: p.opacity,
            }}
            animate={{ y: [-10, 10, -10], opacity: [p.opacity, p.opacity * 1.8, p.opacity] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Central glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(200,169,122,0.1) 0%, rgba(59,123,255,0.03) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Watch returns — ghosted behind content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, filter: 'blur(20px)' }}
        whileInView={{ opacity: 0.15, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}
      >
        <WatchDisplay size={500} tiltX={mouse.normalY * -4} tiltY={mouse.normalX * 4} variant="heritage" />
      </motion.div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '10px',
            letterSpacing: '0.5em',
            color: 'rgba(200,169,122,0.6)',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          Limited to 88 pieces
        </div>

        <h2
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(60px, 12vw, 160px)',
            fontWeight: 200,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: '#eeeae4',
            marginBottom: '48px',
            perspective: '1000px',
          }}
        >
          Own Eternity
        </h2>

        <div ref={contentRef} style={{ opacity: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'rgba(238,234,228,0.45)',
              maxWidth: '480px',
              margin: '0 auto 48px',
            }}
          >
            Each AEON is numbered, certified, and accompanied by a letter from the watchmaker
            who built it. Beginning at CHF 38,000.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <MagneticButton variant="primary">Reserve Your Piece</MagneticButton>
            <MagneticButton variant="ghost">Visit the Atelier</MagneticButton>
          </div>

          <div
            style={{
              marginTop: '80px',
              fontFamily: 'var(--font-space-mono)',
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: 'rgba(200,169,122,0.25)',
              textTransform: 'uppercase',
            }}
          >
            © MMXXIV AEON Horlogerie — Geneva
          </div>
        </div>
      </div>
    </section>
  )
}
