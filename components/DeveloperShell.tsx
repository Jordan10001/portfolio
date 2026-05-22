"use client";

import React from "react";

interface DeveloperShellProps {
  devStatusShell?: Record<string, string>;
}

export default function DeveloperShell({ devStatusShell }: DeveloperShellProps) {
  return (
    <div className="border-4 border-black bg-[#7DF9FF] p-6 text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] hover:rotate-0 transition-transform">
      <div className="border-4 border-black bg-white p-4 h-48 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute right-0 bottom-0 text-7xl opacity-35 select-none font-mono">
          &lt;/&gt;
        </div>
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs font-bold bg-[#FF4911] px-2 py-0.5 border-2 border-black">STATUS: AWESOME</span>
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500 border-2 border-black" />
            <span className="h-3 w-3 rounded-full bg-yellow-500 border-2 border-black" />
            <span className="h-3 w-3 rounded-full bg-green-500 border-2 border-black" />
          </div>
        </div>
        <div className="font-mono text-sm leading-tight text-gray-800 antialiased pt-4">
          <p className="text-[#3300FF] font-black">const coder = {"{"}</p>
          {devStatusShell ? (
            Object.entries(devStatusShell).map(([key, val]) => (
              <p key={key} className="pl-4">
                {key}: &apos;{val}&apos;,
              </p>
            ))
          ) : (
            <>
              <p className="pl-4">coffeeLevel: &apos;100%&apos;,</p>
              <p className="pl-4">layoutEngine: &apos;Neobrutalism&apos;,</p>
              <p className="pl-4">speed: &apos;Blazing Fast 🚀&apos;</p>
            </>
          )}
          <p className="text-[#3300FF] font-black">{"};"}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-space font-extrabold text-sm uppercase tracking-wide">Developer Shell Status</span>
        <span className="h-4 w-4 bg-[#2FFF2F] border-2 border-black rounded-full animate-ping" />
      </div>
    </div>
  );
}
