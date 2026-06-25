'use client'
import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useSpring(0, { stiffness: 400, damping: 28 })
  const y = useSpring(0, { stiffness: 400, damping: 28 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.4)
    y.set((e.clientY - centerY) * 0.4)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    padding: '16px 40px',
    fontFamily: 'var(--font-syne)',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'none',
    overflow: 'hidden',
    borderRadius: '2px',
    transition: 'background 0.3s',
  }

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: isHovered
      ? 'linear-gradient(135deg, #e8c99a, #c8a97a)'
      : 'linear-gradient(135deg, #c8a97a, #8a6a3a)',
    color: '#030308',
    boxShadow: isHovered ? '0 0 30px rgba(200,169,122,0.4)' : '0 0 15px rgba(200,169,122,0.2)',
  }

  const ghostStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'transparent',
    color: '#c8a97a',
    border: '1px solid rgba(200,169,122,0.4)',
    boxShadow: isHovered ? '0 0 20px rgba(200,169,122,0.2)' : 'none',
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y, ...(variant === 'primary' ? primaryStyle : ghostStyle) }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      className={className}
      data-cursor="hover"
    >
      {isHovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.6, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '60%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </motion.button>
  )
}
