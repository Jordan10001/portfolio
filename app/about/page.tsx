"use client";

import React from "react";
import AboutSection from "../../components/AboutSection";
import { PORTFOLIO_OWNER } from "../data";
import { useTheme } from "../theme-context";

export default function AboutPage() {
  const { accentClass } = useTheme();

  return <AboutSection owner={PORTFOLIO_OWNER} accentClass={accentClass} />;
}
