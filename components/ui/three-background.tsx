"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Float,
  Sphere,
  MeshDistortMaterial,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function GradientSphere({
  position,
  color,
  scale,
  distort = 0.4,
  speed = 2,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  distort?: number;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={0.4}
          clearcoat={0.3}
          clearcoatRoughness={0}
          metalness={0.1}
          roughness={0.4}
          distort={distort}
          speed={2}
        />
      </Sphere>
    </Float>
  );
}

function BackgroundScene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 10; // Adjust threshold as needed

  // Use more conservative positioning to prevent cutoff at section boundaries
  const sphereConfigs = [
    {
      basePos: isMobile
        ? [-viewport.width * 0.25, viewport.height * 0.15, -5]
        : [-viewport.width * 0.2, viewport.height * 0.15, -5],
      scale: isMobile ? 1.2 : 3.5,
      color: "#4f46e5",
      distort: 0.4,
      speed: 1.5,
    },
    {
      basePos: isMobile
        ? [viewport.width * 0.2, -viewport.height * 0.1, -4]
        : [viewport.width * 0.25, -viewport.height * 0.15, -8],
      scale: isMobile ? 1.5 : 4,
      color: "#3b82f6",
      distort: 0.3,
      speed: 2,
    },
    {
      basePos: isMobile
        ? [-viewport.width * 0.15, -viewport.height * 0.2, -6]
        : [-viewport.width * 0.15, -viewport.height * 0.2, -10],
      scale: isMobile ? 1 : 3,
      color: "#8b5cf6",
      distort: 0.4,
      speed: 1.2,
    },
    {
      basePos: isMobile
        ? [viewport.width * 0.25, viewport.height * 0.2, -25]
        : [viewport.width * 0.2, viewport.height * 0.25, -35],
      scale: isMobile ? 2 : 6,
      color: "#f0f5ff",
      distort: 0.2,
      speed: 0.5,
    },
    {
      basePos: [0, 0, -45],
      scale: isMobile ? 3 : 8,
      color: "#e0e7ff",
      distort: 0.3,
      speed: 0.8,
    },
  ];

  // Generate a stable random offset for each sphere (once per render)
  const offsets = useMemo(
    () =>
      sphereConfigs.map(() => ({
        x: (Math.random() - 0.5) * (isMobile ? 4 : 8), // Reduced horizontal movement
        y: (Math.random() - 0.5) * (isMobile ? 4 : 8), // Reduced vertical movement
        z: (Math.random() - 0.5) * (isMobile ? 2 : 4), // Reduced Z randomness to prevent layering issues
      })),
    [isMobile],
  );

  return (
    <group>
      {sphereConfigs.map((cfg, i) => {
        const pos = [
          cfg.basePos[0] + offsets[i].x,
          cfg.basePos[1] + offsets[i].y,
          cfg.basePos[2] + offsets[i].z,
        ] as [number, number, number];
        return (
          <GradientSphere
            key={i}
            position={pos}
            scale={cfg.scale}
            color={cfg.color}
            distort={cfg.distort}
            speed={cfg.speed}
          />
        );
      })}
    </group>
  );
}

export function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={1}
          color="#a5b4fc"
        />

        <Environment preset="city" />
        <BackgroundScene />
      </Canvas>
    </div>
  );
}
