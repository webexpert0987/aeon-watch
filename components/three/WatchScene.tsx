'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

function WatchFace() {
  const timeRef = useRef({ h: 0, m: 0, s: 0 })

  useFrame(() => {
    const now = new Date()
    const h = now.getHours() % 12
    const m = now.getMinutes()
    const s = now.getSeconds() + now.getMilliseconds() / 1000

    const secondAngle = -(s / 60) * Math.PI * 2
    const minuteAngle = -((m + s / 60) / 60) * Math.PI * 2
    const hourAngle = -((h + m / 60) / 12) * Math.PI * 2

    timeRef.current = { h: hourAngle, m: minuteAngle, s: secondAngle }
  })

  const hourMarkings = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2
    const r = 0.82
    return {
      x: Math.sin(angle) * r,
      y: Math.cos(angle) * r,
      isMajor: i % 3 === 0,
    }
  })

  return (
    <group>
      {/* Watch case */}
      <mesh position={[0, 0, -0.08]}>
        <cylinderGeometry args={[1.1, 1.1, 0.16, 64]} />
        <meshStandardMaterial color="#1a1520" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Watch bezel */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.05, 0.08, 16, 64]} />
        <meshStandardMaterial color="#c8a97a" metalness={0.98} roughness={0.02} />
      </mesh>

      {/* Watch dial */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.96, 64]} />
        <meshStandardMaterial color="#0a0910" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Hour markings */}
      {hourMarkings.map((mark, i) => (
        <mesh key={i} position={[mark.x, mark.y, 0.06]}>
          <boxGeometry
            args={mark.isMajor ? [0.04, 0.14, 0.01] : [0.025, 0.08, 0.01]}
          />
          <meshStandardMaterial
            color={mark.isMajor ? '#c8a97a' : '#6b6880'}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Center jewel */}
      <mesh position={[0, 0, 0.1]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#c8a97a" metalness={1} roughness={0} />
      </mesh>

      {/* Glass crystal */}
      <mesh position={[0, 0, 0.12]}>
        <circleGeometry args={[0.96, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          roughness={0}
          metalness={0}
          transmission={0.95}
          thickness={0.1}
        />
      </mesh>

      {/* Dynamic hands — animated on each frame via useFrame ref updates */}
      <LiveHands timeRef={timeRef} />

      {/* AEON text indicator */}
      <mesh position={[0, -0.35, 0.07]}>
        <planeGeometry args={[0.4, 0.08]} />
        <meshStandardMaterial color="#c8a97a" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

function LiveHands({ timeRef }: { timeRef: React.RefObject<{ h: number; m: number; s: number }> }) {
  const hourRef = useRef<THREE.Mesh>(null)
  const minuteRef = useRef<THREE.Mesh>(null)
  const secondGroupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!timeRef.current) return
    if (hourRef.current) hourRef.current.rotation.z = timeRef.current.h
    if (minuteRef.current) minuteRef.current.rotation.z = timeRef.current.m
    if (secondGroupRef.current) secondGroupRef.current.rotation.z = timeRef.current.s
  })

  return (
    <>
      {/* Hour hand */}
      <mesh ref={hourRef} position={[0, 0.22, 0.08]}>
        <boxGeometry args={[0.055, 0.44, 0.015]} />
        <meshStandardMaterial color="#eeeae4" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Minute hand */}
      <mesh ref={minuteRef} position={[0, 0.3, 0.085]}>
        <boxGeometry args={[0.04, 0.6, 0.015]} />
        <meshStandardMaterial color="#eeeae4" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Second hand + counterweight as a group */}
      <group ref={secondGroupRef}>
        <mesh position={[0, 0.26, 0.09]}>
          <boxGeometry args={[0.018, 0.52, 0.012]} />
          <meshStandardMaterial color="#ff3b3b" metalness={0.9} roughness={0.1} emissive="#ff3b3b" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, -0.14, 0.09]}>
          <boxGeometry args={[0.018, 0.18, 0.012]} />
          <meshStandardMaterial color="#ff3b3b" metalness={0.9} roughness={0.1} emissive="#ff3b3b" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </>
  )
}

function WatchRig({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.x += (mouseY * 0.3 - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (mouseX * 0.3 - groupRef.current.rotation.y) * 0.05
  })

  return (
    <group ref={groupRef}>
      <WatchFace />
    </group>
  )
}

export default function WatchScene({
  mouseX = 0,
  mouseY = 0,
  className = '',
}: {
  mouseX?: number
  mouseY?: number
  className?: string
}) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#ffffff" />
        <pointLight position={[-3, -2, 2]} intensity={1} color="#3b7bff" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#c8a97a" />
        <spotLight
          position={[2, 4, 3]}
          angle={0.4}
          penumbra={0.8}
          intensity={3}
          color="#e8c99a"
        />
        <WatchRig mouseX={mouseX} mouseY={mouseY} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
