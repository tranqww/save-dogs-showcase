"use client";

import { useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { director, setActive, type SectionId } from "@/lib/scroll/director";

function smoothstep(t: number) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

const SECTION_ORDER: SectionId[] = [
  "hero",
  "fact",
  "transition",
  "care",
  "question",
  "practical",
  "cta",
  "footer",
];

// A section only "takes over" as active once meaningfully scrolled into —
// avoids the next section stealing focus the instant its edge peeks in.
const ACTIVE_THRESHOLD = 0.4;

function deriveActive(progress: Record<SectionId, number>): SectionId {
  let result: SectionId = "hero";
  for (const id of SECTION_ORDER) {
    if (progress[id] > ACTIVE_THRESHOLD) result = id;
  }
  return result;
}

interface DirectorProps {
  dogRef: RefObject<THREE.Group | null>;
  careRef: RefObject<THREE.Group | null>;
}

export function Director({ dogRef, careRef }: DirectorProps) {
  const { camera } = useThree();
  const camPos = useRef(new THREE.Vector3(0, 1.2, 5));
  const lookAt = useRef(new THREE.Vector3(0, 0.9, 0));
  const prevActive = useRef<SectionId>("hero");
  const dogX = useRef(0);
  const careX = useRef(0);
  const careY = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { progress, warmth } = director;
    const active = deriveActive(progress);
    if (active !== director.active) setActive(active);
    const dog = dogRef.current;
    const care = careRef.current;

    if (active === "care" && prevActive.current !== "care") {
      camPos.current.set(0, 1.4, 4.2);
      lookAt.current.set(0, 1, 0);
      camera.position.copy(camPos.current);
      camera.lookAt(lookAt.current);
    }
    prevActive.current = active;

    // idle life: gentle breathing + slow spin, strongest while it's the focal point
    if (dog) {
      const idleWeight = active === "hero" || active === "fact" ? 1 : 0.15;
      dog.position.y = Math.sin(t * 1.1) * 0.02 * idleWeight;
      dog.rotation.y += delta * 0.06 * idleWeight;
    }
    if (care) {
      care.rotation.y += delta * 0.015;
    }

    // crossfade: street dog recedes as warmth rises, care scene grows in
    const fade = smoothstep(warmth);
    if (dog) dog.scale.setScalar(THREE.MathUtils.lerp(1, active === "cta" ? 0.7 : 0.001, fade));
    if (care) care.scale.setScalar(THREE.MathUtils.lerp(0.001, 1, fade));

    const dogTargetX = active === "cta" ? -1 : 0;
    const careTargetX = active === "cta" ? 1 : 0;
    const careTargetY = active === "question" ? -1.05 : 0;
    dogX.current = THREE.MathUtils.damp(dogX.current, dogTargetX, 3, delta);
    careX.current = THREE.MathUtils.damp(careX.current, careTargetX, 3, delta);
    careY.current = THREE.MathUtils.damp(careY.current, careTargetY, 3, delta);
    if (dog) dog.position.x = dogX.current;
    if (care) {
      care.position.x = careX.current;
      care.position.y = careY.current;
    }

    // camera choreography — OrbitControls owns the camera during "care"
    if (active === "care") return;

    let targetPos = camPos.current;
    let targetLook = lookAt.current;

    if (active === "hero") {
      targetPos = new THREE.Vector3(0, 1.2, 5);
      targetLook = new THREE.Vector3(0, 0.9, 0);
    } else if (active === "fact") {
      const z = THREE.MathUtils.lerp(5, 3.1, progress.fact);
      targetPos = new THREE.Vector3(0.4, 1.15, z);
      targetLook = new THREE.Vector3(0, 0.9, 0);
    } else if (active === "transition") {
      targetPos = new THREE.Vector3(THREE.MathUtils.lerp(0.4, 0, progress.transition), 1.25, 3.6);
      targetLook = new THREE.Vector3(0, 0.95, 0);
    } else if (active === "question") {
      targetPos = new THREE.Vector3(0, 1.55, 5.2);
      targetLook = new THREE.Vector3(0, 0.75, 0);
    } else if (active === "practical") {
      targetPos = new THREE.Vector3(0, 1.6, 6.4);
      targetLook = new THREE.Vector3(0, 1, 0);
    } else if (active === "cta") {
      targetPos = new THREE.Vector3(0, 1.45, 5.4);
      targetLook = new THREE.Vector3(0, 0.9, 0);
    } else if (active === "footer") {
      targetPos = new THREE.Vector3(0, 1.6, 7);
      targetLook = new THREE.Vector3(0, 1, 0);
    }

    // Narrow/portrait viewports see more of the model relative to the text
    // column at the same distance — pull the camera back to compensate.
    const aspect = state.size.width / state.size.height;
    const distanceScale = aspect < 1 ? THREE.MathUtils.clamp(1 / aspect, 1, 1.7) : 1;
    if (distanceScale !== 1) {
      targetPos = targetPos.clone();
      targetPos.x *= distanceScale;
      targetPos.z *= distanceScale;
    }

    camPos.current.lerp(targetPos, 1 - Math.pow(0.001, delta));
    lookAt.current.lerp(targetLook, 1 - Math.pow(0.001, delta));
    camera.position.copy(camPos.current);
    camera.lookAt(lookAt.current);
  });

  return null;
}
