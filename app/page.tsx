"use client";

import React from "react";
import { ArrowUpRight, Send, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { PORTFOLIO_OWNER } from "./data";
import { useTheme } from "./theme-context";
import DeveloperShell from "../components/DeveloperShell";
import CoreStackHighlights from "../components/CoreStackHighlights";

export default function Home() {
  const { accentClass } = useTheme();
  const router = useRouter();
  const owner = PORTFOLIO_OWNER;

  return (
    <div className="relative py-12 md:py-20 px-4 sm:px-8 overflow-hidden">
      {/* Background Design Accents */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 -z-10 h-[28rem] w-full max-w-5xl border-4 border-dashed border-black/25 opacity-20 pointer-events-none" />
      <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full border-4 border-black bg-[#FF4911]/30 -z-10 rotate-12" />
      <div className="absolute bottom-10 right-10 h-32 w-48 border-4 border-black bg-[#7DF9FF]/30 -z-10 -rotate-6" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Content Pane (Asymmetrical Columns - 7/12) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Playful Floating Tag */}
            <div className="self-start inline-flex items-center gap-2 border-3 border-black bg-[#FFFF00] px-3.5 py-1.5 font-space text-xs sm:text-sm font-black uppercase tracking-wider text-black rotate-[-2deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Zap size={14} className="fill-black animate-pulse" /> Available 24/7
            </div>

            {/* Huge Display Typography Header */}
            <div className="relative">
              <h1 className="font-space font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight sm:leading-none text-black tracking-tight uppercase">
                HELLO, I&apos;M <br />
                <span className={`inline-block border-4 border-black px-3 py-1.5 sm:px-4 sm:py-2 my-2 ${accentClass} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-all rotate-[1deg] break-words max-w-full`}>
                  {owner.name}
                </span>
              </h1>
              {/* Absoluted design accent badge */}
              <div className="absolute right-0 -top-6 hidden lg:block border-3 border-black bg-[#FF00F5] p-2 font-mono text-xs font-bold text-black rotate-[15deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {"{ coding 24/7 }"}
              </div>
            </div>

            {/* Tagline Description Box */}
            <p className="font-space text-base sm:text-xl lg:text-2xl font-bold text-gray-900 border-l-8 border-black pl-4">
              {owner.shortDesc}
            </p>

            {/* Intro paragraph card */}
            <div className="border-4 border-black bg-white p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]">
              <p className="font-sans text-sm sm:text-base lg:text-lg font-medium leading-relaxed text-gray-800">
                {owner.intro}
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-2">
              <motion.button
                onClick={() => router.push("/projects")}
                id="hero-projects-btn"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 border-4 border-black bg-[#2FFF2F] px-4 py-3 sm:px-6 sm:py-3.5 font-space text-base sm:text-lg font-black uppercase text-black cursor-pointer"
                initial={{ x: 0, y: 0, boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
                whileHover={{
                  x: -4,
                  y: -4,
                  boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)"
                }}
                whileTap={{
                  x: 2,
                  y: 2,
                  boxShadow: "1px 1px 0px 0px rgba(0,0,0,1)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 14 }}
              >
                View My Projects <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => router.push("/contact")}
                id="hero-contact-btn"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border-4 border-black bg-white px-4 py-3 sm:px-6 sm:py-3.5 font-space text-base sm:text-lg font-black uppercase text-black cursor-pointer hover:bg-gray-50"
                initial={{ x: 0, y: 0, boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
                whileHover={{
                  x: -4,
                  y: -4,
                  boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)"
                }}
                whileTap={{
                  x: 2,
                  y: 2,
                  boxShadow: "1px 1px 0px 0px rgba(0,0,0,1)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 14 }}
              >
                Let&apos;s Talk! <Send size={18} />
              </motion.button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6 relative">
            
            <div className="absolute -right-4 -top-8 animate-spin-slow bg-yellow-300 text-black border-4 border-black w-20 h-20 flex items-center justify-center font-black text-xs rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-12 z-10 pointer-events-none select-none">
              <div className="text-center tracking-tighter leading-tight font-space">
                ERROR<br/>404_
              </div>
            </div>

            {/* Grid Box 1: Interactive Canvas/Illustration Card */}
            <DeveloperShell devStatusShell={owner.devStatusShell} />

            {/* Grid Box 2: Tech Specs Bento list */}
            <CoreStackHighlights coreStack={owner.coreStack} loopingText={owner.loopingText} />

          </div>

        </div>
      </div>
    </div>
  );
}
