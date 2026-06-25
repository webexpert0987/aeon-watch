export const eases = {
  luxe: [0.16, 1, 0.3, 1] as const,
  snap: [0.6, 0, 0.4, 1] as const,
  cinematic: [0.05, 0, 0, 1] as const,
  gentle: [0.25, 0.46, 0.45, 0.94] as const,
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

export function staggerDelay(index: number, baseDelay = 0.05) {
  return index * baseDelay
}

export const springConfig = {
  luxury: { stiffness: 100, damping: 20, mass: 1 },
  snappy: { stiffness: 300, damping: 30, mass: 0.8 },
  magnetic: { stiffness: 400, damping: 28, mass: 0.6 },
}
