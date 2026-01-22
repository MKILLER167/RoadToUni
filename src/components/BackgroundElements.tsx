import React from 'react';
import { motion } from 'motion/react';

interface BackgroundElementsProps {
  className?: string;
}

export const BackgroundElements: React.FC<BackgroundElementsProps> = ({ className = '' }) => {
  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Animated floating shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-full blur-xl"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          scale: [1, 0.9, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-green-500/8 to-emerald-500/4 rounded-full blur-xl"
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-yellow-500/8 to-orange-500/4 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          scale: [1, 0.8, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
    </div>
  );
};