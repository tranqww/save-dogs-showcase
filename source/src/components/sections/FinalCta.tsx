"use client";

import { useRef } from "react";
import { useSectionTrigger } from "@/hooks/useSectionTrigger";
import { RevealLine } from "@/components/ui/RevealLine";
import { ShareButton } from "@/components/ui/ShareButton";

export function FinalCta() {
  const ref = useRef<HTMLElement | null>(null);
  useSectionTrigger({ id: "cta", ref });

  return (
    <section ref={ref} className="section">
      <div className="section__inner section__inner--center">
        <RevealLine as="h2" className="type-h2">
          A home isn&apos;t something we owe them.
        </RevealLine>
        <div style={{ height: "0.5rem" }} />
        <RevealLine as="h2" className="type-h2">
          It&apos;s something we can give.
        </RevealLine>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2.75rem", flexWrap: "wrap" }}>
          <a href="#practical" className="btn-primary">
            See how to help
          </a>
          <ShareButton />
        </div>
      </div>
    </section>
  );
}
