"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import { ThemeProvider, useTheme } from "./theme-context";
import { PLAYLIST_DATA } from "./data";
import { ArrowUp, ToggleLeft, ToggleRight, MousePointer2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { activeColorTheme, setActiveColorTheme, accentClass, containerClass } = useTheme();

  const [isMounted, setIsMounted] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [useCustomCursor, setUseCustomCursor] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync mute state and volume settings
  useEffect(() => {
    if (!isMounted) return;
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = 0.45;
      if (!isMuted) {
        audioRef.current.play()
          .catch((error) => {
            console.log("Autoplay blocked by browser. Music plays upon interaction.", error);
          });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, isMounted]);

  // First user interaction listener to trigger autoplay if blocked
  useEffect(() => {
    if (!isMounted) return;
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current && !isMuted) {
          audioRef.current.play().catch((err) => console.log("Play failed on first interaction:", err));
        }
      }
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("scroll", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasInteracted, isMuted, isMounted]);

  // Cycle to the next song when current track ends
  const handleAudioEnded = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % PLAYLIST_DATA.length);
  };

  // React to current track index changes: load and play the new track
  useEffect(() => {
    if (!isMounted) return;
    if (audioRef.current) {
      audioRef.current.load();
      if (!isMuted) {
        audioRef.current.play()
          .catch((err) => console.log("Failed to play next track automatically:", err));
      }
    }
  }, [currentTrackIndex, isMounted]);

  // Custom Cursor Move Listener
  useEffect(() => {
    if (!isMounted || !useCustomCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [useCustomCursor, isMounted]);

  // Scroll position watcher for scroll-to-top button
  useEffect(() => {
    if (!isMounted) return;
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Scroll to top of the physical page
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen relative font-sans ${containerClass} select-text transition-colors duration-300 flex flex-col`}>
      
      {/* Dynamic Neobrutal Custom Cursor Follower with Spring Physics */}
      {isMounted && useCustomCursor && (
        <motion.div
          className="custom-cursor fixed pointer-events-none z-50 h-5 w-5 border-2.5 border-black bg-[#FF00F5] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hidden lg:block"
          animate={{
            x: cursorPosition.x - 10,
            y: cursorPosition.y - 10,
          }}
          transition={{
            type: "spring",
            damping: 24,
            stiffness: 400,
            mass: 0.18
          }}
        />
      )}

      {/* STICKY HEADER NAVBAR */}
      <Navbar
        currentRoute=""
        onRouteChange={() => {}}
        activeColorTheme={activeColorTheme}
        onThemeChange={setActiveColorTheme}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((prev) => !prev)}
        currentTrackName={isMounted ? PLAYLIST_DATA[currentTrackIndex].name : undefined}
      />

      {/* MAIN DYNAMIC PAGE CONTENT VIEWPORT WITH SMOOTH STAGGER TRANSIENT FADES */}
      <main className="relative z-10 w-full flex-1 overflow-hidden">
        {isMounted ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 18
              }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="w-full min-h-[60vh] flex items-center justify-center">
            <div className="text-xl font-space font-black uppercase text-black animate-pulse">Initializing AJ.DEV...</div>
          </div>
        )}
      </main>

      {/* FOOTER & ACCESSIBILITY RAIL */}
      <footer className="w-full border-t-4 border-black bg-white py-8 px-4 sm:px-8 text-black relative z-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright signature */}
          <div className="text-left">
            <p className="font-space font-black text-lg uppercase tracking-tight">
              ⚡ AARON J. // Portfolio 2026
            </p>
            <p className="font-mono text-xs text-gray-500 uppercase mt-1">
              Devised in TypeScript • Modeled on Neo-Brutalist Layout Parameters
            </p>
          </div>

          {/* Interactive controls (Cursor toggle & preset) */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Custom Cursor Toggle UI */}
            <div className="flex items-center gap-2 border-2 border-black bg-gray-50 px-3 py-1.5 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <span className="font-mono text-xs font-bold text-gray-600 flex items-center gap-1">
                <MousePointer2 size={12} /> SPARK CURSOR:
              </span>
              <button
                onClick={() => setUseCustomCursor(!useCustomCursor)}
                id="footer-cursor-toggle"
                className="text-black transform active:scale-95 transition-all"
                title="Toggle custom cursor pointer effect"
              >
                {useCustomCursor ? (
                  <ToggleRight size={28} className="text-[#2FFF2F] fill-black stroke-black" />
                ) : (
                  <ToggleLeft size={28} className="text-gray-400" />
                )}
              </button>
            </div>

            {/* Direct Status banner */}
            <div className="border-2 border-black bg-black text-white px-3 py-1.5 font-mono text-xs uppercase tracking-wider font-extrabold shadow-[2px_2px_0px_#3300FF]">
              // SYSTEM_OPERATIONAL ★★★★
            </div>

            {/* Currently Playing Song Banner */}
            {isMounted && !isMuted && (
              <div className="border-2 border-black bg-[#FFFF00] text-black px-3 py-1.5 font-space text-xs uppercase tracking-wider font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-pulse">
                📻 NOW PLAYING: {PLAYLIST_DATA[currentTrackIndex].name}
              </div>
            )}
          </div>

        </div>
      </footer>

      {/* FLOAT SCROLL TO TOP CHROME */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="scroll-to-top-btn"
          className="fixed bottom-6 right-6 z-40 border-4 border-black bg-[#FFFF00] p-3 text-black font-black uppercase shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          title="Scroll up"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Hidden Auto-Cycling Audio backsound playing system */}
      {isMounted && (
        <audio 
          ref={audioRef}
          src={PLAYLIST_DATA[currentTrackIndex].url}
          autoPlay
          onEnded={handleAudioEnded}
        />
      )}

    </div>
  );
}

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
