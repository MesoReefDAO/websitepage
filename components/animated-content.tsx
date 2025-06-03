"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface AnimatedContentProps {
  children: React.ReactNode
}

export default function AnimatedContent({ children }: AnimatedContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      // Initial state
      gsap.set(contentRef.current, { opacity: 0, y: 50 })

      // Animation timeline
      const tl = gsap.timeline()

      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5,
      })

      // Floating animation
      gsap.to(contentRef.current, {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })
    }
  }, [])

  return (
    <div ref={contentRef} className="w-full ">
      {children}
    </div>
  )
}
