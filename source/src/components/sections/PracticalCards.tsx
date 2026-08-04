"use client";

import { useEffect, useRef } from "react";
import { useSectionTrigger } from "@/hooks/useSectionTrigger";
import { RevealLine } from "@/components/ui/RevealLine";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ITEMS = [
  {
    title: "Spay/neuter instead of abandoned puppies",
    body: "One simple step removes the reason new dogs end up on the street.",
  },
  {
    title: "If you can't keep them — find a new home yourself",
    body: "Not the street. Foster care, a listing, friends — anything but the front door.",
  },
  {
    title: "Shelters and foster homes",
    body: "You can help without taking one home: volunteering, donations, sharing listings.",
  },
  {
    title: "Adopt instead of buying",
    body: "A shelter dog has the same eyes as a breeder's puppy. And needs a home more.",
  },
  {
    title: "Support local volunteers",
    body: "They carry this every day. They need more than gratitude.",
  },
];

export function PracticalCards() {
  const ref = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  useSectionTrigger({ id: "practical", ref });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".card");
    gsap.set(cards, { opacity: 0, y: 28 });

    const st = ScrollTrigger.create({
      trigger: grid,
      start: "top 80%",
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={ref}
      id="practical"
      className="section"
      style={{ minHeight: "auto", padding: "8rem clamp(1.5rem, 6vw, 6rem)" }}
    >
      <div className="section__inner section__inner--wide">
        <p className="type-eyebrow">what you can do</p>
        <RevealLine as="h2" className="type-h2">
          A home starts with the choice not to look away.
        </RevealLine>

        <div className="card-grid" ref={gridRef}>
          {ITEMS.map((item) => (
            <div key={item.title} className="card">
              <svg className="card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 8v4l2.5 2.5" />
              </svg>
              <p className="card__title">{item.title}</p>
              <p className="card__body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
