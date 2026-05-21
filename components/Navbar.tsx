import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import AudioControl from "./AudioControl";

interface NavbarProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
  activeColorTheme: string;
  onThemeChange: (theme: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  currentTrackName?: string;
}

export default function Navbar({
  activeColorTheme,
  onThemeChange,
  isMuted,
  onToggleMute,
  currentTrackName,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Normalize pathnames: "/" -> "", "/about" -> "about", etc.
  const currentRoute = pathname === "/" ? "" : pathname.replace("/", "");

  const menuItems = [
    { name: "Home", key: "" },
    { name: "About", key: "about" },
    { name: "Projects", key: "projects" },
    { name: "Skills & Certificates", key: "skills-certificates" },
    { name: "Contact", key: "contact" },
    { name: "GitHub Tracker", key: "github" },
  ];

  const themePresets = [
    { id: "pink", name: "Magenta Pink", color: "bg-[#FF00F5]" },
    { id: "cyan", name: "Vibrant Cyan", color: "bg-[#7DF9FF]" },
    { id: "green", name: "Lime Green", color: "bg-[#2FFF2F]" },
    { id: "yellow", name: "Electric Yellow", color: "bg-[#FFFF00]" },
    { id: "orange", name: "Neon Orange", color: "bg-[#FF4911]" },
    { id: "blue", name: "Electric Blue", color: "bg-[#3300FF]" },
  ];

  const activePreset = themePresets.find((t) => t.id === activeColorTheme) || themePresets[2];

  return (
    <nav className="sticky top-0 z-50 w-full border-b-4 border-black bg-white py-4 px-4 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Logo Banner */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          id="nav-logo-btn"
          className="group relative flex items-center gap-2 transform transition-transform hover:scale-105"
        >
          <div className="border-4 border-black bg-[#FF4911] px-3 py-1 font-space text-lg font-extrabold tracking-tighter uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            AJ.DEV ⚡
          </div>
        </Link>

        {/* Desktop Navigation Link Cluster */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex bg-white border-4 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {menuItems.map((item) => {
              const isActive = currentRoute === item.key;
              return (
                <Link
                  key={item.key}
                  href={`/${item.key}`}
                  id={`nav-link-${item.key || "home"}`}
                  className={`px-4 py-2 font-space text-sm font-bold border-2 transition-all block text-center ${
                    isActive
                      ? `${activePreset.color} border-black text-black scale-105 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`
                      : "border-transparent hover:bg-gray-100 text-black hover:border-black"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Theme Switchers */}
          <div className="flex items-center gap-2 border-4 border-black bg-white p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ml-2">
            <span className="px-2 font-mono text-xs font-bold text-black flex items-center gap-1">
              <Sparkles size={12} /> THEME:
            </span>
            <div className="flex gap-1.5 pr-1">
              {themePresets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  title={t.name}
                  id={`theme-btn-${t.id}`}
                  className={`h-6 w-6 rounded-none border-2 border-black transition-all transform hover:scale-110 ${t.color} ${
                    activeColorTheme === t.id
                      ? "ring-2 ring-black scale-110 shadow-[1px_1px_0px_1px_rgba(0,0,0,1)]"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mute/Unmute audio button */}
          <div className="flex items-center gap-2 ml-2">
            {!isMuted && currentTrackName && (
              <span className="hidden xl:inline-block font-mono text-[10px] font-bold border-2 border-black bg-yellow-100 px-2.5 py-1.5 uppercase tracking-wider animate-pulse shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                🎵 NOW PLAYING: {currentTrackName}
              </span>
            )}
            <AudioControl
              isMuted={isMuted}
              onToggleMute={onToggleMute}
              id="nav-audio-mute-btn"
            />
          </div>
        </div>

        {/* Mobile menu button and theme pill */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile icon-only Mute/Unmute button outside the drawer */}
          <AudioControl
            isMuted={isMuted}
            onToggleMute={onToggleMute}
            id="mobile-audio-mute-btn"
            className="border-3 p-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
          />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="border-3 border-black p-2 bg-[#7DF9FF] active:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="absolute right-4 top-20 z-50 w-72 max-w-full border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:hidden transition-all duration-150 animate-bounce-brutal">
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = currentRoute === item.key;
              return (
                <Link
                  key={item.key}
                  href={`/${item.key}`}
                  onClick={() => setIsOpen(false)}
                  className={`w-full py-2 text-left px-3 font-space text-sm font-extrabold border-3 border-black transition-all block ${
                    isActive
                      ? `${activePreset.color} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px] text-black`
                      : "bg-white hover:bg-gray-100 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Mobile Themes Pill */}
            <div className="mt-2 border-3 border-black p-3 bg-gray-50">
              <p className="font-space text-xs font-black mb-2 text-black">THEME COLOR:</p>
              <div className="flex flex-wrap gap-1.5">
                {themePresets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onThemeChange(t.id);
                      setIsOpen(false);
                    }}
                    className={`px-2 py-1 border-2 border-black font-mono text-[10px] font-black font-space flex items-center gap-1 transition-all transform hover:scale-105 ${t.color} text-black ${
                      activeColorTheme === t.id ? "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-1px]" : ""
                    }`}
                  >
                    <span>{t.id.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Now Playing Info */}
            {!isMuted && currentTrackName && (
              <div className="mt-2 border-3 border-black p-3 bg-yellow-100 text-black">
                <p className="font-space text-[10px] font-black uppercase text-gray-700">📻 CURRENT TRACK:</p>
                <p className="font-mono text-xs font-bold uppercase mt-1 tracking-wider animate-pulse">
                  {currentTrackName}
                </p>
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
