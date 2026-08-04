"use client";

import { useRef } from "react";
import { useSectionTrigger } from "@/hooks/useSectionTrigger";
import { RevealLine } from "@/components/ui/RevealLine";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { RainBackground } from "@/components/ui/rain";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  useSectionTrigger({ id: "hero", ref });

  return (
    <section ref={ref} className="section">
      <RainBackground
        intensity={220}
        speed={0.6}
        angle={8}
        color="rgba(174, 194, 224, 0.5)"
        dropSize={{ min: 1, max: 2 }}
        lightningEnabled
        lightningFrequency={9}
        thunderEnabled
        thunderVolume={0.35}
        thunderDelay={1.6}
        className="absolute inset-0 bg-transparent"
      />
      <div className="section__inner">
        <RevealLine as="h1" className="type-display" trigger="mount" delay={0.4}>
          She&apos;s waiting.
        </RevealLine>
        <RevealLine as="h1" className="type-display" trigger="mount" delay={1.1}>
          She doesn&apos;t know you&apos;ve already decided.
        </RevealLine>
      </div>
      <ScrollIndicator />
    </section>
  );
}
