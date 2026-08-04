"use client";

import { useGLTF } from "@react-three/drei";
import { useCenteredModel } from "@/lib/scene/useCenteredModel";
import { BASE_PATH } from "@/lib/basePath";

const MODEL_PATH = `${BASE_PATH}/models/chance-meeting.glb`;

export function CareModel() {
  const model = useCenteredModel(MODEL_PATH, 2.6);
  return <primitive object={model} />;
}

useGLTF.preload(MODEL_PATH);
