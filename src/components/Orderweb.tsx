import React from 'react';
import { ArrowLeft, Sparkles, Terminal } from 'lucide-react';

export const OrderWeb: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090d14] text-slate-100 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-6 shadow-2xl">
        <a 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-mono-code text-zinc-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>KEMBALI KE BERANDA</span>
        </a>

        <div className="flex items-center gap-2 mb-4">
          <Terminal size={20} className="text-zinc-200" />
          <h1 className="text-xl font-bold font-space text-zinc-100">
            HALAMAN ORDER WEB
          </h1>
        </div>

        <p className="text-xs text-slate-400 mb-6 font-space">
          Formulir atau informasi pemesanan web / komisi khusus dari card Sun3ss.
        </p>

        <a
          href="https://discord.gg/RVZSxzjs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-white text-black font-bold flex items-center justify-center gap-2 transition-all text-xs font-mono-code"
        >
          <Sparkles size={14} />
          <span>HUBUNGI VIA DISCORD</span>
        </a>
      </div>
    </div>
  );
};
