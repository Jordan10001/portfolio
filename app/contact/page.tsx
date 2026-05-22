"use client";

import React, { useState } from "react";
import ContactCard from "../../components/ContactCard";
import { Send, Check } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";
import { useTheme } from "../theme-context";

export default function ContactPage() {
  const { accentClass } = useTheme();
  const owner = PORTFOLIO_OWNER;

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const contacts = [
    { label: "email", value: owner.email, link: `mailto:${owner.email}`, iconName: "Mail", colorBg: "bg-[#FF4911]" },
    { label: "whatsapp", value: "Chat on WhatsApp", link: `https://wa.me/${owner.whatsapp.replace(/[^0-9]/g, "")}`, iconName: "MessageSquare", colorBg: "bg-[#2FFF2F]" },
    { label: "instagram", value: owner.instagram, link: `https://instagram.com/${owner.instagram.replace("@", "")}`, iconName: "Instagram", colorBg: "bg-[#FF00F5]" },
    { label: "github", value: `@${owner.githubUsername}`, link: `https://github.com/${owner.githubUsername}`, iconName: "Github", colorBg: "bg-[#7DF9FF]" },
    { label: "linkedin", value: `linkedin.com/in/${owner.linkedin || ""}`, link: `https://linkedin.com/in/${owner.linkedin || ""}`, iconName: "Linkedin", colorBg: "bg-[#FFFF00]" },
    { label: "discord", value: owner.discord || "", link: "https://discord.com", iconName: "MessageCircle", colorBg: "bg-[#3300FF]" },
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const subject = `Portfolio Message from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoUrl = `mailto:${owner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email composer
      window.location.href = mailtoUrl;

      setIsSubmitSuccessful(true);
      setTimeout(() => {
        setIsSubmitSuccessful(false);
        setFormData({ name: "", email: "", message: "" });
      }, 5000); // Popup stays for 5 seconds
    }
  };

  return (
    <div className="py-12 md:py-20 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Title Badge */}
        <div className="mb-12 text-left">
          <div className={`inline-block border-4 border-black ${accentClass || "bg-[#FFFF00]"} px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] select-none rotate-[-1deg]`}>
            <h2 className="font-space font-black text-4xl sm:text-5xl uppercase text-black">
              GET IN TOUCH_
            </h2>
          </div>
          <p className="font-space font-bold text-gray-700 mt-4 max-w-xl text-left">
            Have a project, a question, or a design that violates conventional guidelines? Don&apos;t be shy. 
          </p>
        </div>

        {/* Form + Grid Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Interactive Contact Form (7/12) */}
          <div className="lg:col-span-7 border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative rotate-[-0.5deg] hover:rotate-[0.2deg] transition-all duration-300">
            <div className="absolute top-2 right-4 font-mono text-xs font-black text-gray-400 select-none">
              [ SECURE_SHELL_SEND_V1 ]
            </div>

            <h3 className="font-space text-2xl font-black text-black uppercase mb-6 text-left border-b-2 border-black pb-2">
              Send a Message Direct
            </h3>

            {isSubmitSuccessful && (
              <div className="border-4 border-black bg-[#2FFF2F] p-4 font-space font-black text-black uppercase text-center mb-6 animate-bounce-brutal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="flex items-center justify-center gap-2">
                  <Check size={18} /> ⚡ LAUNCHING EMAIL APPS... READY TO DISPATCH!
                </span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 text-left">
              <div>
                <label className="block font-space font-extrabold text-sm uppercase text-black mb-1.5">
                  Your Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g. Aaron"
                  id="contact-form-name"
                  className="w-full border-4 border-black p-3 font-space text-lg text-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none transition-all placeholder:text-gray-400 focus:bg-amber-50"
                />
              </div>

              <div>
                <label className="block font-space font-extrabold text-sm uppercase text-black mb-1.5">
                  Your Email Address:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g. aaron@aaron.com"
                  id="contact-form-email"
                  className="w-full border-4 border-black p-3 font-space text-lg text-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none transition-all placeholder:text-gray-400 focus:bg-amber-50"
                />
              </div>

              <div>
                <label className="block font-space font-extrabold text-sm uppercase text-black mb-1.5">
                  Message:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  placeholder="Describe your design parameters or challenge details..."
                  id="contact-form-message"
                  className="w-full border-4 border-black p-3 font-space text-lg text-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none transition-all placeholder:text-gray-400 focus:bg-amber-50 resize-none"
                />
              </div>

              <button
                type="submit"
                id="contact-form-submit-btn"
                className="group flex items-center justify-center gap-2 border-4 border-black bg-[#2FFF2F] py-4 px-6 font-space text-lg font-black uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-black hover:text-[#2FFF2F] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer mt-2"
              >
                Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </div>

          {/* Right Block: Fast contact cards + Location Pill (5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Location badge */}
            <div className="border-4 border-black bg-[#FFFF00] p-5 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left rotate-[1.5deg] hover:rotate-[-0.3deg] transition-all duration-300">
              <div className="h-10 w-10 border-2 border-black bg-white flex items-center justify-center font-bold text-lg select-none">
                📍
              </div>
              <div>
                <p className="font-mono text-xs font-black uppercase tracking-wider text-gray-500">CURRENT BASE</p>
                <p className="font-space text-lg font-black text-black uppercase leading-none">{owner.location}</p>
              </div>
            </div>

            {/* Grid of contact links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contacts.map((contact, idx) => (
                <ContactCard
                  key={contact.label}
                  label={contact.label}
                  value={contact.value}
                  link={contact.link}
                  iconName={contact.iconName}
                  colorBg={contact.colorBg}
                  index={idx}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
