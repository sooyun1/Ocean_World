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
    
    // Set initial mouse pos to center of screen to avoid weird jumps
    lastMouseX.current = window.innerWidth / 2;
    lastMouseY.current = window.innerHeight / 2;
    targetMouseX.current = window.innerWidth / 2;
    targetMouseY.current = window.innerHeight / 2;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
