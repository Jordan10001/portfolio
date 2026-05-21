"use client";

import React from "react";
import SkillsCertificatesSection from "../../components/SkillsCertificatesSection";
import { SKILLS_DATA, CERTIFICATES_DATA } from "../data";
import { useTheme } from "../theme-context";

export default function SkillsCertificatesPage() {
  const { accentClass } = useTheme();

  return (
    <SkillsCertificatesSection
      skills={SKILLS_DATA}
      certificates={CERTIFICATES_DATA}
      accentClass={accentClass}
    />
  );
}
