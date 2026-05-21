import React from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioControlProps {
  isMuted: boolean;
  onToggleMute: () => void;
  id?: string;
  className?: string;
}

export default function AudioControl({
  isMuted,
  onToggleMute,
  id = "audio-mute-btn",
  className = "",
}: AudioControlProps) {
  return (
    <button
      onClick={onToggleMute}
      id={id}
      className={`flex items-center justify-center border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
        isMuted ? "bg-red-400 text-black hover:bg-red-500" : "bg-[#2FFF2F] text-black hover:bg-[#1fdf1f]"
      } ${className}`}
      title={isMuted ? "Unmute Backsound" : "Mute Backsound"}
    >
      {isMuted ? (
        <VolumeX size={16} className="stroke-2 shrink-0" />
      ) : (
        <Volume2 size={16} className="stroke-2 shrink-0" />
      )}
    </button>
  );
}
