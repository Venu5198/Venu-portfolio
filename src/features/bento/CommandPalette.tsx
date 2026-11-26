"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check } from "lucide-react";
import { profileData } from "@/shared/data/profile";
import { useTheme } from "@/shared/context/ThemeContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: (projectId: string) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenModal,
}: CommandPaletteProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [query, setQuery] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const copyContact = (text: string, label: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      }
      setCopiedText(label);
      setTimeout(() => {
        setCopiedText(null);
        onClose();
      }, 1200);
    } catch {
      setCopiedText(label);
      setTimeout(() => {
        setCopiedText(null);
        onClose();
      }, 1200);
    }
  };

  const scrollToTile = (tileId: string) => {
    const el = document.getElementById(tileId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    onClose();
  };

  const actions = [
    {
      id: "terminal-mode",
      title: "Switch to Terminal Mode (Neovim & Code Wall)",
      subtitle: "Interactive developer buffer tabs, wheel navigation, :theme engine",
      category: "Modes",
      action: () => {
        onClose();
        window.location.href = "/terminal";
      },
    },
    {
      id: "theme-toggle",
      title: `Switch Appearance to iOS ${isDark ? "Light" : "Dark"}`,
      subtitle: `Currently in iOS ${isDark ? "Dark" : "Light"} system`,
      category: "System",
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: "syncrivo",
      title: "Inspect SyncRivo Architecture & Safeguards",
      subtitle: "5-Platform Messaging Bridge, Redis SETNX, sub-95ms transit",
      category: "Case Studies",
      action: () => {
        onClose();
        onOpenModal("syncrivo");
      },
    },
    {
      id: "ocnora",
      title: "Inspect OCNORA DAG & AI Runtime",
      subtitle: "1,000+ app providers, token circuit breakers, stateful execution",
      category: "Case Studies",
      action: () => {
        onClose();
        onOpenModal("ocnora");
      },
    },
    {
      id: "finops",
      title: "Simulate GCP FinOps Rightsizing",
      subtitle: "Interactive 25% cloud spend reduction simulator",
      category: "Interactive Tools",
      action: () => scrollToTile("tile-finops"),
    },
    {
      id: "stack",
      title: "Filter Deployment Pipeline & Tech Matrix",
      subtitle: "Rolling/Blue-Green switcher, 0.25x slow-mo, and tech pills",
      category: "Interactive Tools",
      action: () => scrollToTile("tile-stack"),
    },
    {
      id: "credentials",
      title: "View AWS & CKA Cloud Credentials",
      subtitle: "AWS DevOps Pro, CKA, Terraform Associate, Reliability Award",
      category: "Credentials",
      action: () => scrollToTile("tile-credentials"),
    },
    {
      id: "copy-email",
      title: `Copy Email: ${profileData.contact.email}`,
      subtitle: "Direct contact outreach",
      category: "Contact",
      action: () => copyContact(profileData.contact.email, "Email Copied!"),
    },
    {
      id: "copy-phone",
      title: `Copy Phone: ${profileData.contact.phone}`,
      subtitle: "Direct telephony / WhatsApp",
      category: "Contact",
      action: () => copyContact(profileData.contact.phone, "Phone Copied!"),
    },
    {
      id: "github",
      title: "Open GitHub Profile (Venu5198)",
      subtitle: "github.com/Venu5198",
      category: "Social Links",
      action: () => {
        window.open(profileData.contact.github, "_blank");
        onClose();
      },
    },
    {
      id: "linkedin",
      title: "Open LinkedIn Profile",
      subtitle: "Connect on LinkedIn",
      category: "Social Links",
      action: () => {
        window.open(profileData.contact.linkedin, "_blank");
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Palette Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -16 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className={`relative w-full max-w-xl rounded-3xl border shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 ${
            isDark
              ? "bg-[#161618] border-white/15 text-[#F5F5F7]"
              : "bg-white border-black/10 text-[#1D1D1F]"
          }`}
        >
          {/* Search Header */}
          <div
            className={`p-4 border-b flex items-center gap-3 ${
              isDark ? "border-white/[0.08]" : "border-black/[0.08]"
            }`}
          >
            <Search className="w-5 h-5 text-[#007AFF] dark:text-[#32ADE6] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, toggle theme, copy contact..."
              className="w-full bg-transparent text-sm focus:outline-none font-mono"
            />
            {copiedText && (
              <span className="text-xs font-mono text-[#34C759] dark:text-[#30D158] flex items-center gap-1 shrink-0 font-semibold">
                <Check className="w-3.5 h-3.5" />
                {copiedText}
              </span>
            )}
            <kbd
              className={`px-2 py-1 rounded text-[10px] font-mono shrink-0 ${
                isDark ? "bg-white/10 text-[#A1A1AA]" : "bg-black/10 text-[#52525B]"
              }`}
            >
              ESC
            </kbd>
          </div>

          {/* Action List */}
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
            {filteredActions.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono opacity-60">
                No matching actions found for &quot;{query}&quot;.
              </div>
            ) : (
              filteredActions.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full p-3 rounded-2xl transition-colors flex items-center justify-between text-left group cursor-pointer ${
                    isDark ? "hover:bg-white/[0.06]" : "hover:bg-black/[0.04]"
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 pr-3">
                    <div className="text-xs font-semibold flex items-center gap-2 truncate">
                      <span>{item.title}</span>
                    </div>
                    <div className="text-[11px] font-mono opacity-70 truncate">
                      {item.subtitle}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                      isDark ? "bg-white/[0.05] text-zinc-300" : "bg-black/[0.05] text-zinc-700"
                    }`}
                  >
                    {item.category}
                  </span>
                </button>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
