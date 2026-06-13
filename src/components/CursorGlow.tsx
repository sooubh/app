import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -400, y: -400 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-[400ms] ease-[cubic-bezier(0.1,0.8,0.2,1)] -translate-x-1/2 -translate-y-1/2 md:block hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(252, 211, 77, 0.08) 0%, rgba(245, 158, 11, 0.02) 50%, rgba(0,0,0,0) 70%)',
        filter: 'blur(10px)',
      }}
    />
  );
}
