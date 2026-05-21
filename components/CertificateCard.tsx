import React from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { Certificate } from "../app/types";

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export default function CertificateCard({ certificate, index }: CertificateCardProps) {
  const pastels = [
    "bg-[#FFFF00]", // Electric Yellow
    "bg-[#2FFF2F]", // Lime Green
    "bg-[#7DF9FF]"  // Vibrant Cyan
  ];

  const colorBg = pastels[index % pastels.length];
  const rotateClass = index % 2 === 0 ? "rotate-[-1deg] hover:rotate-[0.5deg]" : "rotate-[1deg] hover:rotate-[-0.5deg]";

  return (
    <div className={`group border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] duration-150 flex flex-col justify-between text-left relative ${rotateClass}`}>
      
      {/* Absolute badge marker */}
      <div className="absolute -top-3 left-4 border-2 border-black bg-black px-2 py-0.5 font-mono text-[9px] font-black uppercase text-white tracking-widest">
        VERIFIED_0{index + 1}
      </div>

      <div>
        {/* Certificate Emblem Frame Wrapper */}
        <div className="relative mb-5">
          <div className={`h-28 border-3 border-black ${colorBg} flex items-center justify-center relative select-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${
            certificate.image && (
              certificate.image.startsWith("http") ||
              certificate.image.startsWith("/") ||
              certificate.image.startsWith("./") ||
              certificate.image.includes(".")
            ) ? "p-0" : "p-4"
          }`}>
            {certificate.image && (
              certificate.image.startsWith("http") ||
              certificate.image.startsWith("/") ||
              certificate.image.startsWith("./") ||
              certificate.image.includes(".")
            ) ? (
              <img
                src={certificate.image}
                alt={certificate.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {certificate.image}
              </div>
            )}
          </div>
          {/* Subtle seal overlay on top of the frame */}
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 border-2 border-black h-8 w-8 rounded-full flex items-center justify-center font-extrabold rotate-12 text-xs z-20 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] select-none">
            ★
          </div>
        </div>

        {/* Certificate Title */}
        <h3 className="font-space text-xl font-extrabold text-black leading-tight uppercase mb-2">
          {certificate.name}
        </h3>

        {/* Issuer Info row */}
        <div className="flex flex-col gap-1 mb-4">
          <p className="font-space text-sm font-bold text-gray-800 flex items-center gap-1.5">
            <Award size={14} className="text-gray-900 fill-yellow-200" /> {certificate.issuer}
          </p>
          <p className="font-mono text-xs font-semibold text-gray-500 flex items-center gap-1.5">
            <Calendar size={13} /> Completed: {certificate.date}
          </p>
        </div>
      </div>

      {/* Footer Link Button */}
      {certificate.link && (
        <a
          href={certificate.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 border-2.5 border-black bg-white py-2 font-space text-xs font-bold uppercase transition-all hover:bg-black hover:text-white active:translate-y-0.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer text-black"
          id={`cert-link-${certificate.id}`}
        >
          Check Verification <ExternalLink size={12} />
        </a>
      )}

    </div>
  );
}
