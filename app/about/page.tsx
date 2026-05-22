"use client";

import React, { useState } from "react";
import { Mail, MapPin, Copy, Check } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";
import { useTheme } from "../theme-context";
import InteractiveAvatar from "../../components/InteractiveAvatar";

export default function AboutPage() {
  const { accentClass } = useTheme();
  const owner = PORTFOLIO_OWNER;

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(owner.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <InteractiveAvatar />
          </div>

          {/* Right Column: Information Block */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-left">
            
            {/* Biography Container */}
            <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex-1 flex flex-col justify-between rotate-[-0.5deg] hover:rotate-[0.2deg] transition-transform duration-300">
              <div>
                <h3 className="font-space text-2xl sm:text-3xl font-black mb-4 uppercase text-black">
                  {owner.aboutTitle}
                </h3>
                <p className="font-sans text-base sm:text-lg text-gray-800 leading-relaxed mb-6">
                  {owner.aboutIntro}
                </p>
                <p className="font-sans text-base sm:text-lg text-gray-800 leading-relaxed">
                  {owner.aboutDesc}
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
