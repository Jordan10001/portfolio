import React, { useState } from "react";
import { Mail, MapPin, Copy, Check, Smile } from "lucide-react";

interface AboutSectionProps {
  owner: {
    name: string;
    location: string;
    email: string;
    intro: string;
    aboutTitle?: string;
    aboutIntro?: string;
    aboutDesc?: string;
  };
  accentClass: string;
}

export default function AboutSection({ owner, accentClass }: AboutSectionProps) {
  const [copied, setCopied] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Generative SVG avatar presets to add pure playful micro-interactions!
  const avatarFaces = [
    { mouth: "M 40 70 Q 50 85 60 70", eyes: "M 35 45 L 35 55 M 65 45 L 65 55", accessories: "🤓 Glassy Nerd" },
    { mouth: "M 35 75 Q 50 65 65 75", eyes: "M 30 50 L 40 50 M 60 50 L 70 50", accessories: "😎 Cool Shades" },
    { mouth: "M 38 72 L 62 72", eyes: "M 35 45 L 45 45 M 55 45 L 65 45", accessories: "😐 Focused Dev" },
    { mouth: "M 35 68 Q 50 90 65 68", eyes: "M 30 43 Q 37 50 44 43 M 56 43 Q 63 50 70 43", accessories: "🔥 Hyper Excited" }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(owner.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextAvatar = () => {
    setAvatarIndex((prev) => (prev + 1) % avatarFaces.length);
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Title Tag */}
        <div className="mb-12 text-left">
          <h2 className={`inline-block font-space font-black text-4xl sm:text-5xl uppercase border-4 border-black ${accentClass || "bg-[#CAFFBF]"} px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none`}>
            ABOUT THE DEV_
          </h2>
        </div>

        {/* Image + Text side-by-side grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Generative Neobrutalist Avatar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
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
          </div>

          {/* Right Column: Information Block */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-left">
            
            {/* Biography Container */}
            <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex-1 flex flex-col justify-between rotate-[-0.5deg] hover:rotate-[0.2deg] transition-transform duration-300">
              <div>
                <h3 className="font-space text-2xl sm:text-3xl font-black mb-4 uppercase text-black">
                  {owner.aboutTitle || "Crafting Digital Noise"}
                </h3>
                <p className="font-sans text-base sm:text-lg text-gray-800 leading-relaxed mb-6">
                  {owner.aboutIntro || "I specialize in turning chaotic thoughts into stable codebase systems. I leverage component-driven styling configurations to assemble lightning-fast SPAs that have robust animations and look incredibly distinct."}
                </p>
                <p className="font-sans text-base sm:text-lg text-gray-800 leading-relaxed">
                  {owner.aboutDesc || "Whether writing secure API routers on standard Node setups, managing large datasets with Postgres, or crafting responsive web assets using Vue, React, or pure Tailwind utility classes—I strive for maximum interactivity, playful visual weight, and complete mobile adaptability."}
                </p>
              </div>

              {/* Metainfo grid cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                
                {/* Location Card */}
                <div className="border-3 border-black bg-[#FFFF00] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 rotate-[1.5deg] hover:rotate-[-0.3deg] transition-transform duration-300">
                  <div className="bg-white border-2 border-black p-2 rounded-none">
                    <MapPin className="text-black" size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase font-extrabold text-gray-500">Location Base</p>
                    <p className="font-space font-bold text-gray-900">{owner.location}</p>
                  </div>
                </div>

                {/* Email Address Card */}
                <button
                  onClick={handleCopyEmail}
                  id="email-copy-btn"
                  className="border-3 border-black bg-[#FF00F5] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between text-left transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer w-full overflow-hidden rotate-[-1.5deg] hover:rotate-[0.3deg] transition-transform duration-300"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="bg-white border-2 border-black p-1.5 sm:p-2 rounded-none shrink-0">
                      <Mail className="text-black" size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] sm:text-xs uppercase font-extrabold text-gray-500">Instant Email</p>
                      <p className="font-space font-bold text-xs sm:text-sm md:text-base text-gray-900 truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none">
                        {owner.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-black pb-1 shrink-0 ml-1">
                    {copied ? <Check size={16} className="text-green-700 font-extrabold" /> : <Copy size={16} />}
                  </div>
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
