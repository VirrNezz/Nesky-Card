import React, { useState } from 'react';
import {
  Github,
  Globe,
  Terminal,
  Mail,
  Code2,
  Shield,
  Key,
  MessageSquare,
  Linkedin,
  Volume2,
  VolumeX,
  BadgeCheck,
  ArrowUpRight,
  Copy,
  Check,
} from 'lucide-react';
import { ProfileData } from '../types';
import { SUN3SS_PROFILE } from '../data/profiles';

interface Sun3ssCardProps {
  profile?: ProfileData;
  onTriggerAssistantSpeak?: (customText?: string) => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Github,
  Globe,
  Terminal,
  Mail,
  Code2,
  Shield,
  Key,
  MessageSquare,
  Linkedin,
};

export const Sun3ssCard: React.FC<Sun3ssCardProps> = ({
  profile = SUN3SS_PROFILE,
  onTriggerAssistantSpeak,
  soundEnabled = true,
  onToggleSound,
}) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(`ID: ${profile.id.toUpperCase()}-2026-TACTICAL`);
    setCopied(true);
    if (onTriggerAssistantSpeak) {
      onTriggerAssistantSpeak(`Copied ${profile.name}'s Tactical ID!`);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full h-full rounded-[24px] overflow-hidden flex flex-col justify-between text-slate-200 select-none transition-all duration-500 border border-zinc-800 bg-[#050505] shadow-[0_0_50px_rgba(255,255,255,0.08)]">
      {/* Background Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[180px] bg-zinc-100/5 blur-[90px] pointer-events-none rounded-full" />
      <div
        className="absolute inset-0 pointer-events-none opacity-15 rounded-[24px]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-3 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
          </div>
          <span className="ml-2 font-mono-code text-[10px] tracking-wider uppercase text-zinc-500">
            SUN3SS_STEALTH // KERNEL
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono-code border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full animate-ping bg-emerald-400" />
            ONLINE
          </span>
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
              className="p-1.5 rounded-md border transition-all duration-200 bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700"
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>
          )}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-5 flex flex-col items-center flex-1 min-h-0 relative z-10 overflow-y-auto custom-scrollbar pointer-events-auto">
        {/* Avatar Area */}
        <div className="relative mb-3 group shrink-0">
          <div className="relative rounded-full p-1.5 transition-all duration-500 border border-zinc-700 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:border-zinc-500">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center overflow-hidden border bg-black border-zinc-800">
              {!imgError ? (
                <img
                  src={profile.avatarUrl || '/sun3ss-avatar.png'}
                  alt={`${profile.name} Avatar`}
                  onError={() => setImgError(true)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="text-2xl">👤</div>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 right-0 p-1 rounded-full border-2 bg-black border-zinc-700 text-zinc-200">
            <Shield size={11} />
          </div>
        </div>

        {/* Title, Role & Verified Badge */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center justify-center gap-1.5">
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {profile.name}
            </h1>
            <BadgeCheck size={18} className="text-zinc-300" />
          </div>
          <p className="font-mono-code text-xs mt-0.5 font-medium text-zinc-400">
            {profile.title}
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono-code border bg-zinc-900/80 border-zinc-800 text-zinc-300">
            <Terminal size={11} className="text-zinc-100" />
            <span>{profile.statusText}</span>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full flex-grow mt-2">
          <div className="w-full space-y-2">
            {profile.links.map((link) => {
              const IconComp = ICON_MAP[link.icon] || Globe;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative block w-full py-2.5 px-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between text-xs bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-gradient-to-r hover:from-zinc-900 hover:to-zinc-950 shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg border transition-colors bg-zinc-900 border-zinc-800 text-zinc-300 group-hover/link:border-zinc-700">
                      <IconComp size={15} />
                    </div>
                    <div>
                      <span className="font-mono-code font-semibold block text-zinc-100 group-hover/link:text-white">
                        {link.title}
                      </span>
                      <p className="font-space text-[10px] text-slate-400 mt-0.5">
                        {link.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="text-slate-500 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-zinc-200"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer bar with Copy ID */}
      <div className="px-5 py-3 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between relative z-10 shrink-0">
        <button
          onClick={handleCopyId}
          className="flex items-center space-x-2 px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 text-[11px] font-mono-code transition-all text-zinc-300 hover:text-zinc-100 active:scale-95"
        >
          {copied ? (
            <Check size={13} className="text-emerald-400" />
          ) : (
            <Copy size={13} className="text-zinc-400" />
          )}
          <span>{copied ? 'COPIED TO CLIPBOARD' : `NEURAL_ID: ${profile.id.toUpperCase()}-2026-TACTICAL`}</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400">
            0x00
          </span>
          <span className="text-[10px] font-mono-code text-zinc-500">v2.4</span>
        </div>
      </div>
    </div>
  );
};
