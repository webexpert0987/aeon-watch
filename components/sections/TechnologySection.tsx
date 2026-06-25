'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'

const techNodes = [
  { x: 20, y: 30, label: 'Regulation AI', sub: '128 updates/sec' },
  { x: 60, y: 10, label: 'Temp Sensor', sub: '±0.01°C' },
  { x: 80, y: 40, label: 'Magnetometer', sub: '3-axis' },
  { x: 70, y: 70, label: 'Power Cell', sub: '72h reserve' },
  { x: 30, y: 75, label: 'Gyroscope', sub: '6 DOF' },
  { x: 10, y: 55, label: 'Barometer', sub: 'altitude' },
]

const techLines = [
  { x1: 20, y1: 30, x2: 60, y2: 10 },
  { x1: 60, y1: 10, x2: 80, y2: 40 },
  { x1: 80, y1: 40, x2: 70, y2: 70 },
  { x1: 70, y1: 70, x2: 30, y2: 75 },
  { x1: 30, y1: 75, x2: 10, y2: 55 },
  { x1: 10, y1: 55, x2: 20, y2: 30 },
  { x1: 20, y1: 30, x2: 70, y2: 70 },
]

export default function TechnologySection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#030308',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '15vh 8vw',
        gap: '8vw',
      }}
    >
      {/* Animated grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(200,169,122,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,122,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          mask: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Scan line */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(59,123,255,0.3), rgba(200,169,122,0.2), rgba(59,123,255,0.3), transparent)',
          zIndex: 2,
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Left: text content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '560px', flex: '0 0 auto' }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '10px', letterSpacing: '0.4em', color: '#3b7bff', textTransform: 'uppercase', marginBottom: '24px' }}>
            Neural Architecture
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(40px, 6vw, 88px)', fontWeight: 300, lineHeight: 0.95, color: '#eeeae4', marginBottom: '32px' }}>
            Intelligence<br /><em style={{ color: '#c8a97a', fontStyle: 'italic' }}>woven</em> into<br />mechanism
          </h2>
          <p style={{ fontFamily: 'var(--font-syne)', fontSize: '15px', lineHeight: 1.9, color: 'rgba(238,234,228,0.5)', marginBottom: '48px' }}>
            AEON's proprietary AI core monitors 47 parameters — temperature, altitude, wear pattern, magnetic field — updating the regulation spring 128 times per second.
          </p>

          <div style={{ display: 'flex', gap: '48px' }}>
            {[
              { value: '47', label: 'Sensors' },
              { value: '128x', label: 'Per second' },
              { value: '±0.1s', label: 'Daily deviation' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '40px', fontWeight: 300, color: '#c8a97a', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(238,234,228,0.4)', textTransform: 'uppercase', marginTop: '6px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right: tech diagram */}
      <div style={{ flex: 1, position: 'relative', height: '60vh', minWidth: '300px' }}>
        <svg
          viewBox="0 0 100 100"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connection lines */}
          {techLines.map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="rgba(200,169,122,0.2)"
              strokeWidth="0.3"
              strokeDasharray="40"
              initial={{ strokeDashoffset: 40 }}
              whileInView={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            />
          ))}

          {/* Nodes */}
          {techNodes.map((node, i) => (
            <g key={i}>
              <motion.circle
                cx={node.x} cy={node.y} r="1.5"
                fill="#c8a97a"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              />
              <motion.text
                x={node.x + (node.x > 50 ? -3 : 3)}
                y={node.y - 3}
                textAnchor={node.x > 50 ? 'end' : 'start'}
                fill="rgba(238,234,228,0.6)"
                fontSize="2.8"
                fontFamily="var(--font-syne)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                viewport={{ once: true }}
              >
                {node.label}
              </motion.text>
              <motion.text
                x={node.x + (node.x > 50 ? -3 : 3)}
                y={node.y}
                textAnchor={node.x > 50 ? 'end' : 'start'}
                fill="rgba(200,169,122,0.4)"
                fontSize="2.2"
                fontFamily="var(--font-space-mono)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                viewport={{ once: true }}
              >
                {node.sub}
              </motion.text>
            </g>
          ))}

          {/* Center core */}
          <motion.circle
            cx="45" cy="45" r="6"
            fill="none"
            stroke="rgba(200,169,122,0.3)"
            strokeWidth="0.4"
            strokeDasharray="38"
            initial={{ strokeDashoffset: 38, rotate: 0 }}
            whileInView={{ strokeDashoffset: 0 }}
            animate={{ rotate: 360 }}
            transition={{ strokeDashoffset: { duration: 2, ease: 'easeOut' }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
            viewport={{ once: true }}
          />
          <text x="45" y="43" textAnchor="middle" fill="rgba(200,169,122,0.7)" fontSize="3" fontFamily="var(--font-cormorant)">AE-AI</text>
          <text x="45" y="47.5" textAnchor="middle" fill="rgba(238,234,228,0.3)" fontSize="2" fontFamily="var(--font-space-mono)">CORE</text>

          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </section>
  )
}
