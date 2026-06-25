'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export type WatchVariant = 'noir' | 'blanc' | 'sport' | 'heritage' | 'celeste'

interface WatchConfig {
  caseBg: string
  dialBg: string
  bezelColor: string
  handColor: string
  secondColor: string
  jewelColor: string
  brandText: string
  textColor: string
  markColor: string
}

const VARIANTS: Record<WatchVariant, WatchConfig> = {
  noir: {
    caseBg: 'radial-gradient(circle at {lx}% {ly}%, #2e2840 0%, #1a1520 40%, #0d0b14 100%)',
    dialBg: 'radial-gradient(ellipse at {dlx}% {dly}%, #18151f 0%, #0e0c14 50%, #080710 100%)',
    bezelColor: '#c8a97a',
    handColor: '#eeeae4',
    secondColor: '#ff3b3b',
    jewelColor: '#c8a97a',
    brandText: 'AEON',
    textColor: 'rgba(200,169,122,0.8)',
    markColor: '#c8a97a',
  },
  blanc: {
    caseBg: 'radial-gradient(circle at {lx}% {ly}%, #3d2818 0%, #2a1c10 40%, #180e08 100%)',
    dialBg: 'radial-gradient(ellipse at {dlx}% {dly}%, #f0ece4 0%, #e8e2d8 50%, #ddd6ca 100%)',
    bezelColor: '#c8887a',
    handColor: '#1a1520',
    secondColor: '#c8887a',
    jewelColor: '#c8887a',
    brandText: 'AEON',
    textColor: 'rgba(50,40,30,0.7)',
    markColor: 'rgba(50,40,30,0.7)',
  },
  sport: {
    caseBg: 'radial-gradient(circle at {lx}% {ly}%, #1a2030 0%, #101525 40%, #080c14 100%)',
    dialBg: 'radial-gradient(ellipse at {dlx}% {dly}%, #0e1520 0%, #0a1018 50%, #060c10 100%)',
    bezelColor: '#3b7bff',
    handColor: '#eeeae4',
    secondColor: '#ff8c00',
    jewelColor: '#3b7bff',
    brandText: 'AEON',
    textColor: 'rgba(100,160,255,0.7)',
    markColor: 'rgba(100,160,255,0.7)',
  },
  heritage: {
    caseBg: 'radial-gradient(circle at {lx}% {ly}%, #3d2800 0%, #2a1c00 40%, #1a1000 100%)',
    dialBg: 'radial-gradient(ellipse at {dlx}% {dly}%, #1e1400 0%, #150e00 50%, #0c0800 100%)',
    bezelColor: '#e8c960',
    handColor: '#e8d090',
    secondColor: '#ff6040',
    jewelColor: '#e8c960',
    brandText: 'AEON',
    textColor: 'rgba(232,200,96,0.75)',
    markColor: '#e8c960',
  },
  celeste: {
    caseBg: 'radial-gradient(circle at {lx}% {ly}%, #10202e 0%, #0c1820 40%, #080e14 100%)',
    dialBg: 'radial-gradient(ellipse at {dlx}% {dly}%, #0a1828 0%, #081220 50%, #040c14 100%)',
    bezelColor: '#7ab8e8',
    handColor: '#e8f0f8',
    secondColor: '#e84040',
    jewelColor: '#7ab8e8',
    brandText: 'AEON',
    textColor: 'rgba(122,184,232,0.7)',
    markColor: 'rgba(122,184,232,0.7)',
  },
}

interface WatchDisplayProps {
  size?: number
  tiltX?: number
  tiltY?: number
  scrollProgress?: number
  variant?: WatchVariant
  className?: string
}

export default function WatchDisplay({
  size = 380,
  tiltX = 0,
  tiltY = 0,
  scrollProgress = 0,
  variant = 'noir',
  className = '',
}: WatchDisplayProps) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0, ms: 0 })
  const rafRef = useRef<number>(0)

  // scrollProgress is accepted but not used for internal animation — caller may use it
  void scrollProgress

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime({
        h: now.getHours() % 12,
        m: now.getMinutes(),
        s: now.getSeconds(),
        ms: now.getMilliseconds(),
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const secondDeg = ((time.s + time.ms / 1000) / 60) * 360
  const minuteDeg = ((time.m + time.s / 60) / 60) * 360
  const hourDeg = ((time.h + time.m / 60) / 12) * 360

  const hourMarks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360
    const isMajor = i % 3 === 0
    return { angle, isMajor }
  })

  const lightX = tiltY * 2
  const lightY = tiltX * 2

  const cfg = VARIANTS[variant]

  // Interpolate the template positions into the gradient strings
  const caseBg = cfg.caseBg
    .replace('{lx}', String(50 + lightX))
    .replace('{ly}', String(50 + lightY))
  const dialBg = cfg.dialBg
    .replace('{dlx}', String(40 + lightX))
    .replace('{dly}', String(40 + lightY))

  // Bezel conic uses the variant accent color at the light angle
  const bezelBg = `conic-gradient(
    from ${120 + lightX * 3}deg,
    transparent 0deg,
    ${cfg.bezelColor}70 60deg,
    ${cfg.bezelColor}b0 90deg,
    ${cfg.bezelColor}70 120deg,
    transparent 180deg,
    ${cfg.bezelColor}20 270deg,
    transparent 360deg
  )`

  // For blanc, use a dark shadow ring; for others use brass
  const outerRingColor = variant === 'blanc' ? '#c8887a' : '#c8a97a'
  const outerRingGlow = variant === 'blanc'
    ? 'rgba(200,136,122,0.15)'
    : 'rgba(200,169,122,0.15)'

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
        perspective: 1200,
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        {/* Outer case */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: caseBg,
            boxShadow: `
              0 0 0 ${size * 0.025}px #0d0b14,
              0 0 0 ${size * 0.038}px ${outerRingColor},
              0 0 0 ${size * 0.045}px #0d0b14,
              0 ${size * 0.06}px ${size * 0.18}px rgba(0,0,0,0.9),
              0 ${size * 0.02}px ${size * 0.08}px rgba(0,0,0,0.6),
              inset 0 0 ${size * 0.15}px rgba(0,0,0,0.8),
              0 0 ${size * 0.25}px ${outerRingGlow}
            `,
          }}
        />

        {/* Bezel highlight arc */}
        <div
          style={{
            position: 'absolute',
            inset: `${size * 0.025}px`,
            borderRadius: '50%',
            background: bezelBg,
          }}
        />

        {/* Inner dial */}
        <div
          style={{
            position: 'absolute',
            inset: `${size * 0.06}px`,
            borderRadius: '50%',
            background: dialBg,
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9)',
          }}
        />

        {/* Subtle guilloche texture ring */}
        <div
          style={{
            position: 'absolute',
            inset: `${size * 0.065}px`,
            borderRadius: '50%',
            background: `repeating-conic-gradient(
              from 0deg,
              ${cfg.markColor}08 0deg 2deg,
              transparent 2deg 4deg
            )`,
          }}
        />

        {/* Hour markings */}
        {hourMarks.map(({ angle, isMajor }, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: isMajor ? size * 0.008 : size * 0.005,
              height: isMajor ? size * 0.072 : size * 0.045,
              marginLeft: isMajor ? -(size * 0.004) : -(size * 0.0025),
              marginTop: -(size * 0.415),
              transformOrigin: `50% ${size * 0.415}px`,
              transform: `rotate(${angle}deg)`,
              background: isMajor
                ? `linear-gradient(to bottom, ${cfg.markColor}, ${cfg.markColor}88)`
                : `${cfg.markColor}80`,
              borderRadius: 1,
            }}
          />
        ))}

        {/* AEON brand text */}
        <div
          style={{
            position: 'absolute',
            top: '38%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-cormorant)',
            fontSize: size * 0.052,
            fontWeight: 400,
            letterSpacing: '0.3em',
            color: cfg.textColor,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
          }}
        >
          {cfg.brandText}
        </div>

        {/* Hour hand */}
        <div
          style={{
            position: 'absolute',
            bottom: '50%',
            left: '50%',
            width: size * 0.016,
            height: size * 0.25,
            marginLeft: -(size * 0.008),
            transformOrigin: 'bottom center',
            transform: `rotate(${hourDeg}deg)`,
            background: `linear-gradient(to top, ${cfg.handColor}, ${cfg.handColor}b0)`,
            borderRadius: `${size * 0.008}px ${size * 0.008}px 0 0`,
            boxShadow: '0 0 4px rgba(0,0,0,0.8)',
          }}
        />

        {/* Minute hand */}
        <div
          style={{
            position: 'absolute',
            bottom: '50%',
            left: '50%',
            width: size * 0.011,
            height: size * 0.32,
            marginLeft: -(size * 0.0055),
            transformOrigin: 'bottom center',
            transform: `rotate(${minuteDeg}deg)`,
            background: `linear-gradient(to top, ${cfg.handColor}, ${cfg.handColor}99)`,
            borderRadius: `${size * 0.006}px ${size * 0.006}px 0 0`,
            boxShadow: '0 0 3px rgba(0,0,0,0.8)',
          }}
        />

        {/* Second hand */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size * 0.006,
            marginLeft: -(size * 0.003),
            transformOrigin: `50% ${size * 0.29}px`,
            transform: `translateY(-${size * 0.29}px) rotate(${secondDeg}deg)`,
            height: size * 0.42,
            background: `linear-gradient(to bottom, ${cfg.secondColor} 0%, ${cfg.secondColor} ${size * 0.29}px, ${cfg.secondColor}99 ${size * 0.29}px, transparent 100%)`,
          }}
        />

        {/* Second hand counterweight */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size * 0.006,
            marginLeft: -(size * 0.003),
            height: size * 0.1,
            transformOrigin: 'top center',
            transform: `rotate(${secondDeg + 180}deg) translateY(0px)`,
            background: cfg.secondColor,
            borderRadius: 2,
          }}
        />

        {/* Center jewel */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size * 0.045,
            height: size * 0.045,
            marginTop: -(size * 0.0225),
            marginLeft: -(size * 0.0225),
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${cfg.jewelColor}ff, ${cfg.jewelColor} 50%, ${cfg.jewelColor}66)`,
            boxShadow: `0 0 8px ${cfg.jewelColor}cc, inset 0 0 4px rgba(0,0,0,0.4)`,
          }}
        />

        {/* Crystal reflection highlight */}
        <div
          style={{
            position: 'absolute',
            inset: `${size * 0.06}px`,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at ${20 + lightX * 2}% ${15 + lightY * 2}%, rgba(255,255,255,0.06) 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Outer crystal sheen */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at ${15 + lightX * 3}% ${10 + lightY * 3}%, rgba(255,255,255,0.04) 0%, transparent 40%)`,
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </div>
  )
}
