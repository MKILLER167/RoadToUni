import React from "react";
import { motion } from "motion/react";
import { Home, MessageCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface FloatingActionButtonProps {
  onClick?: () => void;
  variant?: 'home' | 'chat' | 'call';
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  variant = 'home',
  position = 'bottom-right',
  className = '',
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'chat':
        return <MessageCircle className="h-6 w-6" />;
      case 'call':
        return <Phone className="h-6 w-6" />;
      default:
        return <Home className="h-6 w-6" />;
    }
  };

  const getColors = () => {
    switch (variant) {
      case 'chat':
        return 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25';
      case 'call':
        return 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-green-500/25';
      default:
        return 'bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-primary/25';
    }
  };

  const positionClasses = {
    'bottom-right': 'bottom-20 right-4',
    'bottom-left': 'bottom-20 left-4',
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      }}
      className={cn(
        "fixed z-50",
        positionClasses[position],
        className
      )}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(185, 28, 28, 0.7)",
            "0 0 0 10px rgba(185, 28, 28, 0)",
            "0 0 0 0 rgba(185, 28, 28, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        
      </motion.div>
    </motion.div>
  );
};