import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ShoppingBag, Sparkles, Sliders } from 'lucide-react';

export const OrderWeb: React.FC = () => {
  useEffect(() => {
    document.title = 'Order Web Commission | Professional Storefront';
  }, []);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [lang, setLang] = useState<'id' | 'en'>('id');

  // Data template/contoh showcase web dengan harga flat Rp 150.000 / $10 USD
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
        : 'A card for a pair of friendly dragons on one website with their own custom themes.',
      tag: lang === 'id' ? 'Paling Romantis' : 'Most Romantic',
      link: 'https://nesky-card.vercel.app'
    },
    {
      title: 'Furry Society Group Website',
      desc: lang === 'id'
        ? 'Sebuah Komunitas Dengan Tema Yang Menarik Yaitu Komunitas Furry Yang Estetik Dan Profesional'
        : 'A community with an engaging theme: an aesthetic and professional furry community.',
      tag: lang === 'id' ? 'Fitur Terlengkap' : 'Most Features',
      link: 'https://furry-society-group.my.id'
    },
  ];

  const nextCard = () => setCurrentCardIndex((prev) => (prev + 1) % showcaseCards.length);
  const prevCard = () => setCurrentCardIndex((prev) => (prev - 1 + showcaseCards.length) % showcaseCards.length);

  return (
    <div className="min-h-screen w-full text-slate-100 p-4 sm:p-8 flex flex-col items-center font-space relative overflow-x-hidden">
      
      {/* ================= BACKGROUND GRADASI HALUS (ANTI LAG) ================= */}
      <div className="absolute inset-0 bg-[#060913] -z-20 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-cyan-600/30 to-indigo-600/30 blur-[120px] animate-pulse duration-1000" />
        <div className="absolute top-[30%] -right-[20%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-emerald-600/20 to-cyan-700/20 blur-[140px] animate-pulse duration-1000" />
      </div>

      {/* Top Navigation & Language Switcher */}
      <div className="max-w-4xl w-full flex items-center justify-between mb-8 z-20">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono-code text-cyan-300 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 px-3.5 py-2 rounded-2xl shadow-lg cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>{lang === 'id' ? 'KEMBALI KE UTAMA' : 'BACK TO MAIN'}</span>
        </a>

        <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono-code shadow-lg">
          <span className="text-slate-400">Lang:</span>
          <button 
            onClick={() => setLang('id')} 
            className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${lang === 'id' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-300'}`}
          >
            ID
          </button>
          <span>/</span>
          <button 
            onClick={() => setLang('en')} 
            className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${lang === 'en' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-300'}`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Store Header Section */}
      <div className="max-w-3xl w-full text-center mb-10 z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-xs font-mono-code mb-4 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          {lang === 'id' ? 'STATUS KOMISI: OPEN (SLOT TERSEDIA)' : 'COMMISSION STATUS: OPEN'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 drop-shadow-md">
          {lang === 'id' ? 'Custom Website Commission Store 🚀' : 'Custom Website Commission Store 🚀'}
        </h1>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          {lang === 'id' 
            ? 'Pesan website interaktif impianmu dengan harga flat, bebas request fitur & multi-card sesuai selera!' 
            : 'Order your dream interactive website with a flat price, free multi-card & custom feature requests!'}
        </p>
      </div>

      {/* ================= MAIN STOREFRONT SHOWCASE (GLASSMORPHISM) ================= */}
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 z-20">
        
        {/* Left: Live Responsive Preview Panel */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex-1 flex flex-col justify-between">
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-code text-cyan-300 flex items-center gap-1.5 bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/20">
                  <Sliders size={13} /> {lang === 'id' ? 'Live Responsive Preview' : 'Live Responsive Preview'}
                </span>

                <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-400/20 text-cyan-300 text-xs font-mono-code font-bold">
                  {showcaseCards[currentCardIndex].tag}
                </span>
              </div>

              {/* Kotak Preview Presisi Otomatis Mengikuti Asli (Full Container) */}
              <div className="w-full flex justify-center bg-black/20 backdrop-blur-sm p-2 rounded-2xl border border-white/5 relative">
                <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-black relative border border-white/10 shadow-2xl">
                  <iframe 
                    src={showcaseCards[currentCardIndex].link} 
                    title="Live Web Preview"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Slider Navigation */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
              <button 
                onClick={prevCard}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono-code text-slate-300 border border-white/10 transition-all cursor-pointer backdrop-blur-md"
              >
                ◀ {lang === 'id' ? 'Sebelumnya' : 'Prev'}
              </button>
              <span className="text-xs font-mono-code text-cyan-400 font-bold">
                Template {currentCardIndex + 1} of {showcaseCards.length}
              </span>
              <button 
                onClick={nextCard}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono-code text-slate-300 border border-white/10 transition-all cursor-pointer backdrop-blur-md"
              >
                {lang === 'id' ? 'Berikutnya' : 'Next'} ▶
              </button>
            </div>

          </div>
        </div>

        {/* Right: Flat Price & Universal Features Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div>
            <div className="text-xs font-mono-code text-cyan-400 mb-1 uppercase tracking-wider">
              {lang === 'id' ? 'Paket Universal All-in-One' : 'All-in-One Universal Package'}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {showcaseCards[currentCardIndex].title}
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              {showcaseCards[currentCardIndex].desc}
            </p>

            {/* Flat Price Tag */}
            <div className="text-xl font-extrabold text-emerald-400 font-mono-code mb-5 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 px-4 py-2.5 rounded-2xl inline-block shadow-inner">
              {lang === 'id' ? 'Rp 150.000 / Flat' : '$10 USD / Flat'}
            </div>

            {/* Universal Features List */}
            <div className="space-y-2.5 mb-6">
              <div className="text-[11px] font-mono-code text-slate-400">
                {lang === 'id' ? 'FASILITAS & KETENTUAN PAKET:' : 'PACKAGE FEATURES & TERMS:'}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                <span>{lang === 'id' ? 'Bebas Request Jumlah Multi-Card' : 'Free Multi-Card Request'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                <span>{lang === 'id' ? 'Bebas Jumlah Media Sosial' : 'Unlimited Social Media Links'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                <span>{lang === 'id' ? 'Maksimal 3 Request Fitur Utama' : 'Up to 3 Custom Main Features'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                <span>{lang === 'id' ? 'Support Custom Domain (Biaya per Tahun)' : 'Custom Domain Support (Annual Fee)'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <a
              href={showcaseCards[currentCardIndex].link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 font-mono-code text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-md shadow-lg"
            >
              <span>{lang === 'id' ? 'KUNJUNGI DEMO FULL 🔗' : 'VISIT FULL DEMO 🔗'}</span>
            </a>

            <a
              href={`https://t.me/Nesinezz?text=Hi%2C%20I%27d%20like%20to%20order%20a%20custom%20website%20commission%20based%20on%20${encodeURIComponent(showcaseCards[currentCardIndex].title)}!`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-mono-code text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>{lang === 'id' ? 'PESAN SEKARANG (RP 150K) 🛒' : 'ORDER NOW ($10 USD) 🛒'}</span>
            </a>
          </div>

        </div>

      </div>

      {/* ================= AREA BAWAH: INFORMASI & KONTAK ================= */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 pb-12 z-20">
        
        {/* Contact Telegram */}
        <div className="p-5 rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono-code text-slate-400 block mb-1">
              {lang === 'id' ? 'KONTAK RESMI TELEGRAM' : 'OFFICIAL TELEGRAM CONTACT'}
            </span>
            <span className="font-mono-code text-xs font-bold text-cyan-300 block mb-3">『#RVX』Sun3ss@B.P.Tʜʏʀᴏ⸸</span>
          </div>
          <a
            href="https://t.me/Nesinezz?text=Hi%2C%20let%27s%20talk%20about%20web%20development!" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono-code text-xs font-bold text-center transition-all shadow-md cursor-pointer"
          >
            Telegram ↗
          </a>
        </div>

        {/* Tanya Tentang Web */}
        <a
          href="https://t.me/Nesinezz?text=Hi%2C%20I%20have%20questions%20about%20custom%20features%20for%20my%20website%20commission."
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-[28px] bg-white/[0.03] backdrop-blur-2xl hover:bg-white/[0.06] border border-white/10 shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="text-lg mb-1">💬</div>
            <h4 className="font-bold text-xs text-white group-hover:text-cyan-300 mb-1">
              {lang === 'id' ? 'Tanya Tentang Web' : 'Ask About Web'}
            </h4>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              {lang === 'id' ? 'Diskusikan request 3 fitur utama & custom domain secara gratis.' : 'Discuss your 3 main custom features & domain setup for free.'}
            </p>
          </div>
          <span className="text-[10px] font-mono-code text-cyan-400 mt-3 block">Chat Now →</span>
        </a>

        {/* Mau Beli / Secure Order */}
        <a
          href="https://t.me/Nesinezz?text=Hi%2C%20I%20want%20to%20order%20the%20Rp%20150.000%20website%20commission!"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-[28px] bg-white/[0.03] backdrop-blur-2xl hover:bg-white/[0.06] border border-white/10 shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="text-lg mb-1">🛒</div>
            <h4 className="font-bold text-xs text-white group-hover:text-emerald-300 mb-1">
              {lang === 'id' ? 'Mau Beli' : 'Want to Buy'}
            </h4>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              {lang === 'id' ? 'Amankan slot komisi websitemu sekarang seharga Rp 150.000 flat.' : 'Secure your custom web commission slot for a flat Rp 150.000.'}
            </p>
          </div>
          <span className="text-[10px] font-mono-code text-emerald-400 mt-3 block">Book Slot →</span>
        </a>

      </div>

    </div>
  );
};
