import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { ScrollRefresh } from "@/components/scene/ScrollRefresh";
import { Hero } from "@/components/sections/Hero";
import { FactBlock } from "@/components/sections/FactBlock";
import { Transition } from "@/components/sections/Transition";
import { CareSection } from "@/components/sections/CareSection";
import { Question } from "@/components/sections/Question";
import { PracticalCards } from "@/components/sections/PracticalCards";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <SceneCanvas />
      <div className="grain" />
      <main>
        <Hero />
        <FactBlock />
        <Transition />
        <CareSection />
        <Question />
        <PracticalCards />
        <FinalCta />
      </main>
      <Footer />
      <ScrollRefresh />
    </>
  );
}
