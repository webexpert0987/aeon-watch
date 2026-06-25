'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase)

  CustomEase.create('luxe', 'M0,0 C0.16,1 0.3,1 1,1')
  CustomEase.create('snap', 'M0,0 C0.6,0 0.4,1 1,1')
  CustomEase.create('cinematic', 'M0,0 C0.05,0 0,1 1,1')

  gsap.defaults({
    ease: 'power3.out',
    duration: 1,
  })
}

export { gsap, ScrollTrigger }
