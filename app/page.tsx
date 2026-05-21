"use client";

import React from "react";
import HeroSection from "../components/HomeSection";
import { PORTFOLIO_OWNER } from "./data";
import { useTheme } from "./theme-context";

export default function Home() {
  const { accentClass } = useTheme();

  return (
    <HeroSection
      owner={PORTFOLIO_OWNER}
      onNavigate={() => {}}
      accentClass={accentClass}
    />
  );
}
