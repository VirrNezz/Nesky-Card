import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Volume2,
  VolumeX,
  Code2,
  Shield,
  HelpCircle,
  X,
  Terminal,
  Zap,
} from 'lucide-react';
import { PROFILES } from './data/profiles';
import { ProfileId, TransitionEffect } from './types';
import { ProgrammerCard } from './components/ProgrammerCard';
import { PNGTuberWidget } from './components/PNGTuberWidget';

export default function App() {
  const [activeProfileId, setActiveProfileId] = useState<ProfileId>('sun3ss');
  const [transitionEffect, setTransitionEffect] = useState<TransitionEffect>('none');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechText, setSpeechText] = useState<string>(
    "Hello! I am your AI Assistant. Drag me around or click SWAP to flip 3D personas!"
  );
  const [showHelpModal, setShowHelpModal] = useState(false);

  const currentProfile = PROFILES[activeProfileId];
  const isNezz = activeProfileId === 'nezz';

  // ==========================================
  // FITUR YAPPING OTOMATIS (BANYAK OMONG BERKALA)
  // ==========================================
  useEffect(() => {
    // Daftar bahan yapping/celetukan acak berdasarkan persona aktif
    const nezzYappingList = [
      "Lagi ngecek struktur React 19 sama Tailwind nih... Biar makin smooth!",
      "Eh, jangan lupa commit kodenya ya, nanti keburu hilang lho :v",
      "Sistem aman, enkripsi lancar. Ada yang bisa dibantu, bos?",
      "Lagi mikirin arsitektur UI futuristic buat project selanjutnya...",
    ];

    const sun3ssYappingList = [
      "Ngoprek low-level emang paling seru, sunyi tapi mematikan...",
      "Assembly & C kernel hooks jalan terus tanpa halangan.",
      "Mode stealth aktif. Jangan berisik, lagi analisis jaringan.",
      "Kopi mana kopi? Coding tanpa kopi itu bagaikan skunk tanpa bau khasnya :v",
    ];

    // Set interval yapping otomatis setiap 25 detik sekali jika user sedang diam
    const yappingInterval = setInterval(() => {
      const activeList = isNezz ? nezzYappingList : sun3ssYappingList;
      const randomYap = activeList[Math.floor(Math.random() * activeList.length)];
      setSpeechText(randomYap);
    }, 25000);

    return () => clearInterval(yappingInterval);
  }, [isNezz]);

  // Handle Card Flip and Simultaneous Transition Effects
  const handleSwapProfile = () => {
    const nextProfileId: ProfileId = activeProfileId === 'nezz' ? 'sun3ss' : 'nezz';

    if (nextProfileId === 'sun3ss') {
      setTransitionEffect('glitch');
      setActiveProfileId('sun3ss');
      setSpeechText("SYSTEM OVERRIDE! Sun3ss stealth skunk monochrome persona active.");
      setTimeout(() => setTransitionEffect('none'), 800);
    } else {
      setTransitionEffect('sniper');
      setActiveProfileId('nezz');
      setSpeechText("NEURAL RE-ALIGNMENT! Nezz AI Cyber Navy protocol online.");
      setTimeout(() => setTransitionEffect('none'), 1000);
    }
  };

  // Assistant prompt/response handler
  const handleSendMessage = (msg: string) => {
    const lower = msg.toLowerCase();

    if (lower.includes('joke')) {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "There are 10 types of people in the world: those who understand binary, and those who don't.",
        "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
        "How many programmers does it take to change a lightbulb? None, that's a hardware problem!",
      ];
      setSpeechText(jokes[Math.floor(Math.random() * jokes.length)]);
    } else if (lower.includes('nezz')) {
      setSpeechText("Nezz AI is the Cyber Navy AI Architect. Focused on React 19, Gemini agents, and futuristic UI!");
    } else if (lower.includes('sun3ss') || lower.includes('skunk')) {
      setSpeechText("Sun3ss operates in raw monochrome. Low-level assembly, C, kernel hooks, and stealth hacking!");
    } else if (lower.includes('flip') || lower.includes('3d') || lower.includes('perspective')) {
      setSpeechText("The 3D card uses CSS perspective-1000 and rotateY(180deg) for instant smooth flipping!");
    } else {
      const genericResponses = [
        `Processing neural query: "${msg}". Everything compiles cleanly!`,
        `Analyzing signal... Current persona: ${currentProfile.name}. All systems optimal.`,
        `Fascinating prompt! Try swapping personas to test the Glitch and Sniper shot visual effects!`,
      ];
      setSpeechText(genericResponses[Math.floor(Math.random() * genericResponses.length)]);
    }
  };

  const handleTriggerSpeak = (customText?: string) => {
    if (customText) {
      setSpeechText(customText);
    } else {
      const quotes = currentProfile.quotes;
      setSpeechText(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between transition-colors duration-700 font-space relative overflow-hidden select-none ${
        isNezz ? 'bg-[#03060b] text-slate-300' : 'bg-[#020408] text-zinc-300'
      }`}
    >
      {/* Immersive Background Grids & Ambient Glows */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-all duration-700 ${
          isNezz
            ? 'bg-gradient-to-br from-cyan-900/10 via-transparent to-emerald-900/10'
            : 'bg-gradient-to-br from-zinc-800/10 via-transparent to-zinc-950/20'
        }`}
      />
      {/* Central Ambient Glow Orb */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none transition-colors duration-700 ${
          isNezz ? 'bg-cyan-500/5' : 'bg-zinc-400/5'
        }`}
      />

      {/* Subtle Background Target Ring Simulation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-slate-800/40 rounded-full flex items-center justify-center pointer-events-none">
        <div className="w-[1px] h-full bg-slate-800/20 absolute" />
        <div className="w-full h-[1px] bg-slate-800/20 absolute" />
        <div className="w-12 h-12 border border-slate-700/30 rounded-full" />
      </div>

      {/* Outer Subtle Frame Border */}
      <div className="absolute inset-2 sm:inset-4 pointer-events-none border border-cyan-500/10 rounded-3xl z-0" />

      {/* Top Telemetry HUD Navbar Header */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between border-b border-slate-800/80 backdrop-blur-md bg-slate-900/40 mt-2 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono-code font-bold text-sm shadow-md transition-all ${
              isNezz
                ? 'bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-zinc-900 border border-zinc-600 text-zinc-100'
            }`}
          >
            {isNezz ? <Zap size={16} /> : <Code2 size={16} />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                PROGRAMMER_ID_CARD
              </span>
              <span
                className={`text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
                  isNezz
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                    : 'bg-zinc-800 border-zinc-600 text-zinc-200'
                }`}
              >
                SYSTEM_ID: {activeProfileId.toUpperCase()}_v2.0
              </span>
            </div>
            {/* System Status Telemetry */}
            <div className="flex items-center gap-3 text-[10px] font-mono-code text-slate-400 mt-0.5">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM ONLINE
              </span>
              <span className="opacity-30">|</span>
              <span>LATENCY: 12ms</span>
              <span className="opacity-30 hidden sm:inline">|</span>
              <span className="hidden sm:inline">ENCRYPTION: AES-256</span>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-slate-500" />}
          </button>

          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Help & Info"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </header>

      {/* Main Content Stage: Centered Digital ID Card */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-3 sm:p-6 w-full max-w-5xl mx-auto">
        <ProgrammerCard
          currentProfile={currentProfile}
          activeProfileId={activeProfileId}
          onSwapProfile={handleSwapProfile}
          onTriggerAssistantSpeak={handleTriggerSpeak}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
        />
      </main>

      {/* Draggable Floating PNGTuber Assistant Widget (Yapping Active) */}
      <PNGTuberWidget
        speechText={speechText}
        activeProfileId={activeProfileId}
        transitionEffect={transitionEffect}
        soundEnabled={soundEnabled}
        onSendMessage={handleSendMessage}
        onResetPosition={() => {
          setSpeechText("Position re-centered!");
        }}
      />

      {/* Footer info bar */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-4 py-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-slate-400 gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>STATUS: ALL_SYSTEMS_OPERATIONAL (YAPPING_ENABLED)</span>
        </div>

        <div className="flex items-center space-x-4">
          <span>PNGTUBER: DRAGGABLE (TOUCH & MOUSE)</span>
          <span>•</span>
          <span>3D FLIP: PERSPECTIVE-1000</span>
        </div>
      </footer>

      {/* Help / Guide Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl relative ${
              isNezz
                ? 'bg-[#0d1117] border-cyan-500/50 text-cyan-100'
                : 'bg-zinc-950 border-zinc-700 text-zinc-100'
            }`}
          >
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="flex items-center space-x-2 mb-4">
              <Terminal size={20} className={isNezz ? 'text-cyan-400' : 'text-zinc-200'} />
              <h3 className="font-space text-lg font-bold">Programmer ID Card Guide</h3>
            </div>

            <div className="space-y-3 font-space text-xs leading-relaxed text-slate-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-white mb-1">1. 3D Dual Persona Flip</p>
                <p>
                  Click <strong>SWAP PERSONA</strong> to flip between <strong>Nezz AI</strong> and <strong>Sun3ss</strong>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-white mb-1">2. Draggable Yapping PNGTuber</p>
                <p>
                  Avatar akan otomatis "yapping" (banyak omong sendiri) secara berkala atau merespons ketika kamu mengetik prompt/mengklik tombol interaktif di kartu!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className={`mt-5 w-full py-2.5 rounded-xl font-space font-bold text-xs transition-all ${
                isNezz
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-black'
                  : 'bg-zinc-100 hover:bg-white text-black'
              }`}
            >
              GOT IT, CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
