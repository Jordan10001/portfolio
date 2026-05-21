"use client";

import React from "react";
import ContactSection from "../../components/ContactSection";
import { PORTFOLIO_OWNER } from "../data";
import { useTheme } from "../theme-context";

export default function ContactPage() {
  const { accentClass } = useTheme();

  return <ContactSection owner={PORTFOLIO_OWNER} accentClass={accentClass} />;
}
