import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
  ArrowLeft,
} from 'lucide-react';
import { PROFILES } from './data/profiles';
import { ProfileId, TransitionEffect } from './types';
import { ProgrammerCard } from './components/ProgrammerCard';
import { PNGTuberWidget } from './components/PNGTuberWidget';

// ==========================================
// HALAMAN DIREKTORI KHUSUS: /order-web
// ==========================================
function OrderWebPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#090d14] text-slate-100 p-6 flex flex-col items-center justify-center font-space">
      <div className="max-w-md w-full bg-[#0d1117] border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        
        {/* Tombol Kembali ke Beranda */}
        <button 
          onClick={() => navigate('/')} 
          className="inline-flex items-center gap-1.5 text-xs font-mono-code text-cyan-400 hover:text-cyan-300 mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>BACK_TO_MAIN_HUD</span>
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Terminal size={20} className="text-cyan-400" />
          <h1 className="text-xl font-bold tracking-tight text-cyan-200">
            ORDER_WEB_PORTAL
          </h1>
        </div>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Halaman direktori khusus untuk pemesanan website atau komisi digital dari card Sun3ss / Alonysky!
        </p>

        {/* Contoh info & aksi */}
        <div className="space-y-3 font-mono-code text-xs">
          <div className="p-3 rounded-xl bg-black/50 border border-white/10 flex justify-between items-center">
            <span>Status Komisi:</span>
            <span className="text-emerald-400 font-bold">OPEN / AVAILABLE</span>
          </div>
          <a
            href="https://discord.gg/RVZSxzjs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
          >
            <Sparkles size={14} />
            <span>CONTACT VIA DISCORD</span>
          </a>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// HALAMAN UTAMA (DOUBLE CARD HUD)
// ==========================================
function MainHomePage() {
  const [activeProfileId, setActiveProfileId] = useState<ProfileId>('sun3ss');
  const [transitionEffect, setTransitionEffect] = useState<TransitionEffect>('none');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechText, setSpeechText] = useState<string>(
    "Wahh pendatang baru? mau nyoba yg mana dulu nih? (hati-hati ada link jebakan)"
  );
  const [showHelpModal, setShowHelpModal] = useState(false);

  const currentProfile = PROFILES[activeProfileId];
  const isAlonysky = activeProfileId === 'alonysky';

  // Fitur Yapping Otomatis Berkala
  useEffect(() => {
    const alonyskyYappingList = [
      "Harga Dolar US hari ini berapa yah? :/",
      "Maaf kalau saya jarang online di misi ini... lagi komis atau sekroll hehe :v",
      "When yah bisa traveling ke luar negri...",
      "Target terdeteksi di arah timur, Target sedang rebahan 24/7??",
      "Memanggil markas utama... Halo?",
      "Hari ini mending masak atau jajan di luar yah?",
      "Haloo kamu kelamaan diem disini, ada butuh apa? :3",
      "Kalian lihat target kita gak?",
    ];

    const sun3ssYappingList = [
      "Uyy, iya kamu, tau cara ngehack akun ngep ngep ngga? wkwk",
      "Jangan ketrigger sama logo komen di bot, orang API nya ngga nyala awokawokawokawok",
      "Bau aku nyengat? ngga ah yg lain biasa aja (biasa nya pingsan maksud nya)",
      "Kopi mana kopi? Coding tanpa kopi itu bagaikan skunk tanpa bau khasnya :v",
    ];

    const yappingInterval = setInterval(() => {
      const activeList = isAlonysky ? alonyskyYappingList : sun3ssYappingList;
      const randomYap = activeList[Math.floor(Math.random() * activeList.length)];
      setSpeechText(randomYap);
    }, 25000);

    return () => clearInterval(yappingInterval);
  }, [isAlonysky]);

  // Handle Card Swap
  const handleSwapProfile = () => {
    const nextProfileId: ProfileId = activeProfileId === 'alonysky' ? 'sun3ss' : 'alonysky';

    if (nextProfileId === 'sun3ss') {
      setTransitionEffect('glitch');
      setActiveProfileId('sun3ss');
      setSpeechText("Hallo aku sun3ss, kasih aku makan = kamu aman dari spray ku whehehe");
      setTimeout(() => setTransitionEffect('none'), 800);
    } else {
      setTransitionEffect('sniper');
      setActiveProfileId('alonysky');
      setSpeechText("MISSION COMPLETED!! Welcome back AlonySky... We have been waiting for you");
      setTimeout(() => setTransitionEffect('none'), 1000);
    }
  };

  // Assistant prompt/response handler
  const handleSendMessage = (msg: string) => {
    const lower = msg.toLowerCase();

    if (lower.includes('quote') || lower.includes('motivasi') || lower.includes('inspirasi')) {
      const alonyskyDedicatedQuotes = [
        "Hidup itu terkadang naik dan turun, tetapi berusahalah untuk menaikkan tujuan hidupmu",
        "Jangan lengah saat engkau di halangi, ubah halangan itu menjadi tantangan dalam meraih impian mu",
        "Berusahalah untuk memberi daripada meminta",
        "Lebih baik pertarungan juara daripada pertarungan jiwa",
        "Jadilah diri sendiri dan jangan mencoba menghalagi ataupun meniru orang lain",
        "Kamu itu hebat, semangat yah :3",
      ];

      const sun3ssDedicatedQuotes = [
        "jadilah seperti spray skunk, bukan karna bau nya tapi karna kesetiaan nya yg nempel 1 minggu (apa sih bejir garing)",
        "syukuri apa ada nya jangan ngeluh dengan yang kamu punya",
        "coba lah untuk berdiri sendiri jangan kayak git push harus di push dulu (emang sistem nya gabut aja ngga ada qoutes yg bagus hehe)",
        "jangan lah menyerah karna kalo kamu menyerah kalah sama semut dia aja kecil tapi pantang menyerah",
      ];

      const activeQuotes = isAlonysky ? alonyskyDedicatedQuotes : sun3ssDedicatedQuotes;
      const randomQuote = activeQuotes[Math.floor(Math.random() * activeQuotes.length)];
      setSpeechText(randomQuote);
    } else if (lower.includes('alonysky')) {
      setSpeechText("Alonysky is the Cyber Tech Operative. Focused on React 19, UI design, and futuristic telemetry!");
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
      const alonyskyDedicatedQuotes = [
        "Ngapain pencet tombol nya? ada sesuatu yg di butuhin?",
        "Better gear = Better aim",
        "Sunyi, Tenang, tiba-tiba DUARRR!!!!",
      ];
      const sun3ssDedicatedQuotes = [
        "Jadi makan ubi cilembu kayak nya enak deh ;p",
        "Bau aroma spray aku tergantung aku makan apa sebelum nya hehe",
        "*nesi : Jangan kasih di makan ubi cilembu woiii",
      ];
      const activeQuotes = isAlonysky ? alonyskyDedicatedQuotes : sun3ssDedicatedQuotes;
      setSpeechText(activeQuotes[Math.floor(Math.random() * activeQuotes.length)]);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between transition-all duration-1000 font-space relative overflow-y-auto select-none animate-fade-in ${
        isAlonysky ? 'text-slate-300' : 'text-zinc-300'
      }`}
      style={{
        backgroundImage: currentProfile.bgStyle && currentProfile.bgStyle.startsWith('url') ? currentProfile.bgStyle : undefined,
        backgroundColor: !currentProfile.bgStyle || !currentProfile.bgStyle.startsWith('url') ? (currentProfile.bgStyle || '#020408') : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background Grids & Ambient Glows */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-all duration-700 ${
          isAlonysky
            ? 'bg-gradient-to-br from-cyan-900/10 via-transparent to-emerald-900/10'
            : 'bg-gradient-to-br from-zinc-800/10 via-transparent to-zinc-950/20'
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none transition-colors duration-700 ${
          isAlonysky ? 'bg-cyan-500/5' : 'bg-zinc-400/5'
        }`}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-slate-800/40 rounded-full flex items-center justify-center pointer-events-none">
        <div className="w-[1px] h-full bg-slate-800/20 absolute" />
        <div className="w-full h-[1px] bg-slate-800/20 absolute" />
        <div className="w-12 h-12 border border-slate-700/30 rounded-full" />
      </div>

      <div className="absolute inset-2 sm:inset-4 pointer-events-none border border-cyan-500/10 rounded-3xl z-0" />

      {/* Top HUD Navbar */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between border-b border-slate-800/80 backdrop-blur-md bg-slate-900/40 mt-2 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono-code font-bold text-sm shadow-md transition-all ${
              isAlonysky
                ? 'bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-zinc-900 border border-zinc-600 text-zinc-100'
            }`}
          >
            {isAlonysky ? <Zap size={16} /> : <Code2 size={16} />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                PROGRAMMER_ID_CARD
              </span>
              <span
                className={`text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
                  isAlonysky
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                    : 'bg-zinc-800 border-zinc-600 text-zinc-200'
                }`}
              >
                SYSTEM_ID: {activeProfileId.toUpperCase()}_v2.0
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono-code text-slate-400 mt-0.5">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM ONLINE
              </span>
              <span className="opacity-30">|</span>
              <span>LATENCY: 12ms</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-slate-500" />}
          </button>

          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Help & Info"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-3 sm:p-6 w-full max-w-5xl mx-auto my-auto">
        <ProgrammerCard
          currentProfile={currentProfile}
          activeProfileId={activeProfileId}
          onSwapProfile={handleSwapProfile}
          onTriggerAssistantSpeak={handleTriggerSpeak}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
        />
      </main>

      {/* PNGTuber Widget */}
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

      {/* Footer */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-4 py-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-slate-400 gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>STATUS: ALL_SYSTEMS_OPERATIONAL</span>
        </div>
        <span>PNGTUBER: DRAGGABLE (TOUCH & MOUSE)</span>
      </footer>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl relative ${
              isAlonysky
                ? 'bg-[#0d1117] border-cyan-500/50 text-cyan-100'
                : 'bg-zinc-950 border-zinc-700 text-zinc-100'
            }`}
          >
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
            <h3 className="font-space text-lg font-bold mb-3">System Guide</h3>
            <p className="text-xs text-slate-300 mb-4">
              Gunakan tombol di card untuk berinteraksi, dan akses direktori order web melalui tombol tautan yang disediakan di card Sun3ss!
            </p>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 rounded-xl font-space font-bold text-xs bg-cyan-600 text-white cursor-pointer"
            >
              TUTUP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// ROOT APP DENGAN REACT ROUTER DOM
// ==========================================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Halaman Utama */}
        <Route path="/" element={<MainHomePage />} />
        
        {/* Rute Halaman Direktori Order Web */}
        <Route path="/order-web" element={<OrderWebPage />} />
      </Routes>
    </BrowserRouter>
  );
}
