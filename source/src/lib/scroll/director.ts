export type SectionId =
  | "hero"
  | "fact"
  | "transition"
  | "care"
  | "question"
  | "practical"
  | "cta"
  | "footer";

interface DirectorState {
  active: SectionId;
  progress: Record<SectionId, number>;
  warmth: number;
}

export const director: DirectorState = {
  active: "hero",
  progress: {
    hero: 0,
    fact: 0,
    transition: 0,
    care: 0,
    question: 0,
    practical: 0,
    cta: 0,
    footer: 0,
  },
  warmth: 0,
};

type Listener = () => void;
const listeners = new Set<Listener>();

export function setActive(id: SectionId) {
  if (director.active !== id) {
    director.active = id;
    listeners.forEach((listener) => listener());
  }
}

export function subscribeActive(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getActive() {
  return director.active;
}
