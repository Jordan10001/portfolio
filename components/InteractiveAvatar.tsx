"use client";

import React, { useState } from "react";
import { Smile } from "lucide-react";

export default function InteractiveAvatar() {
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Generative SVG avatar presets to add pure playful micro-interactions!
  const avatarFaces = [
    { mouth: "M 40 70 Q 50 85 60 70", eyes: "M 35 45 L 35 55 M 65 45 L 65 55", accessories: "🤓 Glassy Nerd" },
    { mouth: "M 35 75 Q 50 65 65 75", eyes: "M 30 50 L 40 50 M 60 50 L 70 50", accessories: "😎 Cool Shades" },
    { mouth: "M 38 72 L 62 72", eyes: "M 35 45 L 45 45 M 55 45 L 65 45", accessories: "😐 Focused Dev" },
    { mouth: "M 35 68 Q 50 90 65 68", eyes: "M 30 43 Q 37 50 44 43 M 56 43 Q 63 50 70 43", accessories: "🔥 Hyper Excited" }
  ];

  const nextAvatar = () => {
    setAvatarIndex((prev) => (prev + 1) % avatarFaces.length);
  };

  return (
    <div className="relative border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex-1 flex flex-col justify-between items-center rotate-[1.5deg] hover:rotate-[-0.3deg] transition-transform duration-300">
      
      {/* Floating Sticker */}
      <div className="absolute top-2 -left-6 border-3 border-black bg-[#FF4911] px-3 py-1 font-space text-xs font-extrabold uppercase rotate-[-15deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {avatarFaces[avatarIndex].accessories}
      </div>

      {/* Vector SVG Avatar */}
      <div className="w-full max-w-[200px] aspect-square border-4 border-black bg-[#FFFF00] flex items-center justify-center my-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
          {/* Face Outline */}
          <rect x="15" y="15" width="70" height="70" fill="#ffffff" stroke="#000000" strokeWidth="4" />
          
          {/* Eyes */}
          {avatarIndex === 1 ? (
            /* Sunglasses */
            <g>
              <rect x="25" y="40" width="20" height="15" fill="#000000" />
              <rect x="55" y="40" width="20" height="15" fill="#000000" />
              <line x1="45" y1="45" x2="55" y2="45" stroke="#000000" strokeWidth="4" />
            </g>
          ) : (
            /* Natural/Nerd eyes */
            <g stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d={avatarFaces[avatarIndex].eyes} />
              {avatarIndex === 0 && (
                /* Nerd glasses circles */
                <g>
                  <rect x="22" y="38" width="22" height="22" fill="none" stroke="#000000" strokeWidth="3" />
                  <rect x="54" y="38" width="22" height="22" fill="none" stroke="#000000" strokeWidth="3" />
                  <line x1="44" y1="48" x2="54" y2="48" stroke="#000000" strokeWidth="3" />
                </g>
              )}
            </g>
          )}

          {/* Mouth */}
          <path
            d={avatarFaces[avatarIndex].mouth}
            fill="none"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Cheek colors */}
          <circle cx="28" cy="65" r="4" fill="#FF00F5" />
          <circle cx="72" cy="65" r="4" fill="#FF00F5" />
        </svg>
      </div>

      {/* Interaction button (randomizes avatar) */}
      <button
        onClick={nextAvatar}
        className="w-full flex items-center justify-center gap-2 border-3 border-black bg-[#7DF9FF] py-2 font-space text-sm font-bold uppercase transition-all hover:bg-[#5cebff] active:translate-y-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer text-black"
        id="customize-avatar-btn"
      >
        <Smile size={16} /> Cycle Art Face
      </button>
    </div>
  );
}
