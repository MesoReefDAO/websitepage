"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

interface CountdownTimerProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const timerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timerRef.current) {
      gsap.fromTo(
        timerRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1,
        },
      )
    }
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Clean up
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div ref={timerRef} className="flex flex-wrap justify-center gap-4 md:gap-8" aria-label="Countdown to launch">
      <CountdownUnit value={timeLeft.days} label="Days" />
      <CountdownUnit value={timeLeft.hours} label="Hours" />
      <CountdownUnit value={timeLeft.minutes} label="Minutes" />
      <CountdownUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}

interface CountdownUnitProps {
  value: number
  label: string
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  const unitRef = useRef<HTMLDivElement>(null)
  const prevValue = useRef(value)

  useEffect(() => {
    if (unitRef.current && prevValue.current !== value) {
      gsap.fromTo(
        unitRef.current.querySelector(".countdown-number"),
        { scale: 1.2, color: "#60A5FA" },
        { scale: 1, color: "#FFFFFF", duration: 0.3, ease: "power2.out" },
      )
      prevValue.current = value
    }
  }, [value])

  return (
    <div
      ref={unitRef}
      className="flex flex-col items-center group cursor-default"
      onMouseEnter={() => {
        if (unitRef.current) {
          gsap.to(unitRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" })
        }
      }}
      onMouseLeave={() => {
        if (unitRef.current) {
          gsap.to(unitRef.current, { scale: 1, duration: 0.3, ease: "power2.out" })
        }
      }}
    >
      <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-xl w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-white/20 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <span className="countdown-number text-3xl md:text-4xl font-bold text-white">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-sm md:text-base text-white/80 mt-2 font-medium">{label}</span>
    </div>
  )
}
