"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

// Coral component
function Coral({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </Float>
  )
}

// Fish component
function Fish({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.8 + position[1]) * 2
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.6 + position[0]) * 0.5
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8 + position[1]) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={0.1}>
      <sphereGeometry args={[1, 8, 6]} />
      <meshStandardMaterial color="#4FC3F7" emissive="#1565C0" emissiveIntensity={0.2} />
    </mesh>
  )
}

// Bubbles component
function Bubbles() {
  const pointsRef = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.01
        if (positions[i + 1] > 10) {
          positions[i + 1] = -10
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#64B5F6" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  )
}

// Main scene component
export default function CoralReefScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  // Generate coral positions
  const corals = useMemo(() => {
    const coralData = []
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]

    for (let i = 0; i < 15; i++) {
      coralData.push({
        position: [(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8 - 2, (Math.random() - 0.5) * 8] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    return coralData
  }, [])

  // Generate fish positions
  const fish = useMemo(() => {
    const fishData = []
    for (let i = 0; i < 8; i++) {
      fishData.push({
        position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6] as [
          number,
          number,
          number,
        ],
      })
    }
    return fishData
  }, [])

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#4FC3F7" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#87CEEB" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#20B2AA" />

      {/* Environment */}
      <Environment preset="sunset" />

      {/* Ocean floor */}
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8B7355" roughness={0.9} />
      </mesh>

      {/* Corals */}
      {corals.map((coral, index) => (
        <Coral key={index} position={coral.position} scale={coral.scale} color={coral.color} />
      ))}

      {/* Fish */}
      {fish.map((fishItem, index) => (
        <Fish key={index} position={fishItem.position} />
      ))}

      {/* Bubbles */}
      <Bubbles />

      {/* Water effect */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#006994" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
