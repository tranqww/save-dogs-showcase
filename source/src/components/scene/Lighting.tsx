"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { director } from "@/lib/scroll/director";
import { COLD_LIGHT, WARM_LIGHT } from "@/lib/scene/theme";

export function Lighting() {
  const key = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const fill = useRef<THREE.PointLight>(null);
  const color = useRef(new THREE.Color());

  useFrame(() => {
    const t = director.warmth;
    color.current.lerpColors(COLD_LIGHT, WARM_LIGHT, t);

    if (key.current) {
      key.current.color.copy(color.current);
      key.current.intensity = THREE.MathUtils.lerp(1.1, 1.9, t);
    }
    if (ambient.current) {
      ambient.current.intensity = THREE.MathUtils.lerp(0.28, 0.55, t);
    }
    if (fill.current) {
      fill.current.color.copy(color.current);
      fill.current.intensity = THREE.MathUtils.lerp(0.4, 0.9, t);
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.28} />
      <directionalLight ref={key} position={[3, 5, 2]} intensity={1.1} castShadow />
      <pointLight ref={fill} position={[-3, 1.5, -2]} intensity={0.4} />
    </>
  );
}
