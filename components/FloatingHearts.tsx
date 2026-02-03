
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: `${10 + Math.random() * 30}px`,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-red-200 animate-bounce opacity-50"
          style={{
            left: heart.left,
            bottom: '-50px',
            fontSize: heart.size,
            animation: `floatUp ${heart.duration} linear infinite`,
            animationDelay: heart.delay,
          }}
        >
          ❤
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
