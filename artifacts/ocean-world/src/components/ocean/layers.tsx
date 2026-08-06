import { ReactNode } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface CurrentLayerProps {
  currentX: MotionValue<number>;
  currentY: MotionValue<number>;
  depth: number; // e.g. 0.2 for background, 1.2 for foreground
  rotateMultiplier?: number;
  origin?: string;
  className?: string;
  children: ReactNode;
}

export function CurrentLayer({ 
  currentX, 
  currentY, 
  depth, 
  rotateMultiplier = 0.05,
  origin = "center center",
  className = "",
  children 
}: CurrentLayerProps) {
  const x = useTransform(currentX, (v) => v * depth);
  const y = useTransform(currentY, (v) => v * depth);
  const rotate = useTransform(currentX, (v) => v * rotateMultiplier);

  return (
    <motion.div 
      style={{ x, y, rotate, transformOrigin: origin }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SwayLayerProps {
  currentX: MotionValue<number>;
  multiplier: number;
  origin?: string;
  className?: string;
  children: ReactNode;
}

export function SwayLayer({
  currentX,
  multiplier,
  origin = "bottom center",
  className = "",
  children
}: SwayLayerProps) {
  const rotate = useTransform(currentX, (v) => v * multiplier);
  
  return (
    <motion.div 
      style={{ rotate, transformOrigin: origin }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}
