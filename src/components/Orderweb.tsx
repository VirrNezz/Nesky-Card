import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Terminal, Smartphone, Monitor } from 'lucide-react';

export const OrderWeb: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9'); // State untuk atur ukuran preview

  // Data card melayang dengan link tujuan live preview
  const showcaseCards = [
    {
      title: 'Juno Card',
      desc: lang === 'id' 
        ? 'Card Interaktif Dengan Fitur Card Fursona Dan Art Gallery' 
        : 'An interactive showcase featuring dedicated fursona cards and an art gallery layout.',
      tag: lang === 'id' ? 'Paling Disukai' : 'Most Liked',
      link: 'https://juno-card.vercel.app'
    },
    {
      title: 'Capruk Card',
      desc: lang === 'id' 
        ? 'Desain Tenang bertema Aquatic Dengan Bermacam-Macam Media Sosial Card yang estetik' 
        : 'A serene aquatic-themed aesthetic design packed with clean, stylized social media cards.',
      tag: lang === 'id' ? 'Desain Khusus 🚀' : 'Custom Design 🚀',
      link: 'https://capruk-card.vercel.app'
    },
    {
      title: 'Nesky Card',
      desc: lang === 'id'
        ? 'Sebuah Card Sepasang 2 Naga Yang Mesra Dalam Satu Web Dengan Temanya Masing-Masing'
        : 'A card for a pair of 2 friendly dragons on one website with their own themes',
      tag: lang === 'id' ? 'paling romantis' : 'most romantic',
      link: 'https://nesky-card.vercel.app'
    },
    {
      title: 'Furry Society Group Website',
      desc: lang === 'id'
        ? 'Sebuah Komunitas Dengan Tema Yang Menarik Yaitu Komunitas Furry Yang Estetik Dan Profesional'
        : 'A community with an engaging theme: an aesthetic and professional furry community.',
      tag: lang === 'id' ? 'paling mahal karna banyak fitur' : 'most expensive cause a lot of feature',
      link: 'https://furry-society-group.my.id'
    },
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
            ? 'Bikin web profil / portofolio interaktif impianmu sekarang juga dengan dukungan bahasa ID/EN!' 
            : 'Bring your dream interactive portfolio or profile to life with full ID/EN language support!'}
        </p>
      </div>

      {/* ================= CARD MELAYANG & BISA DIGESER (SLIDER) ================= */}
      <div className="max-w-md w-full relative mb-8 z-20">
        <div className="relative bg-[#0d1117] border border-cyan-500/50 rounded-3xl p-5 shadow-[0_0_35px_rgba(6,182,212,0.25)] transition-all duration-500 hover:scale-[1.02]">
          
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            {/* Tombol Pengubah Ukuran Rasio (9:16 / 16:9) */}
            <div className="flex items-center bg-black/60 border border-cyan-500/40 rounded-lg p-0.5 text-[10px] font-mono-code">
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`px-2 py-0.5 rounded flex items-center gap-1 transition-all cursor-pointer ${
                  aspectRatio === '16:9' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="Desktop View (16:9)"
              >
                <Monitor size={12} /> 16:9
              </button>
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`px-2 py-0.5 rounded flex items-center gap-1 transition-all cursor-pointer ${
                  aspectRatio === '9:16' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="Mobile View (9:16)"
              >
                <Smartphone size={12} /> 9:16
              </button>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono-code font-bold backdrop-blur-md">
              {showcaseCards[currentCardIndex].tag}
            </span>
          </div>

          {/* Kotak Live Preview Iframe dengan Ukuran Dinamis (16:9 atau 9:16) */}
          <div 
            className={`w-full rounded-2xl overflow-hidden mb-4 border border-white/10 bg-black relative transition-all duration-300 ${
              aspectRatio === '9:16' ? 'h-96' : 'h-48'
            }`}
          >
            <iframe 
              src={showcaseCards[currentCardIndex].link} 
              title="Live Web Preview"
              className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none border-0"
              loading="lazy"
            />
          </div>

          <h3 className="font-bold text-lg text-white mb-1">
            {showcaseCards[currentCardIndex].title}
          </h3>
          <p className="text-xs text-slate-300 mb-5 leading-relaxed">
            {showcaseCards[currentCardIndex].desc}
          </p>

          {/* Hyperlink ke preview */}
          <a
            href={showcaseCards[currentCardIndex].link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-cyan-300 font-mono-code text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer mb-3"
          >
            <span>{lang === 'id' ? 'KUNJUNGI PREVIEW LINK 🔗' : 'VISIT LIVE PREVIEW 🔗'}</span>
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
            <span className="font-mono-code text-xs font-bold text-cyan-300">『#RVX』Sun3ss@B.P.Tʜʏʀᴏ⸸</span>
          </div>
          <a
            href="https://t.me/Nesinezz?text=Hi%2C%20I%27m%20interested%20in%20commissioning%20a%20website!" 
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
            href="https://t.me/Nesinezz?text=Hi%2C%20I%20have%20a%20few%20questions%20about%20your%20website%20commissions."
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
            href="https://t.me/Nesinezz?text=Hi%2C%20I%20would%20like%20to%20order%20a%20website%20commission!"
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
