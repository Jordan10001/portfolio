"use client";

import React from "react";

interface CoreStackHighlightsProps {
  coreStack?: string[];
  loopingText?: string;
}

export default function CoreStackHighlights({ coreStack, loopingText }: CoreStackHighlightsProps) {
  const displayStack = coreStack ;
  const displayLoopingText = loopingText ;

  const colors = ["bg-[#FF4911]", "bg-[#7DF9FF]", "bg-[#2FFF2F]", "bg-[#FFFF00]", "bg-[#FF00F5]", "bg-[#3300FF]"];

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[1deg] hover:rotate-0 transition-transform">
      <h3 className="font-space font-black text-lg uppercase mb-3 text-black tracking-tight border-b-2 border-black pb-1">
        Core Stack Highlights
      </h3>
      <div className="flex flex-wrap gap-2">
        {displayStack?.map((tech, idx) => {
          const col = colors[idx % colors.length];
          return (
            <span
              key={tech}
              className={`font-mono text-xs font-extrabold border-2 border-black px-2.5 py-1 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${col}`}
            >
              {tech}
            </span>
          );
        })}
      </div>

      {/* Mini Marquee Inside Bento */}
      <div className="mt-4 border-2 border-black bg-gray-100 overflow-hidden py-1.5 relative select-none">
        <div className="flex gap-6 whitespace-nowrap animate-marquee font-mono text-xs font-bold text-gray-700">
          <span>{displayLoopingText}</span>
        </div>
      </div>
    </div>
  );
}
