'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'
import WatchDisplay from '@/components/ui/WatchDisplay'

export default function ProductReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mouse = useMousePosition()

  const tiltX = mouse.normalY * -6
  const tiltY = mouse.normalX * 6

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const textX   = useTransform(scrollYProgress, [0.08, 0.38], [-60, 0])
  const textOp  = useTransform(scrollYProgress, [0.08, 0.38], [0, 1])
  const specsX  = useTransform(scrollYProgress, [0.18, 0.48], [60, 0])
  const specsOp = useTransform(scrollYProgress, [0.18, 0.48], [0, 1])
  const watchOp = useTransform(scrollYProgress, [0.05, 0.30], [0, 1])
  const watchSc = useTransform(scrollYProgress, [0.05, 0.30], [0.85, 1])

  const specs = [
    { label: 'Movement', value: 'Cal. AE-01 Automatic' },
    { label: 'Power Reserve', value: '72 Hours' },
    { label: 'Crystal', value: 'Sapphire AR' },
    { label: 'Case', value: 'Grade 5 Titanium' },
    { label: 'Water Resistance', value: '100M' },
    { label: 'Frequency', value: '36,000 vph' },
  ]

  return (
    <section ref={sectionRef} style={{ height: '300vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          alignItems: 'center',
          padding: '0 80px',
          background: 'linear-gradient(135deg, #030308 0%, #0d0d1a 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Left editorial text */}
        <motion.div style={{ x: textX, opacity: textOp }}>
          <div style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'rgba(200,169,122,0.6)',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}>
            Reference AE-001
          </div>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 300,
            lineHeight: 1,
            color: '#eeeae4',
            marginBottom: '24px',
          }}>
            The<br />
            <em style={{ fontStyle: 'italic', color: '#c8a97a' }}>Perpetual</em><br />
            Edition
          </h2>
          <p style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'rgba(238,234,228,0.5)',
            maxWidth: '280px',
          }}>
            An in-house movement beats at the heart of every AEON.
            346 hand-finished components, assembled over four days.
          </p>
        </motion.div>

        {/* Center watch */}
        <motion.div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: watchOp, scale: watchSc,
          }}
        >
          <WatchDisplay size={400} tiltX={tiltX} tiltY={tiltY} variant="blanc" />
        </motion.div>

        {/* Right specs */}
        <motion.div style={{ x: specsX, opacity: specsOp, paddingLeft: '40px' }}>
          <div style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'rgba(200,169,122,0.6)',
            marginBottom: '32px',
            textTransform: 'uppercase',
          }}>
            Specifications
          </div>
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(200,169,122,0.1)',
                padding: '14px 0',
                cursor: 'default',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: 'rgba(238,234,228,0.4)',
                textTransform: 'uppercase',
              }}>
                {spec.label}
              </span>
              <motion.span
                whileHover={{ color: '#c8a97a' }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: '11px',
                  color: '#eeeae4',
                }}
              >
                {spec.value}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
