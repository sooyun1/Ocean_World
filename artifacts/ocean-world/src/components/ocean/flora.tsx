import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { SwayLayer } from './layers';
import { MotionValue } from 'framer-motion';

export function SeafloorBase() {
  return (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
      {/* Background dark mound */}
      <path d="M 0 200 L 0 150 Q 200 100 400 160 T 800 120 T 1000 150 L 1000 200 Z" fill="#2c1810" />
      {/* Mid sand mound */}
      <path d="M 0 200 L 0 170 Q 150 140 300 180 T 700 150 T 1000 170 L 1000 200 Z" fill="#4a3728" />
      {/* Front sand mound */}
      <path d="M 0 200 L 0 185 Q 250 160 500 190 T 900 175 T 1000 185 L 1000 200 Z" fill="#8b7355" />
      
      {/* Large Rocks */}
      <path d="M 100 190 C 120 160 160 160 180 190 Z" fill="#1c252a" />
      <path d="M 750 180 C 800 140 880 150 900 190 Z" fill="#151b1e" />
      <path d="M 400 195 C 430 175 480 180 490 200 Z" fill="#1c252a" />
      
      {/* Pebbles */}
      <circle cx="220" cy="185" r="4" fill="#3a2a20" />
      <circle cx="232" cy="188" r="3" fill="#3a2a20" />
      <circle cx="215" cy="190" r="5" fill="#3a2a20" />
      <circle cx="600" cy="180" r="6" fill="#2c1810" />
      <circle cx="615" cy="182" r="4" fill="#2c1810" />
    </svg>
  );
}

export function StaghornCoral() {
  return (
    <svg width="80" height="100" viewBox="0 0 80 100" className="overflow-visible">
      <path d="M 40 100 C 40 70 20 50 10 30 M 40 100 C 40 60 60 40 70 20 M 35 70 C 25 50 40 20 40 0 M 45 75 C 60 60 45 30 55 10 M 20 50 C 10 40 0 35 5 20 M 60 40 C 70 30 80 25 75 10" 
            fill="none" stroke="#e8734a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BrainCoral() {
  return (
    <svg width="100" height="60" viewBox="0 0 100 60">
      <path d="M 10 60 C 10 10 90 10 90 60 Z" fill="#c94040" />
      <path d="M 20 50 Q 30 20 50 25 T 80 50" fill="none" stroke="#a03030" strokeWidth="4" strokeLinecap="round" />
      <path d="M 15 55 Q 25 35 40 40 T 85 55" fill="none" stroke="#a03030" strokeWidth="4" strokeLinecap="round" />
      <path d="M 35 30 Q 50 15 65 30 T 75 40" fill="none" stroke="#a03030" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function FanCoral() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" className="overflow-visible">
      <path d="M 60 100 L 20 20 C 40 0 80 0 100 20 Z" fill="rgba(244, 164, 96, 0.8)" />
      <path d="M 60 100 L 10 30 M 60 100 L 30 15 M 60 100 L 50 5 M 60 100 L 70 5 M 60 100 L 90 15 M 60 100 L 110 30" 
            fill="none" stroke="#d68240" strokeWidth="2" />
      <path d="M 25 50 Q 60 30 95 50 M 15 40 Q 60 15 105 40 M 35 70 Q 60 55 85 70 M 45 85 Q 60 75 75 85" 
            fill="none" stroke="#d68240" strokeWidth="2" />
    </svg>
  );
}

export function TubeCoral() {
  return (
    <svg width="70" height="80" viewBox="0 0 70 80" className="overflow-visible">
      <rect x="10" y="20" width="12" height="60" rx="6" fill="#4ecdc4" />
      <rect x="25" y="10" width="14" height="70" rx="7" fill="#3eb8b0" />
      <rect x="42" y="30" width="10" height="50" rx="5" fill="#4ecdc4" />
      <rect x="55" y="45" width="8" height="35" rx="4" fill="#3eb8b0" />
      <rect x="0" y="40" width="8" height="40" rx="4" fill="#3eb8b0" />
      {/* Details */}
      <circle cx="16" cy="23" r="3" fill="#2a827c" />
      <circle cx="32" cy="14" r="4" fill="#2a827c" />
      <circle cx="47" cy="33" r="2.5" fill="#2a827c" />
      <circle cx="59" cy="48" r="2" fill="#2a827c" />
      <circle cx="4" cy="43" r="2" fill="#2a827c" />
    </svg>
  );
}

export function SeaweedStrand({ color = "#1a5c2e", height = 300, delay = 0 }) {
  // We use a CSS animation to make the strand sway organically in addition to mouse physics
  return (
    <motion.svg width="40" height={height} viewBox={`0 0 40 ${height}`} className="overflow-visible"
      animate={{ skewX: [-5, 5, -5] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ transformOrigin: "bottom center" }}
    >
      <path 
        d={`M 20 ${height} Q 0 ${height * 0.75} 20 ${height * 0.5} T 20 0`} 
        fill="none" 
        stroke={color} 
        strokeWidth="12" 
        strokeLinecap="round" 
      />
      {/* Leaves */}
      <path d={`M 20 ${height * 0.8} Q 35 ${height * 0.75} 35 ${height * 0.7} Q 25 ${height * 0.65} 15 ${height * 0.75}`} fill={color} />
      <path d={`M 20 ${height * 0.6} Q 5 ${height * 0.55} 5 ${height * 0.5} Q 15 ${height * 0.45} 25 ${height * 0.55}`} fill={color} />
      <path d={`M 20 ${height * 0.4} Q 35 ${height * 0.35} 35 ${height * 0.3} Q 25 ${height * 0.25} 15 ${height * 0.35}`} fill={color} />
      <path d={`M 20 ${height * 0.2} Q 5 ${height * 0.15} 5 ${height * 0.1} Q 15 ${height * 0.05} 25 ${height * 0.15}`} fill={color} />
    </motion.svg>
  );
}

export function SeaweedCluster({ currentX }: { currentX: MotionValue<number> }) {
  return (
    <SwayLayer currentX={currentX} multiplier={0.15} className="flex items-end -space-x-4">
      <SeaweedStrand height={250} color="#0f3d1f" delay={0} />
      <SeaweedStrand height={350} color="#1a5c2e" delay={1} />
      <SeaweedStrand height={280} color="#2d7a3e" delay={2} />
      <SeaweedStrand height={320} color="#1a5c2e" delay={0.5} />
      <SeaweedStrand height={220} color="#0f3d1f" delay={1.5} />
    </SwayLayer>
  );
}
