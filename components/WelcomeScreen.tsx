"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface WelcomeScreenProps {
  hasEntered: boolean;
  isMounted: boolean;
  onEnter: () => void;
}

export default function WelcomeScreen({
  hasEntered,
  isMounted,
  onEnter,
}: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);

  // Real Asset Preloader Logic
  useEffect(() => {
    if (!isMounted) return;

    const assets = [
      { url: "/audio/slab_geometry.mp3", type: "audio" },
      { url: "/audio/load_bearing.mp3", type: "audio" },
      { url: "/audio/monolith_glass.mp3", type: "audio" },
      { url: "/projects/coming-soon.png", type: "image" },
      { url: "/certificates/coming-soon.png", type: "image" },
    ];

    let loadedCount = 0;
    const totalAssets = assets.length;

    const handleAssetLoaded = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalAssets) * 100);
      setProgress(currentProgress);
    };

    assets.forEach((asset) => {
      if (asset.type === "image") {
        const img = new Image();
        img.src = asset.url;
        img.onload = handleAssetLoaded;
        img.onerror = handleAssetLoaded; // avoid freezing on load failures
      } else if (asset.type === "audio") {
        const aud = new Audio();
        aud.src = asset.url;
        aud.preload = "auto";
        aud.addEventListener("canplaythrough", handleAssetLoaded, { once: true });
        aud.addEventListener("error", handleAssetLoaded, { once: true }); // avoid freezing on load failures
        aud.load();
      }
    });

    // Safety Timeout: Force load completion if it takes more than 12 seconds
    const safetyTimeout = setTimeout(() => {
      setProgress(100);
    }, 12000);

    return () => clearTimeout(safetyTimeout);
  }, [isMounted]);

  return (
    <AnimatePresence>
      {!hasEntered && isMounted && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: "-100%",
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.8
            }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0F11] px-4 select-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)",
            backgroundSize: "24px 24px"
          }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 15 }}
            className="w-full max-w-2xl border-6 border-black bg-white p-6 md:p-10 shadow-[16px_16px_0px_rgba(0,0,0,1)] text-black flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Retro absolute corner markings */}
            <div className="absolute top-2 left-2 font-mono text-[10px] text-gray-400 font-bold">{"// SECURE_CONN_INIT"}</div>
            <div className="absolute top-2 right-2 font-mono text-[10px] text-gray-400 font-bold">AJ_OS_V2.0</div>

            {/* Big Neo-Brutalist Heading */}
            <h1 className="font-space font-black text-4xl sm:text-6xl uppercase tracking-tighter text-black leading-none mb-8 mt-4">
              AARON J.
              <span className="block text-xl sm:text-2xl mt-2 bg-[#FF00F5] text-white py-1 px-3 border-3 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-[-1deg] w-fit mx-auto">
                PORTFOLIO_SYSTEM_2026
              </span>
            </h1>

            {/* Premium Progress Bar Loader */}
            <div className="w-full border-4 border-black bg-gray-100 p-1 mb-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative select-none">
              <div 
                className="h-6 bg-[#2FFF2F] border-r-4 border-black transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-space font-black text-xs text-black mix-blend-difference">
                [ AJ_SYSTEM_LOAD: {progress}% ]
              </div>
            </div>

            {/* Enter Button */}
            <motion.button
              disabled={progress < 100}
              whileHover={progress === 100 ? { scale: 1.04, rotate: 0.5 } : {}}
              whileTap={progress === 100 ? { scale: 0.96 } : {}}
              onClick={progress === 100 ? onEnter : undefined}
              className={`w-full max-w-xs border-4 border-black py-4 px-6 font-space font-black text-xl uppercase shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 ${
                progress === 100 
                  ? "bg-[#2FFF2F] text-black cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#1fff1f]" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-[2px_2px_0px_rgba(0,0,0,1)] opacity-60"
              }`}
            >
              {progress === 100 ? "ENTER SYSTEM ⚡" : `PRELOADING ASSETS... ${progress}%`}
            </motion.button>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
