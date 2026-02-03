
import React, { useState, useRef, useEffect } from 'react';
import { ButtonPosition } from '../types';

interface Props {
  onAccept: () => void;
}

const InteractiveButtons: React.FC<Props> = ({ onAccept }) => {
  const [noPosition, setNoPosition] = useState<ButtonPosition>({ x: 0, y: 0 });
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const [avoidCount, setAvoidCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | null>(null);

  const moveNoButton = (e: React.MouseEvent) => {
    if (!containerRef.current || !yesButtonRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const yesRect = yesButtonRef.current.getBoundingClientRect();
    
    // Increment avoid count to trigger the funny hint after some attempts
    setAvoidCount(prev => {
      const next = prev + 1;
      if (next > 5) setShowHint(true);
      return next;
    });

    // Reset hint timer whenever they try to chase it
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setShowHint(false), 3000);

    const btnWidth = 120;
    const btnHeight = 50;
    const padding = 20;

    let newX, newY, isOverlapping;
    let attempts = 0;

    // Keep generating positions until we find one that doesn't overlap with the YES button
    do {
      newX = Math.random() * (containerRect.width - btnWidth - padding * 2) + padding;
      newY = Math.random() * (containerRect.height - btnHeight - padding * 2) + padding;

      // Convert local coordinates to screen coordinates to check overlap with YES button
      const screenX = containerRect.left + newX;
      const screenY = containerRect.top + newY;

      isOverlapping = (
        screenX < yesRect.right + 20 &&
        screenX + btnWidth > yesRect.left - 20 &&
        screenY < yesRect.bottom + 20 &&
        screenY + btnHeight > yesRect.top - 20
      );
      attempts++;
    } while (isOverlapping && attempts < 20);

    setNoPosition({ x: newX, y: newY });
    setIsHoveringNo(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 flex flex-col items-center justify-center mt-4 overflow-visible"
    >
      {showHint && (
        <div className="absolute top-0 animate-bounce text-rose-400 font-medium text-sm italic bg-rose-50 px-4 py-2 rounded-full border border-rose-100 shadow-sm transition-all duration-500">
          Tum toh meri ho naa.. Just click on "Always & Forever"
        </div>
      )}

      <button
        ref={yesButtonRef}
        onClick={onAccept}
        className="px-16 py-7 bg-rose-600 hover:bg-rose-700 text-white text-3xl font-romantic rounded-full shadow-[0_15px_40px_rgba(225,29,72,0.4)] transform transition-all hover:scale-110 active:scale-95 z-20 group"
      >
        Always & Forever
        <span className="block text-[10px] font-sans opacity-60 uppercase tracking-[0.2em] mt-2 group-hover:tracking-[0.3em] transition-all">Say it loud, that you love me</span>
      </button>

      <button
        onMouseEnter={moveNoButton}
        onFocus={moveNoButton}
        style={{
          position: isHoveringNo ? 'absolute' : 'relative',
          left: isHoveringNo ? `${noPosition.x}px` : '0',
          top: isHoveringNo ? `${noPosition.y}px` : '40px',
          transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          opacity: isHoveringNo ? 0.9 : 0.5,
        }}
        className={`px-6 py-3 bg-white/40 backdrop-blur-sm text-slate-400 text-base font-medium rounded-full border border-slate-200/50 shadow-sm cursor-default whitespace-nowrap z-10`}
      >
        I'll think and let you know...
      </button>
    </div>
  );
};

export default InteractiveButtons;
