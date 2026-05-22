"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextProps {
  activeColorTheme: string;
  setActiveColorTheme: (theme: string) => void;
  accentClass: string;
  containerClass: string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeColorTheme, setActiveColorTheme] = useState("green"); // default green
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Update dynamic scrollbar colors on theme action
  useEffect(() => {
    if (!isMounted) return;
    const root = document.documentElement;
    let thumbColor = "#2FFF2F";
    let hoverColor = "#FF00F5";

    if (activeColorTheme === "pink") {
      thumbColor = "#FF00F5";
      hoverColor = "#3300FF";
    } else if (activeColorTheme === "cyan") {
      thumbColor = "#7DF9FF";
      hoverColor = "#FF00F5";
    } else if (activeColorTheme === "green") {
      thumbColor = "#2FFF2F";
      hoverColor = "#FF4911";
    } else if (activeColorTheme === "yellow") {
      thumbColor = "#FFFF00";
      hoverColor = "#7DF9FF";
    } else if (activeColorTheme === "orange") {
      thumbColor = "#FF4911";
      hoverColor = "#3300FF";
    } else if (activeColorTheme === "blue") {
      thumbColor = "#3300FF";
      hoverColor = "#FF00F5";
    }

    root.style.setProperty("--scrollbar-thumb", thumbColor);
    root.style.setProperty("--scrollbar-thumb-hover", hoverColor);
  }, [activeColorTheme, isMounted]);

  const getThemeLayoutClasses = () => {
    switch (activeColorTheme) {
      case "pink":
        return {
          container: "bg-[#FFF0FB] text-black",
          accent: "bg-[#FF00F5]",
        };
      case "cyan":
        return {
          container: "bg-[#E6FFFF] text-black",
          accent: "bg-[#7DF9FF]",
        };
      case "green":
        return {
          container: "bg-[#F0FFF0] text-black",
          accent: "bg-[#2FFF2F]",
        };
      case "yellow":
        return {
          container: "bg-[#FFFFE0] text-black",
          accent: "bg-[#FFFF00]",
        };
      case "orange":
        return {
          container: "bg-[#FFF5EE] text-black",
          accent: "bg-[#FF4911]",
        };
      case "blue":
        return {
          container: "bg-[#F0F0FF] text-black",
          accent: "bg-[#3300FF]",
        };
      default:
        return {
          container: "bg-[#F0FFF0] text-black",
          accent: "bg-[#2FFF2F]",
        };
    }
  };

  const themeClasses = getThemeLayoutClasses();

  return (
    <ThemeContext.Provider
      value={{
        activeColorTheme,
        setActiveColorTheme,
        accentClass: themeClasses.accent,
        containerClass: themeClasses.container,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
