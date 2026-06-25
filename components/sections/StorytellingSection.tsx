'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { motion } from 'framer-motion'

const paragraphs = [
  'A watch is not merely an instrument of time. It is a covenant between the maker and the wearer — a promise that the pursuit of perfection never ends.',
  'At AEON, we employ seven master watchmakers, each responsible for the complete assembly of a single piece from raw components to final regulation.',
  'Our atelier in Le Sentier has operated without interruption since 1847. The tools change. The hands that guide them carry the same knowledge.',
]

export default function StorytellingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const paras = sectionRef.current?.querySelectorAll('[data-para]')
      paras?.forEach((el) => {
        const split = new SplitType(el as HTMLElement, { types: 'lines' })
        gsap.fromTo(
          split.lines,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '20vh 0',
        background: '#030308',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Side label */}
      <div
        style={{
          position: 'absolute',
          left: '48px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center center',
          fontFamily: 'var(--font-space-mono)',
          fontSize: '10px',
          letterSpacing: '0.4em',
          color: 'rgba(200,169,122,0.3)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        The AEON Story
      </div>

      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 8vw 0 12vw',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          data-cursor="hover"
          style={{ marginBottom: '80px', cursor: 'default' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '10px',
              letterSpacing: '0.4em',
              color: 'rgba(200,169,122,0.6)',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Heritage
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1,
              color: '#eeeae4',
            }}
          >
            Seven generations<br />of stillness
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          {paragraphs.map((text, i) => (
            <p
              key={i}
              data-para
              data-cursor="hover"
              style={{
                fontFamily: i === 0 ? 'var(--font-cormorant)' : 'var(--font-syne)',
                fontSize: i === 0 ? 'clamp(20px, 2.5vw, 30px)' : '15px',
                fontWeight: i === 0 ? 300 : 400,
                fontStyle: i === 0 ? 'italic' : 'normal',
                lineHeight: i === 0 ? 1.5 : 1.9,
                color: i === 0 ? '#eeeae4' : 'rgba(238,234,228,0.5)',
                paddingLeft: i > 0 ? '32px' : '0',
                borderLeft: i > 0 ? '1px solid rgba(200,169,122,0.2)' : 'none',
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
