"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { DogModel } from "./DogModel";
import { CareModel } from "./CareModel";
import { Lighting } from "./Lighting";
import { FogField } from "./FogField";
import { Dust } from "./Dust";
import { Director } from "./Director";
import { useActiveSection } from "@/hooks/useActiveSection";

export function SceneCanvas() {
  const dogRef = useRef<THREE.Group>(null);
  const careRef = useRef<THREE.Group>(null);
  const active = useActiveSection();
  const [autoRotate, setAutoRotate] = useState(true);
  const isCare = active === "care";

  return (
    <div className="scene-field" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.2, 5], fov: 42, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
      >
        <Suspense fallback={null}>
          <Lighting />
          <FogField />
          <Dust />
          <group ref={dogRef}>
            <DogModel />
          </group>
          <group ref={careRef} scale={0.001}>
            <CareModel />
          </group>
          <Director dogRef={dogRef} careRef={careRef} />
          <OrbitControls
            enabled={isCare}
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.7}
            target={[0, 1, 0]}
            autoRotate={isCare && autoRotate}
            autoRotateSpeed={0.6}
            onStart={() => setAutoRotate(false)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
