"use client";

import { useRef } from "react";
import { useSectionTrigger } from "@/hooks/useSectionTrigger";
import { RevealLine } from "@/components/ui/RevealLine";

export function CareSection() {
  const ref = useRef<HTMLElement | null>(null);
  useSectionTrigger({ id: "care", ref, pin: true, pinEnd: "+=130%" });

  return (
    <section ref={ref} className="section section--pin">
      <div className="section__inner">
        <RevealLine as="h2" className="type-h2">
          They have no home.
        </RevealLine>
        <div style={{ height: "0.5rem" }} />
        <RevealLine as="h2" className="type-h2">
          But they have care.
        </RevealLine>
        <div style={{ height: "0.5rem" }} />
        <RevealLine as="h2" className="type-h2">
          Even they know how to protect the weak.
        </RevealLine>
      </div>
      <p className="type-eyebrow" style={{ position: "absolute", right: "clamp(1.5rem, 6vw, 6rem)", bottom: "2.75rem" }}>
        drag to rotate
      </p>
    </section>
  );
}
