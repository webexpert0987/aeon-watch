'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const isHovering = useRef(false)
  const scale = useMotionValue(1)

  const springX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.5 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.5 })
  const dotSpringX = useSpring(dotX, { stiffness: 400, damping: 30 })
  const dotSpringY = useSpring(dotY, { stiffness: 400, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 300, damping: 25 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20)
      cursorY.set(e.clientY - 20)
      dotX.set(e.clientX - 3)
      dotY.set(e.clientY - 3)
    }

    const onEnter = () => {
      isHovering.current = true
      scale.set(2.2)
    }

    const onLeave = () => {
      isHovering.current = false
      scale.set(1)
    }

    window.addEventListener('mousemove', move, { passive: true })

    const interactables = document.querySelectorAll('a, button, [data-cursor="hover"]')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const observer = new MutationObserver(() => {
      const fresh = document.querySelectorAll('a, button, [data-cursor="hover"]')
      fresh.forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [cursorX, cursorY, dotX, dotY, scale])

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          x: springX,
          y: springY,
          scale: springScale,
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid #c8a97a',
            background: 'rgba(200,169,122,0.08)',
          }}
        />
      </motion.div>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          x: dotSpringX,
          y: dotSpringY,
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: '#c8a97a',
            boxShadow: '0 0 8px rgba(200,169,122,0.8)',
          }}
        />
      </motion.div>
    </>
  )
}
