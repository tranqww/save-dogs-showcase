"use client";

import { useRef } from "react";
import { useSectionTrigger } from "@/hooks/useSectionTrigger";
import { RevealLine } from "@/components/ui/RevealLine";
import { director } from "@/lib/scroll/director";
import { bgCssValue, fgCssValue } from "@/lib/scene/theme";

export function Transition() {
  const ref = useRef<HTMLElement | null>(null);

  useSectionTrigger({
    id: "transition",
    ref,
    pin: true,
    pinEnd: "+=100%",
    onUpdate: (progress) => {
      director.warmth = progress;
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--bg", bgCssValue(progress));
        document.documentElement.style.setProperty("--fg", fgCssValue(progress));
      }
    },
  });

  return (
    <section ref={ref} className="section section--pin">
      <div className="section__inner section__inner--center">
        <RevealLine as="h2" className="type-h2">
          But care doesn&apos;t disappear.
        </RevealLine>
        <div style={{ height: "1.5rem" }} />
        <RevealLine as="h2" className="type-h2">
          It&apos;s just not always where it should be.
        </RevealLine>
      </div>
    </section>
  );
}
