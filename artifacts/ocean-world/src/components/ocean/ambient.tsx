import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { usePopBubble, getGetLeaderboardQueryKey } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';

export function LightRays() {
  const rays = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 80 + 10}vw`,
    width: `${Math.random() * 20 + 10}vw`,
    delay: Math.random() * -10,
    duration: Math.random() * 8 + 12,
    opacity: Math.random() * 0.15 + 0.05
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-soft-light">
      {rays.map((ray) => (
        <motion.div
          key={ray.id}
          className="absolute top-[-10vh] h-[120vh]"
          style={{
            left: ray.left,
            width: ray.width,
            background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
            transformOrigin: 'top center',
          }}
          animate={{
            opacity: [ray.opacity, ray.opacity * 1.5, ray.opacity],
            rotate: [-5, 5, -5],
            x: ['-2vw', '2vw', '-2vw']
          }}
          transition={{
            duration: ray.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ray.delay
          }}
        />
      ))}
    </div>
  );
}

export function MarineSnow() {
  const particles = useMemo(() => Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 100}vh`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -30,
    wobble: Math.random() * 20 + 10
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: [0, p.wobble, -p.wobble, 0],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            x: { duration: p.duration / 3, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            opacity: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }
          }}
        />
      ))}
    </div>
  );
}

interface BubbleData {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  wobble: number;
  popped: boolean;
}

interface BubblesProps {
  currentUser: { id: number; nickname: string; bubbleCount: number } | null;
  onPop?: () => void;
}

export function Bubbles({ currentUser, onPop }: BubblesProps) {
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const popMutation = usePopBubble();
  const queryClient = useQueryClient();

  const createBubble = (id: number): BubbleData => ({
    id,
    left: `${Math.random() * 90 + 5}vw`,
    size: Math.random() * 35 + 20, // 20px to 55px
    duration: Math.random() * 8 + 6,
    delay: Math.random() * -10,
    wobble: Math.random() * 15 + 5,
    popped: false
  });

  useEffect(() => {
    // Initial bubbles
    const initial = Array.from({ length: 20 }).map((_, i) => createBubble(i));
    setBubbles(initial);
  }, []);

  const handlePop = (id: number) => {
    if (!currentUser) return;
    
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    
    popMutation.mutate({ userId: currentUser.id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetLeaderboardQueryKey() });
        if (onPop) onPop();
      }
    });

    setTimeout(() => {
      setBubbles(prev => {
        const filtered = prev.filter(b => b.id !== id);
        return [...filtered, createBubble(Date.now() + Math.random())];
      });
    }, 300);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full border border-white/40 bg-white/10 flex items-center justify-center pointer-events-auto"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            cursor: currentUser ? 'pointer' : 'default',
          }}
          initial={{ y: '110vh', scale: 1, opacity: 1 }}
          animate={b.popped ? {
            scale: 1.4,
            opacity: 0,
            transition: { duration: 0.2 }
          } : {
            y: '-10vh',
            x: [0, b.wobble, -b.wobble, 0],
          }}
          transition={b.popped ? undefined : {
            y: { duration: b.duration, repeat: Infinity, ease: "linear", delay: b.delay },
            x: { duration: b.duration / 2, repeat: Infinity, ease: "easeInOut", delay: b.delay }
          }}
          onClick={() => {
            if (!b.popped) handlePop(b.id);
          }}
        >
          {/* Highlight to make it look like a bubble */}
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/60 rounded-full pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}
