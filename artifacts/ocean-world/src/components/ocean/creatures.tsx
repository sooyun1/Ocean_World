import { motion } from 'framer-motion';

export function Turtle({ color = "#4a7c59", ...props }: { color?: string }) {
  return (
    <svg width="120" height="96" viewBox="0 0 120 96" {...props}>
      {/* Back Left Flipper */}
      <motion.g 
        transformOrigin="30px 48px"
        animate={{ rotate: [-15, 10, -15] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <path d="M 30 48 Q 15 15 5 25 Q 20 40 30 48 Z" fill="#2d5a3d" />
      </motion.g>

      {/* Back Right Flipper */}
      <motion.g 
        transformOrigin="30px 48px"
        animate={{ rotate: [15, -10, 15] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <path d="M 30 48 Q 15 81 5 71 Q 20 56 30 48 Z" fill="#2d5a3d" />
      </motion.g>

      {/* Front Left Flipper */}
      <motion.g 
        transformOrigin="75px 48px"
        animate={{ rotate: [-30, 20, -30] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M 75 48 Q 60 5 80 5 Q 90 20 75 48 Z" fill="#3a6847" />
      </motion.g>

      {/* Front Right Flipper */}
      <motion.g 
        transformOrigin="75px 48px"
        animate={{ rotate: [30, -20, 30] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M 75 48 Q 60 91 80 91 Q 90 76 75 48 Z" fill="#3a6847" />
      </motion.g>

      {/* Head */}
      <motion.g
        transformOrigin="90px 48px"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M 90 38 Q 115 38 115 48 Q 115 58 90 58 Z" fill="#7a9e7e" />
        <circle cx="102" cy="43" r="2" fill="#111" />
        <circle cx="102" cy="53" r="2" fill="#111" />
      </motion.g>

      {/* Shell */}
      <path d="M 25 48 C 25 15 95 20 95 48 C 95 76 25 81 25 48 Z" fill={color} />
      {/* Shell Hex Pattern */}
      <path d="M 45 48 L 55 35 L 70 35 L 80 48 L 70 61 L 55 61 Z" fill="none" stroke="#2d5a3d" strokeWidth="2" />
      <path d="M 45 48 L 35 38 L 45 28 L 55 35 M 45 48 L 35 58 L 45 68 L 55 61" fill="none" stroke="#2d5a3d" strokeWidth="2" />
      <path d="M 70 35 L 80 25 M 80 48 L 90 48 M 70 61 L 80 71" fill="none" stroke="#2d5a3d" strokeWidth="2" />
    </svg>
  );
}

export function Seahorse({ color = "#d4845a", accent = "#c66a3e", ...props }: { color?: string, accent?: string }) {
  return (
    <svg width="40" height="90" viewBox="0 0 40 90" {...props}>
      {/* Tail curl */}
      <path d="M 20 80 C 30 80 30 65 20 65 C 15 65 15 75 20 75 C 22 75 22 70 20 70" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
      
      {/* Body */}
      <path d="M 20 65 C 5 50 5 35 15 25 C 25 15 25 10 20 5 L 25 5 C 30 15 35 30 25 45 C 20 55 25 65 20 65 Z" fill={color} />
      
      {/* Belly stripes */}
      <path d="M 12 35 Q 18 38 23 35 M 10 40 Q 15 43 20 40 M 11 45 Q 16 48 21 45 M 14 50 Q 18 53 22 50" fill="none" stroke={accent} strokeWidth="1" />
      
      {/* Head */}
      <path d="M 15 25 C 5 25 0 20 5 15 L 20 15 C 25 15 25 25 15 25 Z" fill={color} />
      
      {/* Snout */}
      <path d="M 5 15 L -5 18 L -5 22 L 5 20 Z" fill={color} />
      
      {/* Eye */}
      <circle cx="10" cy="18" r="1.5" fill="#111" />
      
      {/* Coronet */}
      <path d="M 12 10 L 15 5 L 18 10 Z" fill={accent} />
      
      {/* Dorsal Fin */}
      <motion.path 
        d="M 25 40 C 35 35 35 50 22 48 Z" 
        fill="#f4a261" 
        animate={{ scaleX: [1, 0.2, 1] }}
        transition={{ duration: 0.15, repeat: Infinity, ease: "linear" }}
        transformOrigin="25px 45px"
      />
    </svg>
  );
}

export function Jellyfish({ ...props }) {
  return (
    <svg width="100" height="150" viewBox="0 0 100 150" {...props}>
      <motion.g 
        animate={{ scaleY: [1, 1.15, 1], scaleX: [1, 0.9, 1] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        transformOrigin="50px 30px"
      >
        {/* Tentacles */}
        <motion.path 
          d="M 30 50 Q 20 100 30 140" 
          stroke="rgba(180, 220, 255, 0.3)" strokeWidth="3" fill="none" 
          animate={{ d: ["M 30 50 Q 20 100 30 140", "M 30 50 Q 40 100 30 140", "M 30 50 Q 20 100 30 140"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M 50 50 Q 40 100 50 145" 
          stroke="rgba(180, 220, 255, 0.4)" strokeWidth="4" fill="none" 
          animate={{ d: ["M 50 50 Q 40 100 50 145", "M 50 50 Q 60 100 50 145", "M 50 50 Q 40 100 50 145"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path 
          d="M 70 50 Q 80 100 70 135" 
          stroke="rgba(180, 220, 255, 0.3)" strokeWidth="3" fill="none" 
          animate={{ d: ["M 70 50 Q 80 100 70 135", "M 70 50 Q 60 100 70 135", "M 70 50 Q 80 100 70 135"] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        
        {/* Bell Base Frills */}
        <path d="M 15 50 Q 25 60 35 50 Q 50 65 65 50 Q 75 60 85 50 Z" fill="rgba(150, 200, 255, 0.5)" />

        {/* Bell */}
        <path d="M 15 50 C 15 10 85 10 85 50 Z" fill="rgba(150, 200, 255, 0.4)" />
        
        {/* Bell Internal Details */}
        <path d="M 30 45 C 30 20 70 20 70 45" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" fill="none" />
        <path d="M 40 48 C 40 25 60 25 60 48" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none" />
      </motion.g>
    </svg>
  );
}

export function Fish({ color = "#f4a261", type = "elongated", ...props }: { color?: string, type?: "elongated" | "round" }) {
  if (type === "round") {
    return (
      <svg width="40" height="30" viewBox="0 0 40 30" {...props}>
        {/* Tail */}
        <path d="M 0 5 L 10 15 L 0 25 Z" fill={color} />
        {/* Body */}
        <path d="M 8 15 C 8 0 35 0 40 15 C 35 30 8 30 8 15 Z" fill={color} />
        {/* Fin */}
        <path d="M 20 15 Q 15 20 25 22 Z" fill="rgba(0,0,0,0.2)" />
        {/* Eye */}
        <circle cx="32" cy="12" r="1.5" fill="#111" />
      </svg>
    );
  }

  // Elongated
  return (
    <svg width="40" height="20" viewBox="0 0 40 20" {...props}>
      {/* Tail */}
      <path d="M 0 0 L 8 8 L 0 16 L 10 12 C 15 15 25 15 35 12 Q 40 8 35 4 C 25 1 15 1 10 4 Z" fill={color} />
      {/* Fin */}
      <path d="M 22 2 Q 18 -2 15 2 Z" fill="rgba(0,0,0,0.3)" />
      <path d="M 20 14 Q 15 18 12 14 Z" fill="rgba(0,0,0,0.3)" />
      {/* Eye */}
      <circle cx="32" cy="7" r="1.2" fill="#111" />
    </svg>
  );
}
