"use client";

import { useRef } from "react";
import { useSectionTrigger } from "@/hooks/useSectionTrigger";
import { RevealLine } from "@/components/ui/RevealLine";

export function FactBlock() {
  const ref = useRef<HTMLElement | null>(null);
  useSectionTrigger({ id: "fact", ref });

  return (
    <section ref={ref} className="section section--tall">
      <div className="section__inner" style={{ display: "flex", flexDirection: "column", gap: "38vh" }}>
        <RevealLine as="h2" className="type-h2">
          Every year, thousands of dogs end up on the street.
        </RevealLine>
        <RevealLine as="h2" className="type-h2">
          Not because they&apos;re bad.
        </RevealLine>
        <RevealLine as="h2" className="type-h2">
          Because someone decided it was easier.
        </RevealLine>
      </div>
    </section>
  );
}
