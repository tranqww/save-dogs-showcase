"use client";

import { useRef } from "react";
import { useSectionTrigger } from "@/hooks/useSectionTrigger";
import { RevealLine } from "@/components/ui/RevealLine";

export function Question() {
  const ref = useRef<HTMLElement | null>(null);
  useSectionTrigger({ id: "question", ref });

  return (
    <section ref={ref} className="section">
      <div className="section__inner section__inner--center">
        <RevealLine as="h2" className="type-h2">
          If they know how to care for each other —
        </RevealLine>
        <div style={{ height: "0.75rem" }} />
        <RevealLine as="h2" className="type-h2">
          why do we sometimes forget how to care for them?
        </RevealLine>
      </div>
    </section>
  );
}
