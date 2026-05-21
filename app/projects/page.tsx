"use client";

import React from "react";
import ProjectsGrid from "../../components/ProjectsGrid";
import { PROJECTS_DATA } from "../data";
import { useTheme } from "../theme-context";

export default function ProjectsPage() {
  const { accentClass } = useTheme();

  return <ProjectsGrid projects={PROJECTS_DATA} accentClass={accentClass} />;
}
