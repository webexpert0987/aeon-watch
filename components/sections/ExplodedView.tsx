'use client'
import { motion } from 'framer-motion'

const parts = [
  { name: 'Mainspring', angle: 0, radius: 200, desc: 'Hand-wound, 72h reserve' },
  { name: 'Escapement', angle: 60, radius: 220, desc: 'Silicon lever & wheel' },
  { name: 'Balance', angle: 120, radius: 185, desc: '36,000 vph frequency' },
  { name: 'Jewels', angle: 180, radius: 210, desc: '31 synthetic rubies' },
  { name: 'Crown', angle: 240, radius: 200, desc: 'Signed, hand-knurled' },
  { name: 'Crystal', angle: 300, radius: 190, desc: 'Domed sapphire, AR' },
]

export default function ExplodedView() {
  return (
    <section
      style={{
        padding: '20vh 8vw',
        background: 'linear-gradient(180deg, #030308 0%, #0d0d1a 50%, #030308 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(200,169,122,0.6)', textTransform: 'uppercase', marginBottom: '16px' }}>
          Anatomy
        </div>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#eeeae4' }}>
          Every component,<br /><em style={{ color: '#c8a97a', fontStyle: 'italic' }}>exposed</em>
        </h2>
      </motion.div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          margin: '0 auto',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* SVG connector lines */}
        <svg
          viewBox="0 0 100 100"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {parts.map((part, i) => {
            const rad = (part.angle * Math.PI) / 180
            const nx = 50 + Math.cos(rad) * 35
            const ny = 50 + Math.sin(rad) * 35
            return (
              <motion.line
                key={i}
                x1="50" y1="50"
                x2={nx} y2={ny}
                stroke="rgba(200,169,122,0.15)"
                strokeWidth="0.2"
                strokeDasharray="4 2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
              />
            )
          })}

          {/* Pulsing center ring */}
          <motion.circle
            cx="50" cy="50" r="5"
            fill="none"
            stroke="rgba(200,169,122,0.4)"
            strokeWidth="0.3"
            animate={{ r: [5, 7, 5], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Center dial */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{
            width: 100, height: 100,
            borderRadius: '50%',
            border: '1px solid rgba(200,169,122,0.4)',
            background: 'rgba(10,9,16,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            boxShadow: '0 0 30px rgba(200,169,122,0.1)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '13px', letterSpacing: '0.15em', color: '#c8a97a' }}>AE-001</span>
        </motion.div>

        {/* Orbiting parts */}
        {parts.map((part, i) => {
          const rad = (part.angle * Math.PI) / 180
          const x = Math.cos(rad) * part.radius * 0.7
          const y = Math.sin(rad) * part.radius * 0.7
          return (
            <motion.div
              key={part.name}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
              whileInView={{ x, y, opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c8a97a', boxShadow: '0 0 12px rgba(200,169,122,0.7)' }} />
              <span style={{ fontFamily: 'var(--font-syne)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: '#eeeae4', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                {part.name}
              </span>
              <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '8px', color: 'rgba(238,234,228,0.35)', whiteSpace: 'nowrap' }}>
                {part.desc}
              </span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
