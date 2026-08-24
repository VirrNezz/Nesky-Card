import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Terminal } from 'lucide-react';

export const OrderWeb: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [lang, setLang] = useState<'id' | 'en'>('id');

  // Data card melayang yang bisa digeser
  const showcaseCards = [
    {
      title: lang === 'id' ? 'Cyberpunk Tactical ID Card' : 'Cyberpunk Tactical ID Card',
      desc: lang === 'id' 
        ? 'Card interaktif dengan efek 3D, widget PNGTuber, dan suara sapaan otomatis.' 
        : 'Interactive card with 3D effects, PNGTuber widget, and automatic greeting sounds.',
      tag: lang === 'id' ? 'Paling Populer 🔥' : 'Most Popular 🔥',
      image: '/web-pic.jpg',
      link: 'https://github.com/'
    },
    {
      title: lang === 'id' ? 'Stealth Skunk Portfolio' : 'Stealth Skunk Portfolio',
      desc: lang === 'id' 
        ? 'Desain gelap bertema hacker/skunk dengan performa super ngebut dan estetik.' 
        : 'Dark hacker/skunk-themed design with lightning-fast performance and aesthetics.',
      tag: lang === 'id' ? 'Desain Khusus 🚀' : 'Custom Design 🚀',
      image: '/FSC-Profile.jpeg',
      link: 'https://github.com/'
    }
  ];

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % showcaseCards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + showcaseCards.length) % showcaseCards.length);
  };

  return (
    <div className="min-h-screen bg-[#090d14] text-slate-100 p-4 sm:p-8 flex flex-col items-center font-space relative overflow-y-auto">
      
      {/* Tombol Kembali & Pilihan Bahasa (ID / EN) */}
      <div className="max-w-xl w-full flex items-center justify-between mb-6 z-20">
        <a 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-mono-code text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>{lang === 'id' ? 'KEMBALI KE UTAMA' : 'BACK TO MAIN'}</span>
        </a>

        <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-mono-code">
          <span className="text-slate-400">Lang:</span>
          <button 
            onClick={() => setLang('id')} 
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${lang === 'id' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300'}`}
          >
            ID
          </button>
          <span>/</span>
          <button 
            onClick={() => setLang('en')} 
            className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${lang === 'en' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300'}`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Title Rayuan Pelanggan */}
      <div className="max-w-xl w-full text-center mb-6 z-20">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          {lang === 'id' ? 'Mau web seperti ini? 😏✨' : 'Want a website like this? 😏✨'}
        </h1>
        <p className="text-xs text-slate-400">
          {lang === 'id' 
            ? 'Bikin web profil / portofolio interaktif impianmu sekarang juga di support ID/EN language!' 
            : 'Build your dream interactive profile / portfolio website right now with ID/EN language support!'}
        </p>
      </div>

      {/* ================= CARD MELAYANG & BISA DIGESER (SLIDER) ================= */}
      <div className="max-w-md w-full relative mb-8 z-20">
        <div className="relative bg-[#0d1117] border border-cyan-500/50 rounded-3xl p-5 shadow-[0_0_35px_rgba(6,182,212,0.25)] transition-all duration-500 hover:scale-[1.02]">
          
          <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono-code font-bold">
            {showcaseCards[currentCardIndex].tag}
          </span>

          <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 border border-white/10 bg-black">
            <img 
              src={showcaseCards[currentCardIndex].image} 
              alt="Preview" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          <h3 className="font-bold text-lg text-white mb-1">
            {showcaseCards[currentCardIndex].title}
          </h3>
          <p className="text-xs text-slate-300 mb-5 leading-relaxed">
            {showcaseCards[currentCardIndex].desc}
          </p>

          {/* Hyperlink ke preview / card terkait */}
          <a
            href={showcaseCards[currentCardIndex].link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-cyan-300 font-mono-code text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer mb-3"
          >
            <span>{lang === 'id' ? 'KUNJUNGI PREVIEW LINK 🔗' : 'VISIT PREVIEW LINK 🔗'}</span>
          </a>

          {/* Tombol Geser Card */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <button 
              onClick={prevCard}
              className="px-3 py-1 rounded-lg bg-black/40 hover:bg-black text-xs font-mono-code text-slate-300 border border-white/10 cursor-pointer"
            >
              ◀ {lang === 'id' ? 'Sebelumnya' : 'Prev'}
            </button>
            <span className="text-[10px] font-mono-code text-slate-500">
              {currentCardIndex + 1} / {showcaseCards.length}
            </span>
            <button 
              onClick={nextCard}
              className="px-3 py-1 rounded-lg bg-black/40 hover:bg-black text-xs font-mono-code text-slate-300 border border-white/10 cursor-pointer"
            >
              {lang === 'id' ? 'Berikutnya' : 'Next'} ▶
            </button>
          </div>

        </div>
      </div>

      {/* ================= AREA BAWAH (BISA DI-SCROLL) ================= */}
      <div className="max-w-md w-full space-y-4 pb-12 z-20">
        
        {/* Info Telegram Link */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono-code text-slate-400 block">
              {lang === 'id' ? 'KONTAK RESMI TELEGRAM' : 'OFFICIAL TELEGRAM CONTACT'}
            </span>
            <span className="font-mono-code text-xs font-bold text-cyan-300">@alonysky / @sun3ss</span>
          </div>
          <a
            href="https://t.me/usernamekamu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono-code text-xs font-bold transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            Telegram ↗
          </a>
        </div>

        {/* Pilihan: Tanya tentang web & Mau beli */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://t.me/usernamekamu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#0d1117] hover:bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400 text-center transition-all cursor-pointer group"
          >
            <div className="text-lg mb-1">💬</div>
            <h4 className="font-bold text-xs text-white group-hover:text-cyan-300 mb-0.5">
              {lang === 'id' ? 'Tanya Tentang Web' : 'Ask About Web'}
            </h4>
            <p className="text-[10px] text-slate-400">
              {lang === 'id' ? 'Konsultasi gratis & custom fitur' : 'Free consultation & custom features'}
            </p>
          </a>

          <a
            href="https://discord.gg/RVZSxzjs"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#0d1117] hover:bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-400 text-center transition-all cursor-pointer group"
          >
            <div className="text-lg mb-1">🛒</div>
            <h4 className="font-bold text-xs text-white group-hover:text-emerald-300 mb-0.5">
              {lang === 'id' ? 'Mau Beli' : 'Want to Buy'}
            </h4>
            <p className="text-[10px] text-slate-400">
              {lang === 'id' ? 'Amankan slot komisi websitemu' : 'Secure your web commission slot'}
            </p>
          </a>
        </div>

      </div>

    </div>
  );
};
