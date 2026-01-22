import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, BookOpen, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  isVisible?: boolean;
  currentLanguage?: string;
}

export const SplashScreen = React.memo(({
  isVisible = true,
  currentLanguage = 'ar'
}: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 bg-background z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Modern geometric background */}
          <div className="absolute inset-0">
            {/* Primary gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

            {/* Animated geometric shapes */}
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 rounded-full border-2 border-primary/20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute bottom-20 right-20 w-24 h-24 rounded-lg border-2 border-primary/30"
              animate={{
                scale: [1, 0.8, 1],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute top-1/2 left-16 w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full"
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute top-1/3 right-16 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-lg rotate-45"
              animate={{
                rotate: [45, 225, 45],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main content */}
          <div className="text-center relative z-10 max-w-md mx-auto px-8">
            {/* Logo with modern animation */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
              className="mb-8 relative"
            >
              <div className="relative inline-block">
                {/* Main logo circle */}
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl shadow-primary/25"
                  animate={{
                    boxShadow: [
                      "0 25px 50px -12px rgba(185, 28, 28, 0.25)",
                      "0 25px 50px -12px rgba(185, 28, 28, 0.4)",
                      "0 25px 50px -12px rgba(185, 28, 28, 0.25)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <GraduationCap className="h-12 w-12 text-white" />
                </motion.div>

                {/* Orbiting elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <motion.div
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    <BookOpen className="h-3 w-3 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                  >
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.0, type: "spring" }}
                  />
                  <motion.div
                    className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* App title with modern typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8"
            >
              <motion.h1
                className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                {currentLanguage === "ar" ? "طريق الجامعات" : "Road to Universities"}
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {currentLanguage === "ar"
                  ? "دليلك الشامل للتعليم العالي"
                  : "Your comprehensive guide to higher education"
                }
              </motion.p>
            </motion.div>

            {/* Modern loading animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Pulse dots */}
              <div className="flex items-center justify-center gap-2">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                ))}
              </div>

              {/* Progress line */}
              <div className="w-40 h-0.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1.8,
                    ease: "easeOut",
                  }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="text-muted-foreground text-sm"
              >
                {currentLanguage === "ar" ? "جاري التحضير..." : "Preparing..."}
              </motion.p>
            </motion.div>
          </div>

          {/* Subtle corner decorations */}
          <motion.div
            className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-primary/5 to-transparent"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

SplashScreen.displayName = 'SplashScreen';