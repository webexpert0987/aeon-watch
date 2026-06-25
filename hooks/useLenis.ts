'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const lenis = new Lenis({
      duration: 2.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.6,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time: number) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    document.documentElement.classList.add('custom-cursor-active')

    return () => {
      lenis.destroy()
      lenisRef.current = null
      gsap.ticker.remove((time: number) => { lenis.raf(time * 1000) })
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return lenisRef
}
