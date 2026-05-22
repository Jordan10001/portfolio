"use client";

import React from "react";
import SkillMarquee from "../../components/SkillMarquee";
import CertificateCard from "../../components/CertificateCard";
import { SKILLS_DATA, CERTIFICATES_DATA } from "../data";
import { useTheme } from "../theme-context";

export default function SkillsCertificatesPage() {
  const { accentClass } = useTheme();
  const skills = SKILLS_DATA;
  const certificates = CERTIFICATES_DATA;

  return (
    <div className="py-12 md:py-20 flex flex-col gap-12">
      
      {/* 1. SECTION HEADER */}
      <div className="px-4 sm:px-8 mx-auto w-full max-w-7xl text-left">
        <div className={`inline-block border-4 border-black ${accentClass || "bg-[#FF00F5]"} px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none rotate-[0.5deg]`}>
          <h2 className="font-space font-black text-4xl sm:text-5xl uppercase text-black">
            SKILLS & CERTIFICATES_
          </h2>
        </div>
        <p className="font-space font-bold text-gray-700 mt-4 max-w-xl text-left">
          A collection of raw technical skills and the certificates to back them up. Built with chaos, delivered with precision.
        </p>
      </div>

      {/* 2. INFINITE SKILL MARQUEE (TOP) */}
      <div className="w-full">
        <SkillMarquee skills={skills} />
      </div>

      {/* 3. CERTIFICATES STACK (BELOW) */}
      <div className="px-4 sm:px-8 mx-auto w-full max-w-7xl">
        <div className="border-4 border-black bg-[#2FFF2F] p-4 mb-8 text-left inline-block shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-[-0.5deg]">
          <span className="font-space font-extrabold text-sm sm:text-base uppercase text-black tracking-tight">
            🎖️ Certificate:
          </span>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              index={index}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
