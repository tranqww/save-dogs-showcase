"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Section triggers mount independently and some pin (inserting spacers that
 * change document height). Any trigger measured before a later pin mounts
 * ends up with stale start/end values, so force one refresh once every
 * section has registered.
 */
export function ScrollRefresh() {
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
