"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { director, type SectionId } from "@/lib/scroll/director";

interface UseSectionTriggerOptions {
  id: SectionId;
  ref: RefObject<HTMLElement | null>;
  pin?: boolean;
  pinEnd?: string;
  onUpdate?: (progress: number) => void;
}

export function useSectionTrigger({
  id,
  ref,
  pin = false,
  pinEnd = "+=100%",
  onUpdate,
}: UseSectionTriggerOptions) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: pin ? "top top" : "top bottom",
      end: pin ? pinEnd : "bottom top",
      scrub: 1,
      pin,
      pinSpacing: pin,
      onUpdate: (self) => {
        director.progress[id] = self.progress;
        onUpdate?.(self.progress);
      },
    });

    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pin, pinEnd]);
}
