'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 346, suffix: '', label: 'Hand-finished components' },
  { value: 4, suffix: ' days', label: 'Assembly time' },
  { value: 99, suffix: '%', label: 'In-house produced' },
  { value: 72, suffix: 'h', label: 'Power reserve' },
]

export default function Statistics() {
  return (
    <section
      style={{
        padding: '20vh 8vw',
        background: 'linear-gradient(180deg, #030308 0%, #0d0d1a 60%, #030308 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background text */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-cormorant)',
          fontSize: '30vw',
          fontWeight: 200,
          color: 'rgba(200,169,122,0.02)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        CRAFT
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '10px',
            letterSpacing: '0.4em',
            color: 'rgba(200,169,122,0.6)',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          By the numbers
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 300,
            color: '#eeeae4',
          }}
        >
          A legacy of precision
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2px',
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            whileHover="hovered"
            style={{
              padding: '56px 40px',
              borderTop: '1px solid rgba(200,169,122,0.12)',
              textAlign: 'center',
              cursor: 'default',
            }}
          >
            <motion.div
              variants={{ hovered: { scale: 1.08 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontWeight: 300,
                color: '#c8a97a',
                lineHeight: 1,
                marginBottom: '16px',
                filter: 'drop-shadow(0 0 20px rgba(200,169,122,0.3))',
                display: 'inline-block',
              }}
            >
              <CountUp target={stat.value} suffix={stat.suffix} />
            </motion.div>
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '12px',
                letterSpacing: '0.15em',
                color: 'rgba(238,234,228,0.4)',
                textTransform: 'uppercase',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              {stat.label}
              <motion.div
                variants={{ hovered: { scaleX: 1 } }}
                initial={{ scaleX: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #c8a97a, transparent)',
                  transformOrigin: 'left center',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
