"use client";

import React from "react";
import GithubHeatmap from "../../components/GithubHeatmap";
import { PORTFOLIO_OWNER } from "../data";
import { useTheme } from "../theme-context";

export default function GithubPage() {
  const { accentClass } = useTheme();

  return (
    <GithubHeatmap
      defaultUsername={PORTFOLIO_OWNER.githubUsername}
      accentClass={accentClass}
    />
  );
}
