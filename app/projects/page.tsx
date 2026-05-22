"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";
import { PROJECTS_DATA } from "../data";
import { useTheme } from "../theme-context";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: "spring" as const, damping: 12, stiffness: 100 } }
};

export default function ProjectsPage() {
  const { accentClass } = useTheme();
  const projects = PROJECTS_DATA;

  return (
    <div className="py-12 md:py-20 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Playful Header Section */}
        <div className="mb-12 text-left relative">
          <div className={`inline-block border-4 border-black ${accentClass || "bg-[#7DF9FF]"} px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none`}>
            <h2 className="font-space font-black text-4xl sm:text-5xl uppercase text-black">
              PROJECT WORKS_
            </h2>
          </div>
          <p className="font-space font-bold text-gray-700 mt-4 max-w-xl text-left">
            A curated selection of high-energy digital experiments, architectural data models, and raw code structures.
          </p>
        </div>

        {/* Asymmetrical Grid layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard
                project={project}
                colorIndex={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Playful Bottom Callout ribbon */}
        <div className="mt-16 border-4 border-black bg-[#FFFF00] p-6 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-space font-black text-lg text-black uppercase tracking-tight">
            ⚡ Have a challenging idea that needs bold architecture?
          </span>
          <Link
            href="/contact"
            className="border-3 border-black bg-white py-2 px-6 font-space text-sm font-black uppercase text-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 cursor-pointer inline-block"
          >
            LET&apos;S CHAT
          </Link>
        </div>

      </div>
    </div>
  );
}
