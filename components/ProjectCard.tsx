import React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { Project } from "../app/types";

interface ProjectCardProps {
  project: Project;
  colorIndex: number;
}

export default function ProjectCard({ project, colorIndex }: ProjectCardProps) {
  // Pastel variants to alternate background styles
  const colorBgs = [
    "bg-[#FF4911]", // Neon Orange
    "bg-[#7DF9FF]", // Vibrant Cyan
    "bg-[#2FFF2F]", // Lime Green
    "bg-[#FF00F5]", // Magenta Pink
  ];

  const borderBg = colorBgs[colorIndex % colorBgs.length];
  const rotateClass = colorIndex % 2 === 0 ? "rotate-[-1.5deg] hover:rotate-[0.5deg]" : "rotate-[1.5deg] hover:rotate-[-0.5deg]";

  return (
    <div className={`group relative border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] duration-150 flex flex-col justify-between ${rotateClass}`}>
      
      {/* Absolute floating corner shape/index */}
      <div className="absolute top-3 right-3 z-10 border-2 border-black bg-white px-2 py-0.5 font-mono text-xs font-black text-black">
        0{colorIndex + 1}
      </div>

      <div>
        {/* Visual Header Grid Zone */}
        <div className={`h-48 border-b-4 border-black ${borderBg} flex items-center justify-center relative select-none overflow-hidden ${
          project.image && (
            project.image.startsWith("http") ||
            project.image.startsWith("/") ||
            project.image.startsWith("./") ||
            project.image.includes(".")
          ) ? "p-0" : "p-6"
        }`}>
          {project.image && (
            project.image.startsWith("http") ||
            project.image.startsWith("/") ||
            project.image.startsWith("./") ||
            project.image.includes(".")
          ) ? (
            <img
              src={project.image}
              alt={project.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="text-8xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200">
              {project.image}
            </div>
          )}
          {/* Flat line graphics */}
          <div className="absolute bottom-2 left-3 font-mono text-xs font-black text-black tracking-widest bg-white border border-black px-1.5 py-0.5 z-10">
            {"// LIVE_PROJ"}
          </div>
        </div>

        {/* Info Container */}
        <div className="p-5 text-left">
          
          {/* Project Title */}
          <h3 className="font-space text-2xl font-black uppercase text-black mb-2 tracking-tight group-hover:text-amber-800 transition-colors">
            {project.name}
          </h3>

          {/* Description Text */}
          <p className="font-sans text-sm text-gray-700 leading-relaxed font-semibold mb-4 min-h-[70px]">
            {project.description}
          </p>

          {/* Tech Badges List */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.badges.map((badge) => (
              <span
                key={badge}
                className="font-mono text-[10px] font-black uppercase border-1.5 border-black bg-[#FFFF00] px-2 py-0.5 text-black shadow-[1px_1px_0px_rgba(0,0,0,1)]"
              >
                #{badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 border-3 border-black bg-gray-50 py-2 px-1.5 font-space text-xs font-black uppercase text-black hover:bg-gray-100 active:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-center"
            id={`project-github-link-${project.id}`}
          >
            <Github size={14} /> Repository
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 border-3 border-black bg-[#2FFF2F] py-2 px-1.5 font-space text-xs font-black uppercase text-black hover:bg-[#5cfc5c] active:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer text-center"
            id={`project-demo-link-${project.id}`}
          >
            Launch <ArrowUpRight size={14} />
          </a>
        )}
      </div>

    </div>
  );
}
