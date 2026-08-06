import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Fish, Turtle, Seahorse, Jellyfish } from './creatures';
import { CurrentLayer } from './layers';

export function FishSchool({ 
  type = "elongated", 
  scale = 1, 
  y = "50vh", 
  duration = 40, 
  delay = 0, 
  color = "#f4a261", 
  reverse = false 
}: { 
  type?: "elongated" | "round";
  scale?: number;
  y?: string;
  duration?: number;
  delay?: number;
  color?: string;
  reverse?: boolean;
}) {
  const count = type === "elongated" ? 15 : 8;
  
  const fishPositions = useMemo(() => Array.from({ length: count }).map(() => ({
    x: Math.random() * 150 - 75,
    y: Math.random() * 80 - 40,
    scale: 0.7 + Math.random() * 0.4,
    wobbleDelay: Math.random() * 2
  })), [count]);

  const url = 'https://www.nationalgeographic.com/animals/fish/facts/clownfish';
  
  return (
    <motion.div
      className="absolute"
      style={{ top: y, left: reverse ? '120vw' : '-20vw', scaleX: reverse ? -scale : scale, scaleY: scale, cursor: 'pointer' }}
      animate={{ x: reverse ? ['0vw', '-150vw'] : ['0vw', '150vw'] }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      whileHover={{ scale: 1.02 }}
    >
      {fishPositions.map((p, i) => (
        <motion.div 
          key={i} 
          className="absolute" 
          style={{ left: p.x, top: p.y, transform: `scale(${p.scale})` }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: p.wobbleDelay }}
        >
          <Fish color={color} type={type} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function SolitaryFish({ 
  scale = 1, 
  y = "30vh", 
  duration = 60, 
  delay = 0, 
  color = "#e9c46a", 
  reverse = false 
}) {
  const url = 'https://www.nationalgeographic.com/animals/fish/facts/clownfish';
  
  return (
    <motion.div
      className="absolute"
      style={{ top: y, left: reverse ? '120vw' : '-20vw', scaleX: reverse ? -scale : scale, scaleY: scale, cursor: 'pointer' }}
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 8px rgba(100,200,255,0.6))" }}
      animate={{ 
        x: reverse ? ['0vw', '-150vw'] : ['0vw', '150vw'],
        y: ['0vh', '10vh', '-5vh', '0vh']
      }}
      transition={{ 
        x: { duration, repeat: Infinity, ease: "linear", delay },
        y: { duration: duration * 0.8, repeat: Infinity, ease: "easeInOut", delay }
      }}
    >
      <Fish color={color} type="round" />
    </motion.div>
  );
}

export function SwimmingTurtle({ 
  scale = 1, 
  y = "40vh", 
  duration = 80, 
  delay = 0, 
  reverse = false 
}) {
  const url = 'https://www.nationalgeographic.com/animals/reptiles/facts/sea-turtles';
  
  return (
    <motion.div
      className="absolute"
      style={{ top: y, left: reverse ? '120vw' : '-20vw', scaleX: reverse ? -scale : scale, scaleY: scale, cursor: 'pointer' }}
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 8px rgba(100,200,255,0.6))" }}
      animate={{ 
        x: reverse ? ['0vw', '-150vw'] : ['0vw', '150vw'],
        y: ['0vh', '-10vh', '5vh', '0vh'],
        rotate: [0, reverse ? 10 : -10, reverse ? -5 : 5, 0]
      }}
      transition={{ 
        x: { duration, repeat: Infinity, ease: "linear", delay },
        y: { duration: 25, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 25, repeat: Infinity, ease: "easeInOut", delay }
      }}
    >
      <Turtle />
    </motion.div>
  );
}

export function HoveringSeahorse({
  scale = 1,
  x = "50vw",
  y = "70vh",
  delay = 0,
  driftDuration = 15
}) {
  const url = 'https://www.nationalgeographic.com/animals/fish/facts/seahorses';
  
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, scale, cursor: 'pointer' }}
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      whileHover={{ scale: 1.08, filter: "drop-shadow(0 0 8px rgba(100,200,255,0.6))" }}
      animate={{ 
        y: ['0vh', '-5vh', '2vh', '0vh'],
        x: ['0vw', '3vw', '-2vw', '0vw']
      }}
      transition={{
        y: { duration: driftDuration, repeat: Infinity, ease: "easeInOut", delay },
        x: { duration: driftDuration * 1.2, repeat: Infinity, ease: "easeInOut", delay }
      }}
    >
      <Seahorse />
    </motion.div>
  );
}

export function DriftingJellyfish({
  scale = 1,
  x = "50vw",
  y = "50vh",
  delay = 0
}) {
  const url = 'https://www.nationalgeographic.com/animals/invertebrates/facts/jellyfish';
  
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, scale, cursor: 'pointer' }}
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 8px rgba(100,200,255,0.6))" }}
      animate={{ 
        y: ['0vh', '-20vh', '0vh'],
        x: ['0vw', '5vw', '-5vw', '0vw']
      }}
      transition={{
        y: { duration: 20, repeat: Infinity, ease: "easeInOut", delay },
        x: { duration: 25, repeat: Infinity, ease: "easeInOut", delay }
      }}
    >
      <Jellyfish />
    </motion.div>
  );
}
