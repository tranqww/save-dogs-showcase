"use client";

import { createElement, useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

interface RevealLineProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  trigger?: "scroll" | "mount";
  delay?: number;
}

export function RevealLine({
  children,
  as = "p",
  className = "",
  trigger = "scroll",
  delay = 0,
}: RevealLineProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = new SplitText(el, { type: "words", wordsClass: "reveal-word" });

    gsap.set(split.words, { yPercent: 110, opacity: 0, rotate: 1.5 });

    const anim = gsap.to(split.words, {
      yPercent: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.035,
      delay,
      paused: trigger === "scroll",
    });

    let st: ScrollTrigger | undefined;
    if (trigger === "scroll") {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        end: "top 30%",
        onEnter: () => anim.play(),
        onLeaveBack: () => {
          anim.pause(0);
        },
      });
    } else {
      anim.play();
    }

    return () => {
      st?.kill();
      anim.kill();
      split.revert();
    };
  }, [trigger, delay]);

  return createElement(
    as,
    { ref, className: `reveal-line ${className}` },
    children
  );
}
