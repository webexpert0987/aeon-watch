'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

// ── Luxury SVG illustrations ─────────────────────────────────────────────────

function MovementIllustration() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="mg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8a97a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#c8a97a" stopOpacity="0" />
        </radialGradient>
        <filter id="mglow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ambient glow */}
      <circle cx="200" cy="200" r="180" fill="url(#mg1)" />

      {/* Main gear — 24 teeth */}
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2
        const r1 = 115, r2 = 130
        const x1 = 200 + Math.cos(a) * r1, y1 = 200 + Math.sin(a) * r1
        const x2 = 200 + Math.cos(a) * r2, y2 = 200 + Math.sin(a) * r2
        const a2 = ((i + 0.4) / 24) * Math.PI * 2
        const x3 = 200 + Math.cos(a2) * r2, y3 = 200 + Math.sin(a2) * r2
        const x4 = 200 + Math.cos(a2) * r1, y4 = 200 + Math.sin(a2) * r1
        return (
          <path key={i}
            d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`}
            fill="rgba(200,169,122,0.35)" stroke="rgba(200,169,122,0.6)" strokeWidth="0.5"
          />
        )
      })}

      {/* Main gear body */}
      <circle cx="200" cy="200" r="115" fill="none" stroke="rgba(200,169,122,0.4)" strokeWidth="1" />
      <circle cx="200" cy="200" r="88" fill="rgba(10,9,16,0.6)" stroke="rgba(200,169,122,0.25)" strokeWidth="0.5" />
      {/* Spokes */}
      {[0,60,120,180,240,300].map((deg, i) => {
        const a = deg * Math.PI / 180
        return (
          <line key={i}
            x1={200 + Math.cos(a) * 20} y1={200 + Math.sin(a) * 20}
            x2={200 + Math.cos(a) * 85} y2={200 + Math.sin(a) * 85}
            stroke="rgba(200,169,122,0.3)" strokeWidth="3" strokeLinecap="round"
          />
        )
      })}
      <circle cx="200" cy="200" r="20" fill="rgba(200,169,122,0.15)" stroke="rgba(200,169,122,0.5)" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="7" fill="rgba(200,169,122,0.7)" />

      {/* Escape wheel — top right */}
      {Array.from({ length: 15 }, (_, i) => {
        const a = (i / 15) * Math.PI * 2
        const r = 42, rp = 52
        const x1 = 310 + Math.cos(a) * r, y1 = 110 + Math.sin(a) * r
        const ap = ((i + 0.15) / 15) * Math.PI * 2
        const x2 = 310 + Math.cos(ap) * rp, y2 = 110 + Math.sin(ap) * rp
        const a3 = ((i + 0.5) / 15) * Math.PI * 2
        const x3 = 310 + Math.cos(a3) * r, y3 = 110 + Math.sin(a3) * r
        return (
          <path key={i}
            d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} Z`}
            fill="rgba(200,169,122,0.4)" stroke="rgba(200,169,122,0.6)" strokeWidth="0.4"
          />
        )
      })}
      <circle cx="310" cy="110" r="18" fill="none" stroke="rgba(200,169,122,0.3)" strokeWidth="0.8" />
      <circle cx="310" cy="110" r="6" fill="rgba(200,169,122,0.5)" />

      {/* Swiss lever */}
      <path d="M 310 110 L 295 155 L 325 155 Z" fill="rgba(200,169,122,0.15)" stroke="rgba(200,169,122,0.4)" strokeWidth="0.8" />
      <path d="M 295 155 L 280 165 M 325 155 L 338 165" stroke="rgba(200,169,122,0.5)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Balance wheel — bottom left */}
      <circle cx="90" cy="290" r="50" fill="none" stroke="rgba(200,169,122,0.35)" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="90" cy="290" r="36" fill="none" stroke="rgba(200,169,122,0.2)" strokeWidth="0.5" />
      {[0,90,180,270].map((deg, i) => {
        const a = deg * Math.PI / 180
        return (
          <line key={i}
            x1={90 + Math.cos(a) * 10} y1={290 + Math.sin(a) * 10}
            x2={90 + Math.cos(a) * 35} y2={290 + Math.sin(a) * 35}
            stroke="rgba(200,169,122,0.4)" strokeWidth="2" strokeLinecap="round"
          />
        )
      })}
      <circle cx="90" cy="290" r="10" fill="rgba(200,169,122,0.1)" stroke="rgba(200,169,122,0.5)" strokeWidth="1" />
      <circle cx="90" cy="290" r="3" fill="rgba(200,169,122,0.8)" />

      {/* Hairspring spiral */}
      {Array.from({ length: 5 }, (_, i) => {
        const r = 14 + i * 5
        return <circle key={i} cx="90" cy="290" r={r} fill="none" stroke="rgba(200,169,122,0.15)" strokeWidth="0.4" />
      })}

      {/* Connecting rod */}
      <path d="M 168 200 Q 240 140 310 110" stroke="rgba(200,169,122,0.2)" strokeWidth="1" fill="none" strokeDasharray="3 4" />
      <path d="M 142 260 Q 100 275 90 290" stroke="rgba(200,169,122,0.2)" strokeWidth="1" fill="none" strokeDasharray="3 4" />

      {/* Fine detail lines */}
      <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(200,169,122,0.04)" strokeWidth="1" />
    </svg>
  )
}

function DialIllustration() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="dg1" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#e8c99a" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#c8a97a" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#c8a97a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#18151f" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#080710" stopOpacity="0.7" />
        </radialGradient>
      </defs>

      {/* Dial face */}
      <circle cx="200" cy="200" r="170" fill="url(#dg2)" stroke="rgba(200,169,122,0.3)" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="170" fill="url(#dg1)" />

      {/* Guilloché en soleil — radiating lines */}
      {Array.from({ length: 180 }, (_, i) => {
        const a = (i / 180) * Math.PI * 2
        const r1 = 8, r2 = 160
        const x1 = 200 + Math.cos(a) * r1, y1 = 200 + Math.sin(a) * r1
        const x2 = 200 + Math.cos(a) * r2, y2 = 200 + Math.sin(a) * r2
        const op = i % 4 === 0 ? 0.18 : 0.06
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={`rgba(200,169,122,${op})`} strokeWidth="0.4"
          />
        )
      })}

      {/* Concentric chapter rings */}
      {[155, 140, 125].map((r, i) => (
        <circle key={i} cx="200" cy="200" r={r}
          fill="none" stroke={`rgba(200,169,122,${0.08 - i * 0.02})`} strokeWidth={1 - i * 0.2}
        />
      ))}

      {/* Hour indices */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2
        const r1 = 142, r2 = i % 3 === 0 ? 125 : 132
        const w = i % 3 === 0 ? 3 : 1.5
        return (
          <line key={i}
            x1={200 + Math.cos(a) * r1} y1={200 + Math.sin(a) * r1}
            x2={200 + Math.cos(a) * r2} y2={200 + Math.sin(a) * r2}
            stroke={i % 3 === 0 ? 'rgba(232,201,154,0.9)' : 'rgba(200,169,122,0.6)'}
            strokeWidth={w} strokeLinecap="round"
          />
        )
      })}

      {/* Minute dots */}
      {Array.from({ length: 60 }, (_, i) => {
        if (i % 5 === 0) return null
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2
        const r = 138
        return (
          <circle key={i}
            cx={200 + Math.cos(a) * r} cy={200 + Math.sin(a) * r}
            r={1} fill="rgba(200,169,122,0.35)"
          />
        )
      })}

      {/* Sub-dial at 6 o'clock */}
      <circle cx="200" cy="315" r="28" fill="rgba(8,7,16,0.6)" stroke="rgba(200,169,122,0.2)" strokeWidth="0.8" />
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i / 60) * Math.PI * 2
        const r1 = 22, r2 = 26
        return <line key={i}
          x1={200 + Math.cos(a) * r1} y1={315 + Math.sin(a) * r1}
          x2={200 + Math.cos(a) * r2} y2={315 + Math.sin(a) * r2}
          stroke="rgba(200,169,122,0.2)" strokeWidth="0.4"
        />
      })}

      {/* AEON text position marker */}
      <rect x="172" y="138" width="56" height="10" rx="1" fill="rgba(200,169,122,0.08)" stroke="rgba(200,169,122,0.2)" strokeWidth="0.5" />
      <line x1="185" y1="143" x2="215" y2="143" stroke="rgba(200,169,122,0.4)" strokeWidth="0.5" />

      {/* Hands */}
      <line x1="200" y1="200" x2="200" y2="100" stroke="rgba(238,234,228,0.85)" strokeWidth="4" strokeLinecap="round" />
      <line x1="200" y1="200" x2="252" y2="185" stroke="rgba(238,234,228,0.75)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="200" y1="200" x2="200" y2="80" stroke="rgba(255,59,59,0.8)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="200" cy="200" r="6" fill="rgba(200,169,122,0.9)" />
      <circle cx="200" cy="200" r="3" fill="#eeeae4" />

      {/* Outer bezel ring */}
      <circle cx="200" cy="200" r="178" fill="none" stroke="rgba(200,169,122,0.15)" strokeWidth="14" />
      <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(200,169,122,0.3)" strokeWidth="1" />
    </svg>
  )
}

function CaseIllustration() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b7bff" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#5b9bff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#1a3a6a" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="cg2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(232,201,154,0.4)" />
          <stop offset="40%" stopColor="rgba(200,169,122,0.2)" />
          <stop offset="100%" stopColor="rgba(200,169,122,0.05)" />
        </linearGradient>
        <filter id="cglow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Subtle ambient */}
      <rect x="0" y="0" width="400" height="400" fill="url(#cg1)" />

      {/* Case body — front face */}
      <rect x="100" y="80" width="200" height="240" rx="52" fill="rgba(18,14,24,0.7)" stroke="url(#cg2)" strokeWidth="2" />

      {/* Brushed titanium texture — horizontal lines */}
      {Array.from({ length: 48 }, (_, i) => {
        const y = 90 + i * 4.8
        if (y > 308) return null
        const opacity = 0.03 + Math.sin(i * 0.4) * 0.015
        return (
          <line key={i} x1="108" y1={y} x2="292" y2={y}
            stroke={`rgba(200,169,122,${opacity.toFixed(3)})`} strokeWidth="0.6"
          />
        )
      })}

      {/* Case highlight — top edge shimmer */}
      <path d="M 152 80 Q 200 76 248 80" stroke="rgba(232,201,154,0.6)" strokeWidth="1.5" fill="none" />
      <path d="M 100 132 Q 96 200 100 268" stroke="rgba(200,169,122,0.3)" strokeWidth="1" fill="none" />
      <path d="M 300 132 Q 304 200 300 268" stroke="rgba(200,169,122,0.15)" strokeWidth="0.6" fill="none" />

      {/* Lug — top left */}
      <path d="M 120 80 Q 106 60 110 42 L 130 42 Q 136 58 140 80 Z"
        fill="rgba(14,12,20,0.8)" stroke="rgba(200,169,122,0.35)" strokeWidth="1" />
      {/* Lug — top right */}
      <path d="M 280 80 Q 294 60 290 42 L 270 42 Q 264 58 260 80 Z"
        fill="rgba(14,12,20,0.8)" stroke="rgba(200,169,122,0.35)" strokeWidth="1" />
      {/* Lug — bottom left */}
      <path d="M 120 320 Q 106 340 110 358 L 130 358 Q 136 342 140 320 Z"
        fill="rgba(14,12,20,0.8)" stroke="rgba(200,169,122,0.35)" strokeWidth="1" />
      {/* Lug — bottom right */}
      <path d="M 280 320 Q 294 340 290 358 L 270 358 Q 264 342 260 320 Z"
        fill="rgba(14,12,20,0.8)" stroke="rgba(200,169,122,0.35)" strokeWidth="1" />

      {/* Crown — right side */}
      <rect x="300" y="185" width="22" height="30" rx="4"
        fill="rgba(18,14,24,0.8)" stroke="rgba(200,169,122,0.5)" strokeWidth="1.2" />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1="301" y1={187 + i * 4.5} x2="321" y2={187 + i * 4.5}
          stroke="rgba(200,169,122,0.3)" strokeWidth="0.5"
        />
      ))}

      {/* Dial face — inner view */}
      <rect x="112" y="92" width="176" height="216" rx="44"
        fill="rgba(8,7,16,0.9)" stroke="rgba(200,169,122,0.12)" strokeWidth="1" />

      {/* Simplified dial with radiating lines */}
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i / 60) * Math.PI * 2
        const cx = 200, cy = 200
        return (
          <line key={i}
            x1={cx + Math.cos(a) * 6} y1={cy + Math.sin(a) * 6}
            x2={cx + Math.cos(a) * 78} y2={cy + Math.sin(a) * 78}
            stroke={`rgba(200,169,122,${i % 5 === 0 ? 0.12 : 0.04})`} strokeWidth="0.4"
          />
        )
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2
        const isMajor = i % 3 === 0
        return (
          <line key={i}
            x1={200 + Math.cos(a) * 72} y1={200 + Math.sin(a) * 72}
            x2={200 + Math.cos(a) * (isMajor ? 60 : 66)} y2={200 + Math.sin(a) * (isMajor ? 60 : 66)}
            stroke={isMajor ? 'rgba(232,201,154,0.7)' : 'rgba(200,169,122,0.4)'}
            strokeWidth={isMajor ? 2.5 : 1.2} strokeLinecap="round"
          />
        )
      })}

      {/* Simple hands */}
      <line x1="200" y1="200" x2="200" y2="140" stroke="rgba(238,234,228,0.7)" strokeWidth="3" strokeLinecap="round" />
      <line x1="200" y1="200" x2="240" y2="200" stroke="rgba(238,234,228,0.6)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="200" cy="200" r="4" fill="#c8a97a" />

      {/* Reference engraving on case back hint */}
      <text x="200" y="370" textAnchor="middle" fontFamily="var(--font-space-mono)" fontSize="8"
        fill="rgba(200,169,122,0.25)" letterSpacing="2">REF. AE-001 · GR5 Ti</text>

      {/* Subtle reflection sweep */}
      <path d="M 100 130 Q 150 90 200 88 Q 250 86 300 130"
        stroke="rgba(255,255,255,0.04)" strokeWidth="20" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function CrystalIllustration() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="crg1" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="40%" stopColor="rgba(200,169,122,0.05)" />
          <stop offset="100%" stopColor="rgba(200,169,122,0)" />
        </radialGradient>
        <radialGradient id="crg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b7bff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#3b7bff" stopOpacity="0" />
        </radialGradient>
        <filter id="cfglow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="200" cy="200" rx="160" ry="160" fill="url(#crg2)" />

      {/* Sapphire dome — outer shape */}
      <ellipse cx="200" cy="215" rx="155" ry="145" fill="rgba(12,10,22,0.3)" stroke="rgba(200,169,122,0.2)" strokeWidth="1.5" />
      <ellipse cx="200" cy="200" rx="155" ry="115" fill="rgba(16,14,26,0.15)" stroke="rgba(200,169,122,0.3)" strokeWidth="1" />

      {/* Crystal body — multiple dome slices showing curvature */}
      {Array.from({ length: 12 }, (_, i) => {
        const t = i / 11
        const rx = 155 - t * 50
        const ry = 115 - t * 80
        const cy = 200 + t * 20
        if (ry < 5) return null
        return (
          <ellipse key={i} cx="200" cy={cy} rx={rx} ry={ry}
            fill="none"
            stroke={`rgba(200,169,122,${0.04 + t * 0.02})`}
            strokeWidth="0.5"
          />
        )
      })}

      {/* Internal refraction lines */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        const x1 = 200 + Math.cos(a) * 20, y1 = 200 + Math.sin(a) * 15
        const x2 = 200 + Math.cos(a) * 100, y2 = 200 + Math.sin(a) * 80
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeLinecap="round"
          />
        )
      })}

      {/* Light caustic — top refraction */}
      <path d="M 120 140 Q 160 100 200 95 Q 240 100 280 140"
        stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M 140 130 Q 170 108 200 105 Q 230 108 260 130"
        stroke="rgba(200,169,122,0.12)" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* Iridescent shimmer lines */}
      <path d="M 80 175 Q 140 155 200 152 Q 260 155 320 175"
        stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
      <path d="M 70 195 Q 135 175 200 172 Q 265 175 330 195"
        stroke="rgba(200,169,122,0.06)" strokeWidth="0.8" fill="none" />

      {/* AR coating effect — fine concentric ellipses */}
      {[130, 110, 90, 70].map((rx, i) => (
        <ellipse key={i} cx="200" cy="200" rx={rx} ry={rx * 0.72}
          fill="none" stroke="rgba(59,123,255,0.04)" strokeWidth="0.5"
        />
      ))}

      {/* Top highlight sparkle */}
      <circle cx="165" cy="152" r="3" fill="rgba(255,255,255,0.3)" filter="url(#cfglow)" />
      <circle cx="155" cy="158" r="1.5" fill="rgba(255,255,255,0.2)" />
      <line x1="162" y1="148" x2="168" y2="156" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      <line x1="158" y1="149" x2="172" y2="155" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

      {/* Depth dial visible through crystal */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2
        const r = 100
        return (
          <line key={i}
            x1={200 + Math.cos(a) * r} y1={210 + Math.sin(a) * r * 0.72}
            x2={200 + Math.cos(a) * 90} y2={210 + Math.sin(a) * 90 * 0.72}
            stroke="rgba(200,169,122,0.14)" strokeWidth={i % 3 === 0 ? 1.5 : 0.8} strokeLinecap="round"
          />
        )
      })}

      {/* Edge ring — the bezel attachment */}
      <ellipse cx="200" cy="215" rx="158" ry="148" fill="none" stroke="rgba(200,169,122,0.35)" strokeWidth="2.5" />
      <ellipse cx="200" cy="215" rx="164" ry="153" fill="none" stroke="rgba(200,169,122,0.12)" strokeWidth="1" />

      {/* Label */}
      <text x="200" y="370" textAnchor="middle" fontFamily="var(--font-space-mono)" fontSize="8"
        fill="rgba(200,169,122,0.2)" letterSpacing="2">SAPPHIRE · 4mm DOME · AR COATING</text>
    </svg>
  )
}

function CrownIllustration() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="cwg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(200,169,122,0.3)" />
          <stop offset="30%" stopColor="rgba(232,201,154,0.6)" />
          <stop offset="60%" stopColor="rgba(200,169,122,0.4)" />
          <stop offset="100%" stopColor="rgba(138,106,58,0.2)" />
        </linearGradient>
        <linearGradient id="cwg2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(232,201,154,0.5)" />
          <stop offset="50%" stopColor="rgba(200,169,122,0.2)" />
          <stop offset="100%" stopColor="rgba(138,106,58,0.3)" />
        </linearGradient>
        <radialGradient id="cwg3" cx="30%" cy="25%" r="60%">
          <stop offset="0%" stopColor="rgba(232,201,154,0.1)" />
          <stop offset="100%" stopColor="rgba(200,169,122,0)" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="400" height="400" fill="url(#cwg3)" />

      {/* Crown stem connecting to case */}
      <rect x="72" y="185" width="55" height="30" rx="4"
        fill="rgba(14,12,20,0.9)" stroke="rgba(200,169,122,0.4)" strokeWidth="1.5" />
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1="73" y1={190 + i * 5} x2="126" y2={190 + i * 5}
          stroke="rgba(200,169,122,0.2)" strokeWidth="0.5"
        />
      ))}

      {/* Crown body — main cylinder perspective */}
      <rect x="127" y="156" width="200" height="88" rx="8"
        fill="rgba(16,14,26,0.85)" stroke="url(#cwg1)" strokeWidth="2" />

      {/* Knurling pattern — vertical ridges */}
      {Array.from({ length: 40 }, (_, i) => {
        const x = 133 + i * 4.9
        if (x > 320) return null
        const op = i % 2 === 0 ? 0.22 : 0.08
        return (
          <line key={i} x1={x} y1="156" x2={x} y2="244"
            stroke={`rgba(200,169,122,${op})`} strokeWidth={i % 2 === 0 ? 1 : 0.4}
          />
        )
      })}

      {/* Knurling — horizontal grooves */}
      {Array.from({ length: 18 }, (_, i) => {
        const y = 160 + i * 4.7
        return (
          <line key={i} x1="127" y1={y} x2="327" y2={y}
            stroke={`rgba(200,169,122,${i % 3 === 0 ? 0.12 : 0.05})`} strokeWidth="0.4"
          />
        )
      })}

      {/* Cross-hatch diamonds from knurling intersection */}
      {Array.from({ length: 12 }, (_, i) => {
        const x = 145 + i * 16
        const y1 = 160, y2 = 244
        return (
          <g key={i}>
            <line x1={x-3} y1={y1} x2={x+3} y2={y2} stroke="rgba(200,169,122,0.06)" strokeWidth="0.4" />
            <line x1={x+3} y1={y1} x2={x-3} y2={y2} stroke="rgba(200,169,122,0.06)" strokeWidth="0.4" />
          </g>
        )
      })}

      {/* Top face highlight */}
      <rect x="127" y="156" width="200" height="8" rx="4"
        fill="url(#cwg2)" opacity="0.8" />

      {/* Bottom edge */}
      <rect x="127" y="236" width="200" height="8" rx="4"
        fill="rgba(100,80,40,0.3)" />

      {/* Left face (3D illusion) */}
      <path d="M 127 156 L 72 168 L 72 232 L 127 244 Z"
        fill="rgba(10,8,16,0.7)" stroke="rgba(200,169,122,0.3)" strokeWidth="1" />
      {Array.from({ length: 8 }, (_, i) => {
        const y = 168 + i * 8
        return (
          <line key={i} x1="72" y1={y} x2="127" y2={y - 7.5}
            stroke="rgba(200,169,122,0.08)" strokeWidth="0.4"
          />
        )
      })}

      {/* Right end cap */}
      <ellipse cx="327" cy="200" rx="8" ry="44"
        fill="rgba(10,8,16,0.8)" stroke="rgba(200,169,122,0.35)" strokeWidth="1.5" />

      {/* AEON engraving on crown */}
      <text x="230" y="205" textAnchor="middle" fontFamily="var(--font-cormorant)" fontSize="14"
        fill="rgba(200,169,122,0.35)" letterSpacing="4">AEON</text>

      {/* Reflection highlight streak */}
      <path d="M 140 158 Q 230 154 315 158" stroke="rgba(255,255,255,0.06)" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M 148 160 Q 230 157 312 160" stroke="rgba(255,255,255,0.04)" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Push-pull position markers */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={340 + i * 12} cy="200" r="3.5"
          fill="rgba(200,169,122,0.15)" stroke="rgba(200,169,122,0.4)" strokeWidth="0.8"
        />
      ))}
      <line x1="341" y1="200" x2="363" y2="200" stroke="rgba(200,169,122,0.2)" strokeWidth="0.6" />

      <text x="200" y="370" textAnchor="middle" fontFamily="var(--font-space-mono)" fontSize="8"
        fill="rgba(200,169,122,0.2)" letterSpacing="2">HAND-KNURLED · 5.2mm DIAMETER</text>
    </svg>
  )
}

const ILLUSTRATIONS = [MovementIllustration, DialIllustration, CaseIllustration, CrystalIllustration, CrownIllustration]

const gallery = [
  { id: '01', title: 'The Movement', sub: 'Cal. AE-001 in detail', bg: 'radial-gradient(ellipse at 35% 30%, #1e1a2e 0%, #0d0b14 100%)', accent: '#c8a97a' },
  { id: '02', title: 'The Dial', sub: 'Guilloché en soleil', bg: 'radial-gradient(ellipse at 65% 30%, #181410 0%, #0a0808 100%)', accent: '#e8c99a' },
  { id: '03', title: 'The Case', sub: 'Grade 5 Titanium', bg: 'radial-gradient(ellipse at 35% 65%, #0e1220 0%, #060810 100%)', accent: '#3b7bff' },
  { id: '04', title: 'The Crystal', sub: 'Sapphire, 4mm domed', bg: 'radial-gradient(ellipse at 65% 65%, #12101e 0%, #080710 100%)', accent: '#c8a97a' },
  { id: '05', title: 'The Crown', sub: 'Hand-knurled, 5.2mm', bg: 'radial-gradient(ellipse at 50% 25%, #1e1608 0%, #0e0c06 100%)', accent: '#e8c99a' },
]

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      const totalWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalWidth * 1.2}`,
          scrub: 1,
          pin: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ overflow: 'hidden', background: '#030308' }}>
      <div ref={trackRef} style={{ display: 'flex', gap: '1px', width: 'max-content' }}>
        {gallery.map((item, i) => {
          const Illustration = ILLUSTRATIONS[i]
          return (
            <div
              key={item.id}
              data-cursor="hover"
              style={{
                width: '52vw',
                height: '100vh',
                background: item.bg,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '56px',
                position: 'relative',
                overflow: 'hidden',
                borderRight: '1px solid rgba(200,169,122,0.05)',
              }}
            >
              {/* SVG Illustration — upper half of panel */}
              <div
                style={{
                  position: 'absolute',
                  top: '6%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '72%',
                  maxWidth: '440px',
                  aspectRatio: '1',
                  filter: 'brightness(1.8) contrast(1.15) saturate(1.2)',
                  pointerEvents: 'none',
                }}
              >
                <Illustration />
              </div>

              {/* Vignette — fades bottom third only, leaving illustration clear */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '38%',
                  background: 'linear-gradient(to top, rgba(3,3,8,0.96) 0%, rgba(3,3,8,0.65) 55%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Panel number — ghost */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '36px',
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '180px',
                  fontWeight: 200,
                  color: `${item.accent}05`,
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {item.id}
              </div>

              {/* Accent line */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '140px',
                  left: '56px',
                  height: '1px',
                  background: `linear-gradient(to right, ${item.accent}, transparent)`,
                  width: 0,
                }}
                whileInView={{ width: '35%' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
              />

              {/* Text content */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <div style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.35em',
                    color: `${item.accent}99`,
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                  }}>
                    {item.sub}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(28px, 3.5vw, 54px)',
                    fontWeight: 300,
                    color: '#eeeae4',
                    lineHeight: 1,
                    marginBottom: '18px',
                  }}>
                    {item.title}
                  </h3>
                  <div style={{ width: '32px', height: '1px', background: item.accent, opacity: 0.6 }} />
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
