import type { Metadata, Viewport } from "next";
import "./globals.css";
import LayoutClient from "./layout-client";

export const metadata: Metadata = {
  title: "Aaron Jordan // Neobrutalist Developer",
  description: "Building raw, Experiment, Prototype , and high-impact web experiences. Interested in LLM.",
  keywords: [ "Aaron Jordan", "Software Developer", "Portfolio", "Full Stack Developer", "TypeScript", "React", "Next.js"],
  authors: [{ name: "Aaron Jordan" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
