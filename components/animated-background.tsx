"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import CoralReefScene from "./coral-reef-scene"

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <CoralReefScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
