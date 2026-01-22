// Enhanced performance optimized animation variants
export const animationVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -15 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 15 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  scaleInSpring: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.4,
    },
  },
  slideIn: {
    initial: { opacity: 0, x: -15 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  slideInRight: {
    initial: { opacity: 0, x: 15 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  },
  float: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  glow: {
    animate: {
      boxShadow: [
        "0 0 5px rgba(185, 28, 28, 0.5)",
        "0 0 20px rgba(185, 28, 28, 0.8)",
        "0 0 5px rgba(185, 28, 28, 0.5)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  shimmer: {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },
};

// Page transition variants
export const pageTransitions = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

// Modal/Dialog transitions
export const modalTransitions = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  content: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// Enhanced hover effects
export const hoverEffects = {
  lift: {
    whileHover: { y: -4, scale: 1.02 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  scale: {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  glow: {
    whileHover: {
      boxShadow: "0 0 20px rgba(185, 28, 28, 0.4)",
      scale: 1.02,
    },
    transition: { duration: 0.2, ease: "easeOut" },
  },
  rotate: {
    whileHover: { rotate: 5, scale: 1.05 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
};