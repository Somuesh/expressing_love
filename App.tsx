
import React, { useState, useCallback } from 'react';
import FloatingHearts from './components/FloatingHearts';
import InteractiveButtons from './components/InteractiveButtons';
import { generateRomanticMessage } from './services/geminiService';
import { ValentineState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<ValentineState>({
    isAccepted: false,
    romanticMessage: '',
    isLoading: false,
    error: null,
  });

  const handleAccept = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, isAccepted: true }));
    
    if ((window as any).confetti) {
      const count = 300;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#fff1f2', '#ffffff']
      };

      const fire = (particleRatio: number, opts: any) => {
        (window as any).confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, { spread: 30, startVelocity: 60 });
      fire(0.2, { spread: 80 });
      fire(0.35, { spread: 120, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 150, startVelocity: 30, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 150, startVelocity: 55 });
    }

    const message = await generateRomanticMessage();
    setState(prev => ({ 
      ...prev, 
      romanticMessage: message, 
      isLoading: false 
    }));
  }, []);

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center px-4 overflow-hidden bg-[#fafafa]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-50/50 via-transparent to-transparent opacity-60"></div>
      <FloatingHearts />
      
      <main className="z-10 max-w-2xl w-full text-center p-12 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)]">
        {!state.isAccepted ? (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            <div className="space-y-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-px bg-rose-200"></div>
                <span className="text-rose-500 font-bold tracking-[0.5em] uppercase text-[10px]">A Sacred Promise</span>
                <div className="w-12 h-px bg-rose-200"></div>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-elegant text-slate-900 leading-[1.1] tracking-tight">
                Will you be my <br />
                <span className="text-rose-600 font-romantic italic block mt-2">Endless Summer?</span>
              </h1>
              <p className="text-slate-500 text-sm font-light max-w-lg mx-auto leading-relaxed italic">"Kyuki tujhse winter nahi jhelte banta."</p>
              <p className="text-slate-500 text-xl font-light max-w-lg mx-auto leading-relaxed italic">
                Beyond the chaos and the noise, there is only this. A life that starts and ends with us. I truly, deeply, and irrevocably <span className="font-semibold text-rose-400">ihateyou</span>.
              </p>
            </div>

            <InteractiveButtons onAccept={handleAccept} />
            
            <div className="pt-8 flex flex-col items-center gap-2 opacity-30">
              <p className="text-[9px] uppercase tracking-[0.6em] text-slate-500 font-black">Two Souls • One Heartbeat</p>
            </div>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="space-y-2">
              <div className="text-5xl mb-4">🥂</div>
              <h2 className="text-5xl font-elegant text-slate-800 tracking-tight">
                To Our <span className="text-rose-600">Always</span>
              </h2>
              <p className="text-slate-400 text-sm uppercase tracking-[0.2em]">The contract is written in the stars</p>
            </div>
            
            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-tr from-rose-100 to-amber-50 rounded-[2.5rem] blur-2xl opacity-40 transition-opacity duration-1000"></div>
              <div className="relative p-10 md:p-14 bg-white/95 rounded-[2rem] border border-rose-50 shadow-2xl min-h-[280px] flex flex-col items-center justify-center transform transition-transform duration-700 hover:rotate-1">
                {state.isLoading ? (
                  <div className="flex flex-col items-center gap-8">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-2 border-rose-100 rounded-full"></div>
                      <div className="absolute inset-0 border-2 border-rose-500 rounded-full border-t-transparent animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-rose-500 font-bold text-[8px]">US</div>
                    </div>
                    <p className="text-rose-300 font-medium tracking-widest text-xs uppercase animate-pulse">Syncing our destinies...</p>
                  </div>
                ) : (
                  <div className="text-center space-y-8">
                    <p className="text-3xl md:text-4xl font-romantic text-rose-700 leading-relaxed italic">
                      "{state.romanticMessage}"
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-px w-8 bg-rose-200"></div>
                      <span className="text-slate-300 text-[10px] font-bold tracking-[0.4em] uppercase">Eternity Confirmed</span>
                      <div className="h-px w-8 bg-rose-200"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <p className="text-rose-600 font-bold text-xl">Infinite</p>
                <p className="text-slate-400 text-[9px] uppercase tracking-widest mt-1">Timeline</p>
              </div>
              <div className="p-5 bg-rose-600 text-white rounded-2xl shadow-lg shadow-rose-200">
                <p className="font-bold text-xl">One</p>
                <p className="opacity-70 text-[9px] uppercase tracking-widest mt-1">Destination</p>
              </div>
              <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <p className="text-rose-600 font-bold text-xl">Home</p>
                <p className="text-slate-400 text-[9px] uppercase tracking-widest mt-1">Definition</p>
              </div>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-slate-300 hover:text-rose-500 transition-colors text-[10px] uppercase tracking-[0.3em] font-black"
            >
              Relive the beginning
            </button>
          </div>
        )}
      </main>

      <footer className="fixed bottom-8 text-slate-300 text-[9px] uppercase tracking-[0.5em] z-10 font-bold">
        Bound by <span className="text-rose-300 hover:text-rose-500 transition-colors cursor-help">ihateyou</span> forever
      </footer>
    </div>
  );
};

export default App;
