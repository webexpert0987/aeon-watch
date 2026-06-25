'use client'
import { useEffect, useRef, useState } from 'react'

interface MousePosition {
  x: number
  y: number
  normalX: number
  normalY: number
  velocityX: number
  velocityY: number
}

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({
    x: 0, y: 0, normalX: 0, normalY: 0, velocityX: 0, velocityY: 0,
  })
  const prevPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      const normalX = (x / window.innerWidth) * 2 - 1
      const normalY = -((y / window.innerHeight) * 2 - 1)
      const velocityX = x - prevPos.current.x
      const velocityY = y - prevPos.current.y

      prevPos.current = { x, y }
      setPosition({ x, y, normalX, normalY, velocityX, velocityY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}
