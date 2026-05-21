import React from "react";
import * as Icons from "lucide-react";

interface ContactCardProps {
  label: string;
  value: string;
  link: string;
  iconName: string;
  colorBg: string; 
  index?: number;
}

export default function ContactCard({
  label,
  value,
  link,
  iconName,
  colorBg,
  index = 0,
}: ContactCardProps) {
  // Safe helper to resolve Lucide Icon dynamically
  const renderIcon = (name: string, className = "text-black h-8 w-8") => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.Send className={className} />; // Fallback
  };

  const isEmail = label.toLowerCase() === "email";
  const rotateClass = index % 2 === 0 ? "rotate-[-1.5deg] hover:rotate-[0.5deg]" : "rotate-[1.5deg] hover:rotate-[-0.5deg]";

  return (
    <a
      href={isEmail ? `mailto:${value}` : link}
      target={isEmail ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className={`group border-4 border-black ${colorBg} p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] duration-150 flex flex-col justify-between text-left min-h-[11rem] gap-4 cursor-pointer ${rotateClass}`}
      id={`contact-card-${label.toLowerCase()}`}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-xs font-black uppercase tracking-wider text-black bg-white border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          {label}
        </span>
        <div className="border-3 border-black bg-white p-2 rounded-none transform group-hover:rotate-12 transition-transform">
          {renderIcon(iconName)}
        </div>
      </div>

      <div className="min-w-0 w-full overflow-hidden">
        <h4 className="font-space text-sm sm:text-base lg:text-lg font-black text-black leading-tight uppercase group-hover:underline break-all whitespace-normal">
          {value}
        </h4>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-extrabold text-gray-700 mt-2">
          <span>{isEmail ? "LAUNCH INBOX" : "VISIT LINK"}</span>
          <Icons.ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </a>
  );
}
