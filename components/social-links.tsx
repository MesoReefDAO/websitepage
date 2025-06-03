"use client"

import { useRef, useEffect } from "react"
import { Instagram, Linkedin } from "lucide-react"
import { gsap } from "gsap"

// Custom X (Twitter) icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// Custom Linktree icon component
function LinkTreeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7.953 15.066V8.544c0-.686.36-1.314.951-1.656l5.012-2.892c.624-.36 1.394-.36 2.019 0l5.012 2.892c.591.342.951.97.951 1.656v6.522c0 .686-.36 1.314-.951 1.656l-5.012 2.892c-.624.36-1.395.36-2.019 0l-5.012-2.892c-.591-.342-.951-.97-.951-1.656z" />
      <path
        d="M12.45 12.03v5.47m-2.9-3.65v-1.82l2.9-1.64 2.9 1.64v1.82l-2.9 1.64-2.9-1.64z"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
      />
    </svg>
  )
}

// Custom Discord icon component
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

export default function SocialLinks() {
  const linksRef = useRef<HTMLDivElement>(null)

  const socialLinks = [
    { name: "X", icon: <XIcon className="h-5 w-5" />, url: "https://twitter.com/MesoReefDAO" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://www.linkedin.com/company/mesoreefdao/" },
    { name: "Discord", icon: <DiscordIcon className="h-5 w-5" />, url: "https://discord.com/invite/UhGbd3cHcU" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, url: "https://www.instagram.com/mesoreefdao" },
    { name: "Linktree", icon: <LinkTreeIcon className="h-5 w-5" />, url: "https://linktr.ee/mesoreefdao" },
  ]

  useEffect(() => {
    if (linksRef.current) {
      gsap.fromTo(
        linksRef.current.children,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 2,
        },
      )
    }
  }, [])

  return (
    <div className="mt-8">
      <h2 className="sr-only">Follow us on social media</h2>
      <div ref={linksRef} className="flex justify-center gap-4">
        {socialLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-all duration-300 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:scale-110 hover:shadow-lg group"
            aria-label={`Follow us on ${link.name}`}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -5,
                duration: 0.3,
                ease: "power2.out",
              })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              })
            }}
          >
            <div className="group-hover:rotate-12 transition-transform duration-300">{link.icon}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
