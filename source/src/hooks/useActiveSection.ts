"use client";

import { useSyncExternalStore } from "react";
import { subscribeActive, getActive } from "@/lib/scroll/director";

export function useActiveSection() {
  return useSyncExternalStore(subscribeActive, getActive, () => "hero" as const);
}
