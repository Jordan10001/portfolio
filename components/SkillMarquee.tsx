import React from "react";
import * as Icons from "lucide-react";
import { Skill } from "../app/types";

interface SkillMarqueeProps {
  skills: Skill[];
}

export default function SkillMarquee({ skills = [] }: SkillMarqueeProps) {
  // Safe helper to resolve Lucide Icon dynamically
  const renderSkillIcon = (iconName: string, className = "text-black h-8 w-8") => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.Cpu className={className} />; // Fallback
  };

  const marqueeItems = [...skills, ...skills, ...skills, ...skills];

  const presetColors = [
    "bg-[#7DF9FF]", // Cyan
    "bg-[#2FFF2F]", // Lime Green
    "bg-[#FFFF00]", // Electric Yellow
    "bg-[#FF00F5]", // Magenta Pink
    "bg-[#FF4911]", // Neon Orange
    "bg-[#3300FF]"  // Electric Blue
  ];

  const getSkillColor = (name: string, index: number) => {
    const codeSum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) + index;
    return presetColors[codeSum % presetColors.length];
  };

  return (
    <div className="border-y-4 border-black bg-white py-6 relative select-none animate-fade-in">
      
      {/* Floating Category Label */}
      <div className="absolute top-0 left-8 z-10 -translate-y-1/2 border-2 border-black bg-[#FF4911] px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-4">
        SKILLS DIRECTORY [INFINITE LOOP_]
      </div>

      {/* Marquee Container Scrolling Left */}
      <div className="overflow-hidden w-full">
        <div className="flex w-max gap-6 items-center animate-marquee">
          {marqueeItems.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="flex items-center gap-3 border-3 border-black p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-crosshair bg-white min-w-[180px]"
            >
              {/* Colorful Square Icon Border */}
              <div className={`h-11 w-11 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] ${getSkillColor(skill.name, index)}`}>
                {renderSkillIcon(skill.iconName)}
              </div>
              
              <div className="flex flex-col text-left">
                <span className="font-space text-sm font-black text-black leading-none">{skill.name}</span>
                <span className="font-mono text-[9px] uppercase font-bold text-gray-500 mt-1">{skill.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
