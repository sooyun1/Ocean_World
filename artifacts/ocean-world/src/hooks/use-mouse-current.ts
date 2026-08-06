import { useMotionValue, useAnimationFrame } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function useMouseCurrent() {
  const currentX = useMotionValue(0);
  const currentY = useMotionValue(0);

  const targetMouseX = useRef<number | null>(null);
  const targetMouseY = useRef<number | null>(null);
  const lastMouseX = useRef<number | null>(null);
  const lastMouseY = useRef<number | null>(null);

  const velX = useRef(0);
  const velY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lastMouseX.current === null) {
        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
      }
      targetMouseX.current = e.clientX;
      targetMouseY.current = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (lastMouseX.current === null) {
        lastMouseX.current = touch.clientX;
        lastMouseY.current = touch.clientY;
      }
      targetMouseX.current = touch.clientX;
      targetMouseY.current = touch.clientY;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      lastMouseX.current = t.clientX;
      lastMouseY.current = t.clientY;
      targetMouseX.current = t.clientX;
      targetMouseY.current = t.clientY;
    };
    
    // Set initial mouse pos to center of screen to avoid weird jumps
    lastMouseX.current = window.innerWidth / 2;
    lastMouseY.current = window.innerHeight / 2;
    targetMouseX.current = window.innerWidth / 2;
    targetMouseY.current = window.innerHeight / 2;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useAnimationFrame(() => {
    if (
      targetMouseX.current !== null && 
      lastMouseX.current !== null && 
      targetMouseY.current !== null && 
      lastMouseY.current !== null
    ) {
      const dx = targetMouseX.current - lastMouseX.current;
      const dy = targetMouseY.current - lastMouseY.current;
      
      // Accumulate velocity, dampen the spike slightly
      velX.current += dx * 0.05;
      velY.current += dy * 0.05;
      
      // Cap max velocity to avoid jarring snaps
      velX.current = Math.max(-60, Math.min(60, velX.current));
      velY.current = Math.max(-60, Math.min(60, velY.current));

      lastMouseX.current = targetMouseX.current;
      lastMouseY.current = targetMouseY.current;
    }

    // Decay smoothly back to zero
    velX.current *= 0.92;
    velY.current *= 0.92;

    currentX.set(velX.current);
    currentY.set(velY.current);
  });

  return { currentX, currentY };
}
