'use client'

const orbs = [
  { size: 600, x: '10%', y: '20%', color: 'rgba(200,169,122,0.06)', delay: '0s', dur: '20s' },
  { size: 400, x: '70%', y: '60%', color: 'rgba(59,123,255,0.04)', delay: '-8s', dur: '25s' },
  { size: 800, x: '50%', y: '10%', color: 'rgba(200,169,122,0.04)', delay: '-4s', dur: '30s' },
  { size: 300, x: '85%', y: '80%', color: 'rgba(59,123,255,0.05)', delay: '-12s', dur: '18s' },
  { size: 500, x: '20%', y: '75%', color: 'rgba(200,169,122,0.03)', delay: '-6s', dur: '22s' },
]

export default function FloatingOrbs() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            animation: `orb-drift ${orb.dur} ease-in-out ${orb.delay} infinite`,
            filter: `blur(${orb.size * 0.15}px)`,
          }}
        />
      ))}
    </div>
  )
}
