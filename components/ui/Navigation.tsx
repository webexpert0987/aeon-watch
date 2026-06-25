'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

const navItems = ['Story', 'Design', 'Craft', 'Atelier']

export default function Navigation() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.03], [-20, 0])

  return (
    <motion.nav
      style={{ opacity, y }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '1px solid rgba(200,169,122,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#c8a97a',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '0.3em',
            color: '#eeeae4',
          }}
        >
          AEON
        </span>
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            data-cursor="hover"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(238,234,228,0.6)',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#c8a97a')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(238,234,228,0.6)')}
          >
            {item}
          </a>
        ))}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-space-mono)',
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: 'rgba(200,169,122,0.5)',
        }}
      >
        EST. MMXXIV
      </div>
    </motion.nav>
  )
}
