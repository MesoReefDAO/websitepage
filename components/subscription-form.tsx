"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { gsap } from "gsap"

export default function SubscriptionForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.5 },
      )
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus("error")
      setMessage("Please enter your email address")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")

    // Simulate API call
    try {
      // In a real app, you would send this to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus("success")
      setMessage("Thank you for subscribing!")
      setEmail("")

      // Success animation
      if (formRef.current) {
        gsap.to(formRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        })
      }
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div ref={formRef} className="max-w-md mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Get Notified When We Launch
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/20 transition-all duration-300"
            aria-describedby={message ? "form-error" : undefined}
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-12 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {status === "loading" ? "Subscribing..." : "Notify Me"}
        </Button>
      </form>

      {message && (
        <p
          id="form-error"
          className={`mt-2 text-sm ${status === "error" ? "text-red-300" : "text-green-300"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </div>
  )
}
