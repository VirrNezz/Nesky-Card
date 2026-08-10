kimport React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Sparkles,
  Move,
  X,
  Send,
  RotateCcw,
  Volume2,
  VolumeX,
  Terminal,
  Bot,
} from 'lucide-react';
import { TransitionEffect, ProfileId } from '../types';

interface PNGTuberWidgetProps {
  speechText: string;
  activeProfileId: ProfileId;
  transitionEffect: TransitionEffect;
  soundEnabled: boolean;
  onSendMessage: (msg: string) => void;
  onResetPosition: () => void;
}

export const PNGTuberWidget: React.FC<PNGTuberWidgetProps> = ({
  speechText,
  activeProfileId,
  transitionEffect,
  soundEnabled,
  onSendMessage,
}) => {
  // Draggable position state
  const [position, setPosition] = useState({ x: 20, y: 120 }); // initial bottom-right/side offset
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPosRef = useRef({ x: 0, y: 0 });

  // Typewriter and Talking PNG logic
  const [displayedText, setDisplayedText] = useState('');
  const [isTalking, setIsTalking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showChatInput, setShowChatInput] = useState(false);
  const [inputVal, setInputVal] = useState('');

  // Fallback image error handling
  const [imgError, setImgError] = useState<{ talking: boolean; silent: boolean }>({
    talking: false,
    silent: false,
  });

  useEffect(() => {
    setImgError({ talking: false, silent: false });
  }, [activeProfileId]);

  // Floating widget position initialization for responsive screens
  useEffect(() => {
    const handleResize = () => {
      const defaultX = Math.max(10, window.innerWidth - 220);
      const defaultY = Math.max(10, window.innerHeight - 320);
      setPosition((prev) => {
        const clampedX = Math.min(Math.max(10, prev.x), window.innerWidth - 180);
        const clampedY = Math.min(Math.max(10, prev.y), window.innerHeight - 200);
        return { x: clampedX, y: clampedY };
      });
    };

    const initialX = Math.max(10, window.innerWidth - 220);
    const initialY = Math.max(10, window.innerHeight - 340);
    setPosition({ x: initialX, y: initialY });

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Audio Beep Effect for Speech / Drag
  const playBeep = (freq = 600, duration = 0.05) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio context errors gracefully
    }
  };

  // Typewriter effect logic
  useEffect(() => {
    if (!speechText) {
      setDisplayedText('');
      setIsTalking(false);
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    let talkTimer: NodeJS.Timeout | null = null;

    const interval = setInterval(() => {
      if (index < speechText.length) {
        const char = speechText[index];
        setDisplayedText((prev) => prev + char);

        if (char !== ' ') {
          setIsTalking(true);
          playBeep(700 + (index % 5) * 50, 0.03);

          if (talkTimer) clearTimeout(talkTimer);
          talkTimer = setTimeout(() => {
            setIsTalking(false);
          }, 90);
        } else {
          setIsTalking(false);
        }

        index++;
      } else {
        clearInterval(interval);
        if (talkTimer) clearTimeout(talkTimer);
        setIsTalking(false);
        setIsTyping(false);
      }
    }, 45);

    return () => {
      clearInterval(interval);
      if (talkTimer) clearTimeout(talkTimer);
    };
  }, [speechText, soundEnabled]);

  // Handle Dragging Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, a')) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPosRef.current = { ...position };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const widgetSize = 96;
    const maxX = Math.max(0, window.innerWidth - widgetSize);
    const maxY = Math.max(0, window.innerHeight - widgetSize);

    const newX = Math.min(Math.max(0, initialPosRef.current.x + dx), maxX);
    const newY = Math.min(Math.max(0, initialPosRef.current.y + dy), maxY);

    setPosition({ x: newX, y: newY });
  };

  // Handle Touch Dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button, input, a')) return;
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    initialPosRef.current = { ...position };
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;

    const widgetSize = 96;
    const maxX = Math.max(0, window.innerWidth - widgetSize);
    const maxY = Math.max(0, window.innerHeight - widgetSize);

    const newX = Math.min(Math.max(0, initialPosRef.current.x + dx), maxX);
    const newY = Math.min(Math.max(0, initialPosRef.current.y + dy), maxY);

    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    setPosition((prev) => {
      const midPoint = window.innerWidth / 2;
      const widgetSize = 96;
      const snapPadding = 12;
      const maxY = Math.max(12, window.innerHeight - widgetSize - 12);

      let finalX: number;
      if (prev.x + widgetSize / 2 < midPoint) {
        finalX = snapPadding;
      } else {
        finalX = Math.max(snapPadding, window.innerWidth - widgetSize - snapPadding);
      }

      const finalY = Math.min(Math.max(12, prev.y), maxY);

      return { x: finalX, y: finalY };
    });
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleDragEnd);
      window.addEventListener('touchcancel', handleDragEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('touchcancel', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('touchcancel', handleDragEnd);
    };
  }, [isDragging]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onSendMessage(inputVal.trim());
    setInputVal('');
  };

  const isAlonysky = activeProfileId === 'alonysky';
  const isRightSide = position.x > (typeof window !== 'undefined' ? window.innerWidth / 2 : 200);

  const idleImgSrc = isAlonysky ? '/idle.png' : '/sun3ss-idle.png';
  const speakImgSrc = isAlonysky ? '/speak.png' : '/sun3ss-speak.png';

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
      }}
      className="select-none touch-none"
    >
      <div className="relative flex flex-col items-center group">
        {/* ================= TYPEWRITER CHAT BUBBLE ================= */}
        {displayedText && (
          <div
            className={`absolute bottom-full mb-3 w-64 sm:w-72 p-3 rounded-xl border shadow-2xl transition-all duration-300 ${
              isRightSide ? 'right-0' : 'left-0'
            } ${
              isAlonysky
                ? 'bg-[#0d1117]/95 border-cyan-500/60 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                : 'bg-zinc-950/95 border-zinc-600 text-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
            }`}
          >
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10 text-[10px] font-mono-code opacity-80">
              <span className="flex items-center gap-1">
                <Bot size={12} className={isAlonysky ? 'text-cyan-400' : 'text-zinc-200'} />
                {isAlonysky ? 'ALONYSKY_ASSISTANT' : 'SUN3SS_SKUNK_BOT'}
              </span>
              {isTyping && <span className="animate-pulse font-bold text-emerald-400">TYPING...</span>}
            </div>

            <p className="font-space text-xs leading-relaxed break-words font-medium">
              {displayedText}
              {isTyping && <span className="inline-block w-1.5 h-3 ml-0.5 bg-emerald-400 animate-ping" />}
            </p>

            <div
              className={`absolute top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 ${
                isRightSide ? 'right-8' : 'left-8'
              } ${isAlonysky ? 'border-t-cyan-500/60' : 'border-t-zinc-600'}`}
            />
          </div>
        )}

        {/* ================= PNGTUBER AVATAR IMAGE CONTAINER ================= */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`relative cursor-grab active:cursor-grabbing p-1.5 rounded-full transition-all duration-300 ${
            isDragging ? 'scale-110' : 'hover:scale-105'
          }`}
        >
          <div
            className={`absolute -inset-1 rounded-full blur-md transition-all duration-500 ${
              isAlonysky
                ? 'bg-gradient-to-r from-cyan-500 via-emerald-400 to-blue-500 opacity-80 animate-pulse'
                : 'bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-700 opacity-70'
            }`}
          />

          <div
            className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 p-0.5 overflow-hidden shadow-2xl flex items-center justify-center ${
              isAlonysky
                ? 'border-cyan-400 bg-[#0d1117]'
                : 'border-zinc-200 bg-black'
            }`}
          >
            {transitionEffect === 'glitch' ? (
              <div
                className="glitch-wrapper rounded-full overflow-hidden"
                style={{
                  backgroundImage: `url(${isTalking ? speakImgSrc : idleImgSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="glitch-layer glitch-layer-1" />
                <div className="glitch-layer glitch-layer-2" />
                <div
                  className="w-full h-full bg-cover bg-center rounded-full"
                  style={{ backgroundImage: 'inherit' }}
                />
              </div>
            ) : isTalking ? (
              !imgError.talking ? (
                <img
                  src={speakImgSrc}
                  alt={`${isAlonysky ? 'Alonysky' : 'Sun3ss Skunk'} Talking Avatar`}
                  onError={() => setImgError((prev) => ({ ...prev, talking: true }))}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full transform scale-105"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-cyan-900 flex flex-col items-center justify-center text-cyan-200 font-mono-code text-xs">
                  <span className="text-lg">😮</span>
                  <span>TALKING</span>
                </div>
              )
            ) : !imgError.silent ? (
              <img
                src={idleImgSrc}
                alt={`${isAlonysky ? 'Alonysky' : 'Sun3ss Skunk'} Silent Avatar`}
                onError={() => setImgError((prev) => ({ ...prev, silent: true }))}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-zinc-900 flex flex-col items-center justify-center text-zinc-200 font-mono-code text-xs">
                <span className="text-lg">🙂</span>
                <span>SILENT</span>
              </div>
            )}

            {transitionEffect === 'sniper' && (
              <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center animate-sniper-flash rounded-full overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-red-600/40 animate-ping" />
                <div className="absolute inset-0 rounded-full border-2 border-red-500/80 animate-pulse" />

                <svg viewBox="0 0 100 100" className="w-full h-full text-red-500 opacity-90 drop-shadow-[0_0_8px_#ff0000]">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M50 50 L20 15 M50 50 L85 25 M50 50 L75 80 M50 50 L15 75" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
                </svg>
              </div>
            )}

            <div className="absolute top-1 right-1 p-1 rounded-full bg-black/70 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Move size={10} />
            </div>
          </div>

          <div className="absolute -bottom-3 flex items-center gap-1 bg-black/80 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded-full shadow-lg">
            <button
              onClick={() => setShowChatInput((prev) => !prev)}
              title="Chat with Assistant"
              className="p-1 rounded-full text-cyan-400 hover:text-cyan-200 hover:bg-white/10 transition-colors"
            >
              <MessageSquare size={12} />
            </button>
            <button
              onClick={() =>
                onSendMessage(
                  isAlonysky
                    ? "Explain the 3D perspective flip protocol!"
                    : "Tell me about Sun3ss's stealth skunk architecture."
                )
              }
              title="Trigger Random Quote"
              className="p-1 rounded-full text-emerald-400 hover:text-emerald-200 hover:bg-white/10 transition-colors"
            >
              <Sparkles size={12} />
            </button>
          </div>
        </div>

        {/* ================= CHAT INPUT POPOVER MODAL ================= */}
        {showChatInput && (
          <div
            className={`absolute top-full mt-4 w-72 p-3 rounded-xl border shadow-2xl backdrop-blur-md z-50 ${
              isAlonysky
                ? 'bg-[#0d1117]/95 border-cyan-500/50 text-cyan-200'
                : 'bg-zinc-950/95 border-zinc-700 text-zinc-100'
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono-code font-bold">
              <span className="flex items-center gap-1">
                <Terminal size={14} className={isAlonysky ? 'text-cyan-400' : 'text-zinc-200'} />
                PROMPT_ASSISTANT://
              </span>
              <button
                onClick={() => setShowChatInput(false)}
                className="p-0.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex gap-1.5">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type a query for PNGTuber..."
                className={`flex-1 px-2.5 py-1.5 rounded-lg border text-xs font-mono-code focus:outline-none ${
                  isAlonysky
                    ? 'bg-black/60 border-cyan-900 focus:border-cyan-400 text-cyan-200 placeholder-cyan-700'
                    : 'bg-black/80 border-zinc-800 focus:border-zinc-400 text-zinc-100 placeholder-zinc-600'
                }`}
              />
              <button
                type="submit"
                className={`p-1.5 rounded-lg border font-bold transition-all ${
                  isAlonysky
                    ? 'bg-cyan-600 hover:bg-cyan-500 border-cyan-400 text-white'
                    : 'bg-zinc-100 hover:bg-white border-zinc-300 text-black'
                }`}
              >
                <Send size={14} />
              </button>
            </form>

            <div className="mt-2.5 flex flex-wrap gap-1">
              {[
                'Tell me a joke!',
                'Who is Alonysky?',
                'Who is Sun3ss?',
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSendMessage(chip);
                    setShowChatInput(false);
                  }}
                  className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
