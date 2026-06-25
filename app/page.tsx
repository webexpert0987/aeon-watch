"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/hooks/useLenis";
import GrainOverlay from "@/components/effects/GrainOverlay";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import CustomCursor from "@/components/cursor/CustomCursor";
import Navigation from "@/components/ui/Navigation";
import HeroSection from "@/components/hero/HeroSection";
import ProductReveal from "@/components/sections/ProductReveal";
import TypographyScene from "@/components/sections/TypographyScene";
import ExplodedView from "@/components/sections/ExplodedView";
import FeatureCards from "@/components/sections/FeatureCards";
import TechnologySection from "@/components/sections/TechnologySection";
import Statistics from "@/components/sections/Statistics";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import StorytellingSection from "@/components/sections/StorytellingSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <main style={{ background: "#030308", position: "relative" }}>
      <GrainOverlay />
      <FloatingOrbs />
      <CustomCursor />
      <Navigation />
      <HeroSection />
      {/* <ProductReveal /> */}
      <TypographyScene />
      {/* <ExplodedView /> */}
      <FeatureCards />
      {/* <TechnologySection /> */}
      {/* <Statistics /> */}
      <HorizontalGallery />
      <StorytellingSection />
      {/* <FinalCTA /> */}
    </main>
  );
}
