import type { Metadata } from "next"
import SocialLinks from "@/components/social-links"
import AnimatedBackground from "@/components/animated-background"
import AnimatedContent from "@/components/animated-content"
import Image from "next/image"
export const metadata: Metadata = {
  title: "Coming Soon | Our Exciting New Website",
  description: "Our new website is launching soon. Subscribe to be notified when we go live.",
  openGraph: {
    title: "Coming Soon | Our Exciting New Website",
    description: "Our new website is launching soon. Subscribe to be notified when we go live.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coming Soon | Our Exciting New Website",
    description: "Our new website is launching soon. Subscribe to be notified when we go live.",
  },
}

export default function Home() {
  // Launch date: 30 days from now
  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 30)

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated 3D Background */}
      <AnimatedBackground />

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <AnimatedContent>
          <div className="w-full mx-auto px-4 py-16 md:py-24 text-center">
            <div className="bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Something Amazing Is Coming Soon
              </h1>

              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                We're crafting an extraordinary digital experience. Dive into something special with us.
              </p>

              <div className="flex justify-center">
                <Image src="/logo.png" width={200} height={200} alt="MesoReef" />
              </div>

              <SocialLinks />
            </div>
          </div>
        </AnimatedContent>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://example.com/",
            name: "Coming Soon | Our Exciting New Website",
            description: "Our new website is launching soon. Subscribe to be notified when we go live.",
          }),
        }}
      />
    </main>
  )
}
