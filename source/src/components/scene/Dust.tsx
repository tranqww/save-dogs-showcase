"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { director } from "@/lib/scroll/director";
import { WARM_PARTICLE } from "@/lib/scene/theme";

const COUNT = 260;
const SPREAD = 5;
const HEIGHT = 4;
const RISE_SPEED = 0.12;

export function Dust() {
  const pointsRef = useRef<THREE.Points>(null);
  const seeds = useMemo(
    () => new Array(COUNT).fill(0).map(() => Math.random() * Math.PI * 2),
    []
  );

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * SPREAD;
      arr[i * 3 + 1] = Math.random() * HEIGHT;
      arr[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const t = state.clock.elapsedTime;
    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      let y = attr.getY(i) + RISE_SPEED * delta;
      if (y > HEIGHT) y = 0;
      const sway = Math.sin(t * 0.5 + seeds[i]) * 0.003;
      attr.setY(i, y);
      attr.setX(i, attr.getX(i) + sway);
    }
    attr.needsUpdate = true;

    const material = points.material as THREE.PointsMaterial;
    material.opacity = THREE.MathUtils.clamp(director.warmth * 0.9, 0, 0.9);
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={WARM_PARTICLE}
        size={0.03}
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
