'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useMousePosition } from '@/hooks/useMousePosition'
import MagneticButton from '@/components/ui/MagneticButton'

const ParticleScene = dynamic(() => import('@/components/three/ParticleScene'), {
  ssr: false,
  loading: () => null,
})

function WatchCrown({ size }: { size: number }) {
  // Tube: thin stem from case to crown head
  const tubeW = Math.round(size * 0.018)
  const tubeH = Math.round(size * 0.032)
  // Head: knurled cylinder (the part you grip)
  const headW = Math.round(size * 0.068)
  const headH = Math.round(size * 0.088)
  const r = Math.round(headH * 0.3) // outer border-radius

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Tube — narrow connector, overlaps case ring */}
      <div style={{
        width: tubeW,
        height: tubeH,
        flexShrink: 0,
        background: 'linear-gradient(to bottom, #6a4e22 0%, #b8924a 30%, #d4aa60 50%, #b8924a 70%, #6a4e22 100%)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6), inset 0 -1px 2px rgba(0,0,0,0.6)',
      }} />
      {/* Crown head — cylindrical, knurled grip */}
      <div style={{
        width: headW,
        height: headH,
        flexShrink: 0,
        borderRadius: `1px ${r}px ${r}px 1px`,
        background: `repeating-linear-gradient(
          to bottom,
          #5c3e18 0px,
          #a07838 2px,
          #dab870 3.5px,
          #a07838 5px,
          #5c3e18 7px
        )`,
        boxShadow: `
          inset -4px 0 10px rgba(0,0,0,0.75),
          inset 2px 0 5px rgba(255,240,190,0.18),
          0 2px 6px rgba(0,0,0,0.5),
          0 -2px 6px rgba(0,0,0,0.5),
          5px 0 14px rgba(0,0,0,0.4)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Specular highlight — simulates cylinder curvature */}
        <div style={{
          position: 'absolute', left: '8%', top: 0, bottom: 0,
          width: '28%',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}

// Clamp progress for a phase window
function phase(progress: number, start: number, end: number) {
  return Math.max(0, Math.min(1, (progress - start) / (end - start)))
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Watch part refs — updated directly via DOM to avoid re-renders on every scroll frame
  const rigWrapRef   = useRef<HTMLDivElement>(null)  // exit fade wrapper
  const tiltRef      = useRef<HTMLDivElement>(null)  // perspective rotation target
  const glowRef      = useRef<HTMLDivElement>(null)
  const caseRef      = useRef<HTMLDivElement>(null)
  const bezelRef     = useRef<HTMLDivElement>(null)
  const dialRef      = useRef<HTMLDivElement>(null)
  const marksRef     = useRef<HTMLDivElement>(null)
  const handsRef     = useRef<HTMLDivElement>(null)
  const crystalRef   = useRef<HTMLDivElement>(null)
  const crownWrapRef = useRef<HTMLDivElement>(null)
  const textRef      = useRef<HTMLDivElement>(null)
  const hintRef      = useRef<HTMLDivElement>(null)

  // Mouse tilt for watch
  const mouse = useMousePosition()
  const rawTX = useMotionValue(0)
  const rawTY = useMotionValue(0)
  const tX = useSpring(rawTX, { stiffness: 100, damping: 20 })
  const tY = useSpring(rawTY, { stiffness: 100, damping: 20 })
  const [tXNum, setTXNum] = useState(0)
  const [tYNum, setTYNum] = useState(0)
  useMotionValueEvent(tX, 'change', v => setTXNum(v))
  useMotionValueEvent(tY, 'change', v => setTYNum(v))
  useEffect(() => {
    rawTX.set(mouse.normalX * 10)
    rawTY.set(mouse.normalY * 8)
  }, [mouse.normalX, mouse.normalY, rawTX, rawTY])

  // Live clock
  const [time, setTime] = useState({ h: 0, m: 0, s: 0, ms: 0 })
  const rafRef = useRef<number>(0)
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime({ h: now.getHours() % 12, m: now.getMinutes(), s: now.getSeconds(), ms: now.getMilliseconds() })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // ── Raw scroll listener — drives assembly animation directly via DOM ──────
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const update = () => {
      const rect = section.getBoundingClientRect()
      const totalScroll = section.offsetHeight - window.innerHeight
      // progress 0→1 as user scrolls through the 300vh section
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll))

      // Glow: 0–18%
      if (glowRef.current) {
        const p1 = phase(progress, 0, 0.18)
        glowRef.current.style.opacity = String(0.15 + p1 * 0.8)
        glowRef.current.style.transform = `scale(${0.5 + p1 * 0.5})`
      }

      // Crown: x 360→0 over 0–20%, opacity 0→1 over 0–17%
      if (crownWrapRef.current) {
        const x = 360 * (1 - phase(progress, 0, 0.20))
        const op = phase(progress, 0, 0.17)
        crownWrapRef.current.style.transform = `translateX(${x}px) translateY(-50%)`
        crownWrapRef.current.style.opacity = String(op)
      }

      // Case: scale 1.7→1 over 8–30%, opacity 0→1 over 8–26%
      if (caseRef.current) {
        const sc = 1.7 - phase(progress, 0.08, 0.30) * 0.7
        const op = phase(progress, 0.08, 0.26)
        caseRef.current.style.transform = `scale(${sc})`
        caseRef.current.style.opacity = String(op)
      }

      // Bezel: rotate 90→0 over 24–44%, scale 1.28→1, opacity 0→1 over 24–38%
      if (bezelRef.current) {
        const rot = 90 * (1 - phase(progress, 0.24, 0.44))
        const sc  = 1.28 - phase(progress, 0.24, 0.42) * 0.28
        const op  = phase(progress, 0.24, 0.38)
        bezelRef.current.style.transform = `rotate(${rot}deg) scale(${sc})`
        bezelRef.current.style.opacity = String(op)
      }

      // Dial: opacity 0→1, y 22→0 over 38–54%
      if (dialRef.current) {
        const op = phase(progress, 0.38, 0.54)
        const y  = 22 * (1 - phase(progress, 0.38, 0.54))
        dialRef.current.style.opacity = String(op)
        dialRef.current.style.transform = `translateY(${y}px)`
      }

      // Hour markers: opacity 0→1, scale 0.8→1 over 50–65%
      if (marksRef.current) {
        const op = phase(progress, 0.50, 0.65)
        const sc = 0.8 + phase(progress, 0.50, 0.65) * 0.2
        marksRef.current.style.opacity = String(op)
        marksRef.current.style.transform = `scale(${sc})`
      }

      // Hands: opacity 0→1 over 60–74%
      if (handsRef.current) {
        handsRef.current.style.opacity = String(phase(progress, 0.60, 0.74))
      }

      // Crystal: scale 1.35→1, opacity 0→1 over 70–84%
      if (crystalRef.current) {
        const sc = 1.35 - phase(progress, 0.70, 0.84) * 0.35
        const op = phase(progress, 0.70, 0.82)
        crystalRef.current.style.transform = `scale(${sc})`
        crystalRef.current.style.opacity = String(op)
      }

      // Tagline + CTA: opacity 0→1, y 36→0 over 80–93%
      if (textRef.current) {
        const op = phase(progress, 0.80, 0.93)
        const y  = 36 * (1 - phase(progress, 0.80, 0.93))
        textRef.current.style.opacity = String(op)
        textRef.current.style.transform = `translateY(${y}px)`
      }

      // Scroll hint: opacity 1→0 as soon as scroll starts (0–5%)
      if (hintRef.current) {
        hintRef.current.style.opacity = String(1 - phase(progress, 0, 0.05))
      }

      // Exit: rig scales + fades at 93–100%
      if (rigWrapRef.current) {
        const exitP = phase(progress, 0.93, 1.0)
        const sc  = 1 + exitP * 0.1
        const op  = 1 - exitP
        rigWrapRef.current.style.transform = `scale(${sc})`
        rigWrapRef.current.style.opacity = String(op)
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    update() // set initial state
    return () => window.removeEventListener('scroll', update)
  }, [])

  const S = 380
  const secondDeg  = ((time.s + time.ms / 1000) / 60) * 360
  const minuteDeg  = ((time.m + time.s / 60) / 60) * 360
  const hourDeg    = ((time.h + time.m / 60) / 12) * 360

  const hourMarks = Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * 360,
    isMajor: i % 3 === 0,
  }))

  const lx = tYNum * 1.5
  const ly = tXNum * 1.5

  return (
    <section ref={sectionRef} style={{ height: '300vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#030308',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Particle field */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <ParticleScene count={900} className="w-full h-full" />
        </div>

        {/* Film grain */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: '-50%', width: '200%', height: '200%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            zIndex: 9, pointerEvents: 'none', opacity: 0.35, mixBlendMode: 'overlay',
            animation: 'grain 0.5s steps(1) infinite',
          }}
        />

        {/* AEON masthead — always visible, entrance-only animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', top: '8%',
            left: 0, right: 0,
            textAlign: 'center', zIndex: 20, pointerEvents: 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-space-mono)', fontSize: '9px',
            letterSpacing: '0.5em', color: 'rgba(200,169,122,0.45)',
            textTransform: 'uppercase', marginBottom: '10px',
          }}>
            Ref. AE-001 — Cal. Manufacture
          </div>
          <h1 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(52px, 8vw, 110px)',
            fontWeight: 200, lineHeight: 1,
            letterSpacing: '0.22em', color: 'rgba(238,234,228,0.9)',
            margin: 0,
          }}>
            AEON
          </h1>
        </motion.div>

        {/* Side labels */}
        {(['left', 'right'] as const).map((side) => (
          <div
            key={side}
            style={{
              position: 'absolute', [side]: '28px', top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-space-mono)', fontSize: '8px',
              letterSpacing: '0.3em', color: 'rgba(200,169,122,0.18)',
              textTransform: 'uppercase', writingMode: 'vertical-rl', zIndex: 20,
            }}
          >
            {side === 'left' ? 'Est. Geneva MMXXIV' : 'Ref. AE-001'}
          </div>
        ))}

        {/* ── Watch assembly rig ── */}
        {/* Exit wrapper: scales + fades at end */}
        <div
          ref={rigWrapRef}
          style={{ position: 'relative', zIndex: 10, willChange: 'transform, opacity' }}
        >
          {/* 3D perspective tilt via motion value spring */}
          <div style={{ perspective: '1200px' }}>
            <div
              ref={tiltRef}
              style={{
                width: S, height: S, position: 'relative',
                transform: `rotateX(${tYNum * 0.4}deg) rotateY(${tXNum * 0.4}deg)`,
                willChange: 'transform',
              }}
            >
              {/* Ambient glow — starts at opacity 0.15, fills on scroll */}
              <div
                ref={glowRef}
                style={{
                  position: 'absolute', inset: -90, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(200,169,122,0.14) 0%, rgba(200,169,122,0.05) 45%, transparent 70%)',
                  filter: 'blur(24px)',
                  pointerEvents: 'none',
                  opacity: 0.15,
                  transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                }}
              />

              {/* LAYER 1 — Outer case ring (starts invisible) */}
              <div
                ref={caseRef}
                style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: `radial-gradient(circle at ${50 + lx}% ${50 + ly}%, #2e2840 0%, #1a1520 40%, #0d0b14 100%)`,
                  boxShadow: `
                    0 0 0 ${S * 0.025}px #0d0b14,
                    0 0 0 ${S * 0.038}px #c8a97a,
                    0 0 0 ${S * 0.048}px #0d0b14,
                    0 ${S * 0.06}px ${S * 0.2}px rgba(0,0,0,0.95),
                    0 0 ${S * 0.28}px rgba(200,169,122,0.15)
                  `,
                  opacity: 0, transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                }}
              />

              {/* LAYER 2 — Bezel ring (starts invisible, rotates in) */}
              <div
                ref={bezelRef}
                style={{
                  position: 'absolute', inset: `${S * 0.02}px`, borderRadius: '50%',
                  background: `conic-gradient(from ${120 + lx * 3}deg,
                    transparent 0deg,
                    rgba(200,169,122,0.45) 60deg,
                    rgba(232,201,154,0.7) 90deg,
                    rgba(200,169,122,0.45) 120deg,
                    transparent 180deg,
                    rgba(200,169,122,0.08) 270deg,
                    transparent 360deg)`,
                  opacity: 0, transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                }}
              />

              {/* LAYER 3 — Dial face */}
              <div
                ref={dialRef}
                style={{
                  position: 'absolute', inset: `${S * 0.062}px`, borderRadius: '50%',
                  background: `radial-gradient(ellipse at ${40 + lx}% ${40 + ly}%, #18151f 0%, #0e0c14 50%, #080710 100%)`,
                  boxShadow: 'inset 0 0 44px rgba(0,0,0,0.9)',
                  opacity: 0, overflow: 'hidden',
                  willChange: 'transform, opacity',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: `repeating-conic-gradient(from 0deg, rgba(200,169,122,0.022) 0deg 2deg, transparent 2deg 4deg)`,
                }} />
                <div style={{
                  position: 'absolute', top: '36%', left: '50%',
                  transform: 'translateX(-50%)',
                  fontFamily: 'var(--font-cormorant)', fontSize: S * 0.055,
                  fontWeight: 400, letterSpacing: '0.28em',
                  color: 'rgba(200,169,122,0.75)', whiteSpace: 'nowrap',
                }}>AEON</div>
                <div style={{
                  position: 'absolute', top: '44%', left: '50%',
                  transform: 'translateX(-50%)',
                  fontFamily: 'var(--font-space-mono)', fontSize: S * 0.023,
                  color: 'rgba(200,169,122,0.28)', whiteSpace: 'nowrap', letterSpacing: '0.14em',
                }}>CAL. AE-001</div>
              </div>

              {/* LAYER 4 — Hour markers */}
              <div
                ref={marksRef}
                style={{ position: 'absolute', inset: 0, opacity: 0, transformOrigin: 'center center' }}
              >
                {hourMarks.map(({ angle, isMajor }, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute', top: '50%', left: '50%',
                      width: isMajor ? S * 0.009 : S * 0.005,
                      height: isMajor ? S * 0.075 : S * 0.045,
                      marginLeft: isMajor ? -(S * 0.0045) : -(S * 0.0025),
                      marginTop: -(S * 0.418),
                      transformOrigin: `50% ${S * 0.418}px`,
                      transform: `rotate(${angle}deg)`,
                      background: isMajor
                        ? 'linear-gradient(to bottom, #e8c99a, #c8a97a)'
                        : 'rgba(200,169,122,0.5)',
                      borderRadius: 1,
                    }}
                  />
                ))}
                {Array.from({ length: 60 }, (_, i) => {
                  if (i % 5 === 0) return null
                  const a = (i / 60) * Math.PI * 2
                  const r = S * 0.415
                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: 2, height: 2, borderRadius: '50%',
                        marginTop: -1, marginLeft: -1,
                        background: 'rgba(200,169,122,0.22)',
                        transform: `translate(${Math.cos(a) * r}px, ${Math.sin(a) * r}px)`,
                      }}
                    />
                  )
                })}
              </div>

              {/* LAYER 5 — Watch hands */}
              <div
                ref={handsRef}
                style={{ position: 'absolute', inset: 0, opacity: 0, willChange: 'opacity' }}
              >
                <div style={{
                  position: 'absolute', bottom: '50%', left: '50%',
                  width: S * 0.018, height: S * 0.255, marginLeft: -(S * 0.009),
                  transformOrigin: 'bottom center', transform: `rotate(${hourDeg}deg)`,
                  background: 'linear-gradient(to top, #eeeae4, rgba(238,234,228,0.6))',
                  borderRadius: `${S * 0.009}px ${S * 0.009}px 0 0`,
                  boxShadow: '0 0 6px rgba(0,0,0,0.8)',
                }} />
                <div style={{
                  position: 'absolute', bottom: '50%', left: '50%',
                  width: S * 0.012, height: S * 0.335, marginLeft: -(S * 0.006),
                  transformOrigin: 'bottom center', transform: `rotate(${minuteDeg}deg)`,
                  background: 'linear-gradient(to top, #eeeae4, rgba(238,234,228,0.5))',
                  borderRadius: `${S * 0.006}px ${S * 0.006}px 0 0`,
                  boxShadow: '0 0 4px rgba(0,0,0,0.7)',
                }} />
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: S * 0.006, marginLeft: -(S * 0.003),
                  transformOrigin: `50% ${S * 0.29}px`,
                  transform: `translateY(-${S * 0.29}px) rotate(${secondDeg}deg)`,
                  height: S * 0.42,
                  background: `linear-gradient(to bottom, #ff3a3a 0%, #ff3a3a ${S * 0.29}px, transparent ${S * 0.29}px)`,
                }} />
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: S * 0.006, marginLeft: -(S * 0.003),
                  height: S * 0.09, transformOrigin: 'top center',
                  transform: `rotate(${secondDeg + 180}deg)`,
                  background: '#ff3a3a', borderRadius: 2,
                }} />
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: S * 0.048, height: S * 0.048,
                  marginTop: -(S * 0.024), marginLeft: -(S * 0.024),
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #e8c99a, #c8a97a 50%, #8a6a3a)',
                  boxShadow: `0 0 10px rgba(200,169,122,0.9), inset 0 0 4px rgba(0,0,0,0.4)`,
                }} />
              </div>

              {/* LAYER 6 — Crown (flies in from right) */}
              <div
                ref={crownWrapRef}
                style={{
                  position: 'absolute',
                  right: -S * 0.115,
                  top: '50%',
                  opacity: 0,
                  willChange: 'transform, opacity',
                }}
              >
                <WatchCrown size={S} />
              </div>

              {/* LAYER 7 — Sapphire crystal */}
              <div
                ref={crystalRef}
                style={{
                  position: 'absolute', inset: `${S * 0.062}px`, borderRadius: '50%',
                  background: `radial-gradient(ellipse at ${20 + lx * 2}% ${15 + ly * 2}%, rgba(255,255,255,0.07) 0%, transparent 55%)`,
                  boxShadow: `inset 0 0 30px rgba(255,255,255,0.02)`,
                  pointerEvents: 'none',
                  opacity: 0, transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                }}
              />
            </div>
          </div>
        </div>

        {/* Tagline + CTA — appears at 80–93% scroll */}
        <div
          style={{
            position: 'absolute', bottom: '13%', left: 0, right: 0,
            textAlign: 'center', zIndex: 20,
          }}
        >
          <div
            ref={textRef}
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          >
            <div style={{
              fontFamily: 'var(--font-space-mono)', fontSize: '10px',
              letterSpacing: '0.42em', color: 'rgba(200,169,122,0.6)',
              textTransform: 'uppercase', marginBottom: '20px',
            }}>
              Mechanical Intelligence — Limited to 88 Pieces
            </div>
            <p style={{
              fontFamily: 'var(--font-syne)', fontSize: '12px',
              letterSpacing: '0.22em', color: 'rgba(238,234,228,0.35)',
              textTransform: 'uppercase', margin: '0 0 28px',
            }}>
              Time, perfected.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <MagneticButton variant="primary">Discover</MagneticButton>
              <MagneticButton variant="ghost">Our Atelier</MagneticButton>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          style={{
            position: 'absolute', bottom: '28px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            zIndex: 30, pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-space-mono)', fontSize: '9px',
            letterSpacing: '0.35em', color: 'rgba(200,169,122,0.4)',
            textTransform: 'uppercase',
          }}>
            Scroll to assemble
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '1px', height: '36px',
              background: 'linear-gradient(to bottom, rgba(200,169,122,0.5), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
