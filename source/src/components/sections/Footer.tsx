"use client";

import { useRef } from "react";
import { useSectionTrigger } from "@/hooks/useSectionTrigger";

export function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  useSectionTrigger({ id: "footer", ref });

  return (
    <footer ref={ref} className="site-footer">
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
        <div>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1.1rem" }}>Home</p>
          <p style={{ fontSize: "0.85rem", opacity: 0.6, marginTop: "0.5rem", maxWidth: "24rem" }}>
            An awareness project about care — made to remind, not to judge.
          </p>
        </div>
        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
          <a href="#practical" style={{ fontSize: "0.85rem", opacity: 0.75 }}>
            How to help
          </a>
          <a href="#" style={{ fontSize: "0.85rem", opacity: 0.75 }}>
            Partner shelters
          </a>
          <a href="#" style={{ fontSize: "0.85rem", opacity: 0.75 }}>
            Contact
          </a>
        </div>
      </div>
      <p style={{ fontSize: "0.75rem", opacity: 0.4, marginTop: "3rem" }}>
        © {new Date().getFullYear()} Home. A non-profit project.
      </p>
    </footer>
  );
}
