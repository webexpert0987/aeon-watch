'use client'

export default function GrainOverlay() {
  return (
    <>
      <svg style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0 }}>
        <defs>
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-50%',
          left: '-50%',
          right: '-50%',
          bottom: '-50%',
          width: '200%',
          height: '200%',
          filter: 'url(#grain-filter)',
          opacity: 0.035,
          pointerEvents: 'none',
          zIndex: 9999,
          animation: 'grain 0.5s steps(1) infinite',
          mixBlendMode: 'overlay',
        }}
      />
    </>
  )
}
