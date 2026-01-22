import { motion } from "motion/react";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "button";
  lines?: number;
}

export function LoadingSkeleton({ 
  className = "", 
  variant = "text", 
  lines = 1 
}: LoadingSkeletonProps) {
  const shimmerAnimation = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  };

  const baseClasses = "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-pulse";

  if (variant === "card") {
    return (
      <motion.div
        className={`rounded-lg border border-border p-6 space-y-4 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`h-6 rounded ${baseClasses}`}
          {...shimmerAnimation}
        />
        <motion.div
          className={`h-4 rounded w-3/4 ${baseClasses}`}
          {...shimmerAnimation}
        />
        <motion.div
          className={`h-4 rounded w-1/2 ${baseClasses}`}
          {...shimmerAnimation}
        />
      </motion.div>
    );
  }

  if (variant === "circle") {
    return (
      <motion.div
        className={`rounded-full ${baseClasses} ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        {...shimmerAnimation}
      />
    );
  }

  if (variant === "button") {
    return (
      <motion.div
        className={`h-10 rounded-lg ${baseClasses} ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        {...shimmerAnimation}
      />
    );
  }

  // Text variant (default)
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className={`h-4 rounded ${baseClasses} ${
            index === lines - 1 ? "w-3/4" : "w-full"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          {...shimmerAnimation}
        />
      ))}
    </div>
  );
}