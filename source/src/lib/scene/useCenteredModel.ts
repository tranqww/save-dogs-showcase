"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

/**
 * Sketchfab exports carry arbitrary source pivots/scale. Normalize every
 * loaded model to: centered on X/Z, grounded at y=0, longest side = targetSize.
 */
export function useCenteredModel(path: string, targetSize = 2) {
  const { scene } = useGLTF(path);

  const group = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetSize / maxDim;
    root.scale.setScalar(scale);

    const box2 = new THREE.Box3().setFromObject(root);
    const center2 = new THREE.Vector3();
    box2.getCenter(center2);
    root.position.x -= center2.x;
    root.position.z -= center2.z;
    root.position.y -= box2.min.y;

    root.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    return root;
  }, [scene, targetSize]);

  return group;
}
