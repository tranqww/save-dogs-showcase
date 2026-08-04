"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { director } from "@/lib/scroll/director";
import { COLD_BG, WARM_BG, mixChannel } from "@/lib/scene/theme";

export function FogField() {
  const { scene } = useThree();
  const color = useRef(new THREE.Color());

  useFrame(() => {
    const t = director.warmth;
    const r = mixChannel(COLD_BG[0], WARM_BG[0], t) / 255;
    const g = mixChannel(COLD_BG[1], WARM_BG[1], t) / 255;
    const b = mixChannel(COLD_BG[2], WARM_BG[2], t) / 255;
    color.current.setRGB(r, g, b);

    if (!scene.fog) {
      scene.fog = new THREE.Fog(color.current.getHex(), 4, 13);
    }
    (scene.fog as THREE.Fog).color.copy(color.current);
  });

  return null;
}
