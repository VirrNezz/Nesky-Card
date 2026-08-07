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
  Target,
  Crosshair,
  Copy,
  Check,
} from 'lucide-react';
import { ProfileData } from '../types';
import { ALONYSKY_PROFILE } from '../data/profiles'; // Pastikan di file profiles.ts juga sudah diubah namanya

interface AlonyskyCardProps {
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

const getLinkColorStyles = (accentColor?: string) => {
  switch (accentColor) {
    case 'emerald':
      return {
        cardBg: 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
        iconBg: 'bg-emerald-950 border-emerald-500/50 text-emerald-400 group-hover/link:border-emerald-400',
        textColor: 'text-emerald-100 group-hover/link:text-emerald-300',
        arrowColor: 'group-hover/link:text-emerald-400',
      };
    case 'blue':
      return {
        cardBg: 'bg-blue-950/20 border-blue-500/30 hover:border-blue-400 hover:bg-blue-950/40 shadow-[0_0_15px_rgba(59,130,246,0.15)]',
        iconBg: 'bg-blue-950 border-blue-500/50 text-blue-400 group-hover/link:border-blue-400',
        textColor: 'text-blue-100 group-hover/link:text-blue-300',
        arrowColor: 'group-hover/link:text-blue-400',
      };
    case 'cyan':
      return {
        cardBg: 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
        iconBg: 'bg-cyan-950 border-cyan-500/50 text-cyan-400 group-hover/link:border-cyan-400',
        textColor: 'text-cyan-100 group-hover/link:text-cyan-300',
        arrowColor: 'group-hover/link:text-cyan-400',
      };
    case 'purple':
    default:
      return {
        cardBg: 'bg-purple-950/20 border-purple-500/30 hover:border-purple-400 hover:bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]',
        iconBg: 'bg-purple-950 border-purple-500/50 text-purple-400 group-hover/link:border-purple-400',
        textColor: 'text-purple-100 group-hover/link:text-purple-300',
        arrowColor: 'group-hover/link:text-purple-400',
      };
  }
};

export const AlonyskyCard: React.FC<AlonyskyCardProps> = ({
  profile = ALONYSKY_PROFILE,
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
      onTriggerAssistantSpeak(`Copied Alonysky ID!`);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full h-full rounded-[24px] overflow-hidden flex flex-col justify-between text-slate-200 select-none transition-all duration-500 border border-purple-500/40 bg-[#090412] shadow-[0_0_60px_rgba(168,85,247,0.25)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[380px] h-[200px] bg-purple-600/20 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[280px] h-[280px] bg-cyan-500/15 blur-[100px] pointer-events-none rounded-full" />

      <div
        className="absolute top-0 left-0 w-36 h-36 opacity-30 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(168, 85, 247, 0.6) 1px, transparent 1px)', backgroundSize: '8px 8px' }}
      />
      <div
        className="absolute bottom-0 right-0 w-36 h-36 opacity-30 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.6) 1px, transparent 1px)', backgroundSize: '8px 8px' }}
      />

      <div className="absolute -top-12 right-14 w-[2px] h-[170%] bg-gradient-to-b from-cyan-400 via-purple-500 to-fuchsia-600 rotate-[22deg] opacity-40 pointer-events-none shadow-[0_0_12px_#06b6d4]" />

      <div className="relative z-10 flex items-center justify-between px-5 py-3 border-b border-purple-500/30 bg-purple-950/40 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <span className="ml-2 font-mono-code text-[10px] tracking-wider uppercase text-purple-300 font-bold">
            ALONYSKY // PROFILE_HUD
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono-code border bg-purple-500/10 text-purple-300 border-purple-500/30">
            <span className="w-1.5 h-1.5 rounded-full animate-ping bg-purple-400" />
            HUD LOCK
          </span>
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
              className="p-1.5 rounded-md border transition-all duration-200 bg-purple-950/80 border-purple-500/40 text-purple-300 hover:bg-purple-900/60 hover:border-purple-400"
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col items-center flex-1 min-h-0 relative z-10 overflow-y-auto custom-scrollbar pointer-events-auto">
        <div className="relative mb-3 group shrink-0">
          <div className="relative rounded-full p-1.5 transition-all duration-500 border-2 border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:border-cyan-400 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center overflow-hidden border bg-purple-950/80 border-purple-500/40">
              {!imgError ? (
                <img
                  src={profile.avatarUrl || '/alonysky-avatar.png'}
                  alt="Alonysky Avatar"
                  onError={() => setImgError(true)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="text-2xl">👤</div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mb-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-200 via-fuchsia-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            Alonysky
          </h1>
          <p className="font-mono-code text-xs mt-0.5 font-medium text-cyan-300/90">{profile.title}</p>
        </div>

        {/* ... (bagian link tetap sama, pastikan data di profiles.ts sudah disesuaikan) */}
      </div>
    </div>
  );
};
