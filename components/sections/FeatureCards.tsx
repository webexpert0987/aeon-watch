'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const features = [
  {
    id: '01',
    title: 'In-House Caliber',
    desc: 'AE-001: 346 components, assembled by a single watchmaker over four days. Every bridge finished by hand.',
    icon: '⚙',
  },
  {
    id: '02',
    title: 'Perpetual AI',
    desc: 'Neural timekeeping: the movement learns your rhythm, anticipating wrist placement to optimize power reserve.',
    icon: '◈',
  },
  {
    id: '03',
    title: 'Geneva Seal',
    desc: 'Certified by the independent Hallmark of Geneva. The highest standard in Swiss watchmaking.',
    icon: '◇',
  },
  {
    id: '04',
    title: 'Sapphire Crystal',
    desc: '4mm domed sapphire with 18-layer anti-reflective coating. Near-zero reflection at any angle.',
    icon: '◻',
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotateX.set(((e.clientY - cy) / rect.height) * -15)
    rotateY.set(((e.clientX - cx) / rect.width) * 15)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      data-cursor="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
        hover: { y: -8, rotateX: 4, rotateY: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } },
      }}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '-80px' }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          padding: '40px 32px',
          background: 'rgba(26,20,40,0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(200,169,122,0.12)',
          borderRadius: '4px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,122,0.5)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(200,169,122,0.12)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,122,0.12)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '28px',
              color: 'rgba(200,169,122,0.6)',
            }}
          >
            {feature.icon}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '11px',
              color: 'rgba(200,169,122,0.35)',
              letterSpacing: '0.2em',
            }}
          >
            {feature.id}
          </span>
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '28px',
            fontWeight: 500,
            color: '#eeeae4',
            lineHeight: 1.1,
          }}
        >
          {feature.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '13px',
            lineHeight: 1.8,
            color: 'rgba(238,234,228,0.45)',
            marginTop: 'auto',
          }}
        >
          {feature.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function FeatureCards() {
  return (
    <section
      style={{
        padding: '20vh 8vw',
        background: 'linear-gradient(180deg, #030308 0%, #0d0d1a 50%, #030308 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        style={{ marginBottom: '80px' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '10px',
            letterSpacing: '0.4em',
            color: 'rgba(200,169,122,0.6)',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          Engineering Principles
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 300,
            color: '#eeeae4',
            lineHeight: 1.1,
          }}
        >
          Crafted beyond<br />
          <em style={{ color: '#c8a97a', fontStyle: 'italic' }}>specification</em>
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          perspective: '1200px',
        }}
      >
        {features.map((f, i) => (
          <FeatureCard key={f.id} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}
