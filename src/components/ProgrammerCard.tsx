import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ProfileData, ProfileId } from '../types';
import { AlonyskyCard } from './AlonyskyCard';
import { Sun3ssCard } from './Sun3ssCard';

interface ProgrammerCardProps {
  currentProfile: ProfileData;
  activeProfileId: ProfileId;
  onSwapProfile: () => void;
  onTriggerAssistantSpeak?: (customText?: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const ProgrammerCard: React.FC<ProgrammerCardProps> = ({
  activeProfileId,
  onSwapProfile,
  onTriggerAssistantSpeak,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      {/* 3D CARD WRAPPER */}
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-md md:max-w-lg h-[80vh] min-h-[520px] max-h-[720px] perspective-1000 mb-6">
        <div
          className={`absolute inset-0 w-full h-full text-left transition-transform duration-700 transform-style-preserve-3d ${
            activeProfileId === 'alonysky' ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT CARD - SUN3SS */}
          <div className="absolute inset-0 w-full h-full backface-hidden pointer-events-auto">
            <Sun3ssCard
              onTriggerAssistantSpeak={onTriggerAssistantSpeak}
              soundEnabled={soundEnabled}
              onToggleSound={onToggleSound}
            />
          </div>

          {/* BACK CARD - ALONYSKY */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 pointer-events-auto">
            <AlonyskyCard
              onTriggerAssistantSpeak={onTriggerAssistantSpeak}
              soundEnabled={soundEnabled}
              onToggleSound={onToggleSound}
            />
          </div>
        </div>
      </div>

      {/* ELITE COMMAND PALETTE STYLE GLOBAL SWAP BUTTON */}
      <div className="relative z-10">
        <button
          onClick={onSwapProfile}
          className={`group flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            activeProfileId === 'sun3ss'
              ? 'bg-zinc-900/90 text-zinc-100 border-zinc-700 hover:border-zinc-500 shadow-[0_0_25px_rgba(255,255,255,0.12)]'
              : 'bg-slate-900/90 text-cyan-100 border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
          }`}
        >
          <div
            className={`p-1.5 rounded-full border transition-transform duration-700 group-hover:rotate-180 ${
              activeProfileId === 'sun3ss'
                ? 'bg-zinc-800 border-zinc-700 text-zinc-100'
                : 'bg-cyan-950 border-cyan-500/50 text-cyan-300'
            }`}
          >
            <RefreshCw size={16} />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-[9px] font-mono-code uppercase tracking-widest text-slate-400">
              SWITCH PERSONA
            </span>
            <span className="font-mono-code font-bold text-xs tracking-wider">
              SWAP TO {activeProfileId === 'alonysky' ? 'SUN3SS' : 'ALONYSKY'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
