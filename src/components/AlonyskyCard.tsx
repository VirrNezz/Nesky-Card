import React, { useState } from 'react';
import {
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
  Youtube,
  MessageCircle,
} from 'lucide-react';
import { ProfileData } from '../types';
import { ALONYSKY_PROFILE } from '../data/profiles';

interface AlonyskyCardProps {
  profile?: ProfileData;
  onTriggerAssistantSpeak?: (customText?: string) => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
}

// Custom SVG Icons untuk TikTok & Instagram
const TikTokIcon = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const InstagramIcon = ({ size = 15, className = "" }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ICON_MAP: Record<string, React.ElementType> = {
  TikTok: TikTokIcon,
  Instagram: InstagramIcon,
  Youtube: Youtube,
  Discord: MessageCircle,
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

  // Daftar tautan sosmed khusus Alonysky (TikTok, Instagram, YouTube, Discord)
  const customAlonyskyLinks = [
    {
      id: 'tiktok',
      title: 'TikTok',
      subtitle: '@alonysky_tactical',
      url: 'https://tiktok.com',
      icon: 'TikTok',
      accentColor: 'purple',
    },
    {
      id: 'instagram',
      title: 'Instagram',
      subtitle: '@alonysky.official',
      url: 'https://instagram.com',
      icon: 'Instagram',
      accentColor: 'cyan',
    },
    {
      id: 'youtube',
      title: 'YouTube',
      subtitle: 'Alonysky Channel',
      url: 'https://youtube.com',
      icon: 'Youtube',
      accentColor: 'blue',
    },
    {
      id: 'discord',
      title: 'Discord',
      subtitle: 'Alonysky#0001',
      url: 'https://discord.com',
      icon: 'Discord',
      accentColor: 'purple',
    },
  ];

  // Gunakan custom links jika profile.links bawaan ingin dioverride
  const displayLinks = customAlonyskyLinks.length > 0 ? customAlonyskyLinks : profile.links;

  const handleCopyId = () => {
    navigator.clipboard.writeText(`ID: ${profile.id.toUpperCase()}-2026-TACTICAL`);
    setCopied(true);
    if (onTriggerAssistantSpeak) {
      onTriggerAssistantSpeak(`Copied Alonysky profile ID!`);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative w-full h-full rounded-[24px] overflow-hidden flex flex-col justify-between text-slate-200 select-none transition-all duration-500 border border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.25)]"
      style={{
        backgroundImage: profile.bgStyle && profile.bgStyle.startsWith('url') ? profile.bgStyle : undefined,
        backgroundColor: !profile.bgStyle || !profile.bgStyle.startsWith('url') ? (profile.bgStyle || '#090412') : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Overlay supaya teks tetap terbaca jelas */}
      <div className="absolute inset-0 bg-[#090412]/85 backdrop-blur-[2px] pointer-events-none rounded-[24px]" />

      {/* Background Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[380px] h-[200px] bg-purple-600/20 blur-[100px] pointer-events-none rounded-full z-10" />
      <div className="absolute bottom-0 right-0 w-[280px] h-[280px] bg-cyan-500/15 blur-[100px] pointer-events-none rounded-full z-10" />

      {/* Halftone Dot Patterns */}
      <div
        className="absolute top-0 left-0 w-36 h-36 opacity-30 pointer-events-none z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(168, 85, 247, 0.6) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-36 h-36 opacity-30 pointer-events-none z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.6) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }}
      />

      {/* Neon Diagonal Laser Line Divider */}
      <div className="absolute -top-12 right-14 w-[2px] h-[170%] bg-gradient-to-b from-cyan-400 via-purple-500 to-fuchsia-600 rotate-[22deg] opacity-40 pointer-events-none shadow-[0_0_12px_#06b6d4] z-10" />

      {/* Header Bar */}
      <div className="relative z-20 flex items-center justify-between px-5 py-3 border-b border-purple-500/30 bg-purple-950/40 backdrop-blur-md">
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

      {/* Main Content Body */}
      <div className="p-5 flex flex-col items-center flex-1 min-h-0 relative z-20 overflow-y-auto custom-scrollbar pointer-events-auto">
        {/* Avatar Area with Cyber Sniper Reticle */}
        <div className="relative mb-3 group shrink-0">
          <div className="relative rounded-full p-1.5 transition-all duration-500 border-2 border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:border-cyan-400 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-purple-400 shadow-[0_0_6px_#a855f7]" />
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-purple-400 shadow-[0_0_6px_#a855f7]" />
            <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-cyan-400 shadow-[0_0_6px_#06b6d4]" />
            <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 h-0.5 w-3 bg-cyan-400 shadow-[0_0_6px_#06b6d4]" />

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

          <div className="absolute bottom-0 right-0 p-1 rounded-full border-2 bg-purple-950 border-purple-400 text-cyan-300 shadow-[0_0_10px_#a855f7]">
            <Crosshair size={12} className="animate-pulse" />
          </div>
        </div>

        {/* Title, Role & Verified Badge */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center justify-center gap-1.5">
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-200 via-fuchsia-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Alonysky
            </h1>
            <BadgeCheck size={18} className="text-purple-400" />
          </div>
          <p className="font-mono-code text-xs mt-0.5 font-medium text-cyan-300/90">
            {profile.title}
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono-code border bg-purple-950/80 border-purple-500/40 text-purple-200">
            <Target size={11} className="text-cyan-400 animate-pulse" />
            <span>{profile.statusText}</span>
          </div>
        </div>

        {/* Links Section (TikTok, Instagram, YouTube, Discord) */}
        <div className="w-full flex-grow mt-2">
          <div className="w-full space-y-2">
            {displayLinks.map((link) => {
              const IconComp = ICON_MAP[link.icon] || Globe;
              const linkStyles = getLinkColorStyles(link.accentColor);

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/link relative block w-full py-2.5 px-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between text-xs ${linkStyles.cardBg}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg border transition-colors ${linkStyles.iconBg}`}>
                      <IconComp size={15} />
                    </div>
                    <div>
                      <span className={`font-mono-code font-semibold block ${linkStyles.textColor}`}>
                        {link.title}
                      </span>
                      <p className="font-space text-[10px] text-slate-400 mt-0.5">
                        {link.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className={`text-slate-500 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 ${linkStyles.arrowColor}`}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer bar with Copy ID */}
      <div className="px-5 py-3 border-t border-purple-500/30 bg-purple-950/50 backdrop-blur-md flex items-center justify-between relative z-20 shrink-0">
        <button
          onClick={handleCopyId}
          className="flex items-center space-x-2 px-2.5 py-1 rounded-lg border border-purple-500/30 bg-purple-900/30 hover:bg-purple-900/60 hover:border-purple-400/50 text-[11px] font-mono-code transition-all text-purple-200 hover:text-cyan-300 active:scale-95"
        >
          {copied ? (
            <Check size={13} className="text-emerald-400" />
          ) : (
            <Copy size={13} className="text-purple-400" />
          )}
          <span>{copied ? 'COPIED TO CLIPBOARD' : `NEURAL_ID: ${profile.id.toUpperCase()}-2026-TACTICAL`}</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded border border-purple-500/30 bg-purple-950/60 text-cyan-400">
            SEC_07
          </span>
          <span className="text-[10px] font-mono-code text-slate-500">v2.4</span>
        </div>
      </div>
    </div>
  );
};
